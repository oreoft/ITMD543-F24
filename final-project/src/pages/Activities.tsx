import React, {useEffect, useState} from 'react';
import {db} from '../config/firebase';
import {
    Button,
    Card,
    Col,
    DatePicker,
    Empty,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Pagination,
    Row,
    Spin
} from 'antd';
import {addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, Timestamp, where} from 'firebase/firestore';
import {CalendarOutlined, DeleteOutlined, EnvironmentOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';

const {Search} = Input;

interface VolunteerActivity {
    id: string;
    title: string;
    description: string;
    location: string;
    startDate: Timestamp;
    endDate: Timestamp;
    requiredVolunteers: number;
    currentVolunteers: number;
    organizerName: string;
    organizerContact: string;
    createdAt: Timestamp;
    status: 'ongoing' | 'completed' | 'upcoming';
    organizerId?: string;
}

// 在组件外部添加初始化函数
const initializeData = async () => {
    try {
        const activitiesCollection = collection(db, 'volunteerActivities');

        // 检查是否已经有数据
        const snapshot = await getDocs(activitiesCollection);
        if (!snapshot.empty) {
            console.log('Data already exists');
            return;
        }

        // 生成20条示例数据
        const sampleData = Array.from({length: 1}).map((_, index) => {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 14) + 1);

            return {
                title: `Volunteer Activity ${index + 1}`,
                description: `This is a sample description for volunteer activity ${index + 1}. Join us to make a difference!`,
                location: `Location ${index + 1}`,
                startDate: Timestamp.fromDate(startDate),
                endDate: Timestamp.fromDate(endDate),
                requiredVolunteers: Math.floor(Math.random() * 20) + 5,
                currentVolunteers: 0,
                organizerName: `Organizer ${index + 1}`,
                organizerContact: `contact${index + 1}@example.com`,
                organizerId: 'sample-organizer-id',
                createdAt: Timestamp.now(),
                status: 'upcoming'
            };
        });

        // 批量添加数据
        for (const data of sampleData) {
            await addDoc(activitiesCollection, data);
        }
        console.log('Sample data initialized successfully');
    } catch (error) {
        console.error('Error initializing data:', error);
    }
};


const VolunteerActivities: React.FC = () => {
    const [activities, setActivities] = useState<VolunteerActivity[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 9;
    const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<VolunteerActivity | null>(null);
    // 修改处理加入活动的函数
    const handleJoinActivity = (activity: VolunteerActivity) => {
        if (!checkUserLogin()) {
            return;
        }
        setSelectedActivity(activity);
        setIsJoinModalVisible(true);
    };


    // 检查用户登录状态
    const checkUserLogin = () => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            message.warning('Please login first!');
            return false;
        }
        return true;
    };

    // 获取活动总数
    const fetchTotalCount = async (searchQuery = '') => {
        try {
            let q;
            if (searchQuery) {
                q = query(
                    collection(db, 'volunteerActivities'),
                    where('title', '>=', searchQuery),
                    where('title', '<=', searchQuery + '\uf8ff')
                );
            } else {
                q = collection(db, 'volunteerActivities');
            }
            const snapshot = await getDocs(q);
            setTotal(snapshot.size);
        } catch (error) {
            console.error('Error fetching total count:', error);
        }
    };

    // 添加渲染联系方式模态框的函数
    const renderJoinActivityModal = () => (
        <Modal
            title="Activity Contact Information"
            open={isJoinModalVisible}
            onCancel={() => setIsJoinModalVisible(false)}
            footer={[
                <Button key="close" onClick={() => setIsJoinModalVisible(false)}>
                    Close
                </Button>
            ]}
        >
            {selectedActivity && (
                <div className="space-y-4">
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-bold mb-2">{selectedActivity.title}</h3>
                        <p className="text-gray-600">{selectedActivity.description}</p>
                    </div>

                    <div className="space-y-2">
                        <div>
                            <label className="font-medium">Organizer:</label>
                            <p>{selectedActivity.organizerName}</p>
                        </div>

                        <div>
                            <label className="font-medium">Contact Information:</label>
                            <p>{selectedActivity.organizerContact}</p>
                        </div>

                        <div>
                            <label className="font-medium">Location:</label>
                            <p>{selectedActivity.location}</p>
                        </div>

                        <div>
                            <label className="font-medium">Date:</label>
                            <p>
                                {selectedActivity.startDate.toDate().toLocaleDateString()} -
                                {selectedActivity.endDate.toDate().toLocaleDateString()}
                            </p>
                        </div>

                        <div>
                            <label className="font-medium">Volunteers:</label>
                            <p>{selectedActivity.requiredVolunteers}</p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                        <p className="text-gray-600">
                            Please contact the organizer using the provided contact information to join this activity.
                        </p>
                    </div>
                </div>
            )}
        </Modal>
    );


    const handleDeleteActivity = async (activityId: string) => {
        try {
            await deleteDoc(doc(db, 'volunteerActivities', activityId));
            message.success('Activity deleted successfully');
            fetchActivities(currentPage);
            fetchTotalCount();
        } catch (error) {
            console.error('Error deleting activity:', error);
            message.error('Failed to delete activity');
        }
    };

    // 获取活动列表
    const fetchActivities = async (page: number, searchQuery = '') => {
        try {
            setLoading(true);
            let q;

            if (searchQuery) {
                q = query(
                    collection(db, 'volunteerActivities'),
                    where('title', '>=', searchQuery),
                    where('title', '<=', searchQuery + '\uf8ff'),
                    orderBy('title'),
                    orderBy('createdAt', 'desc'),
                    limit(pageSize)
                );
            } else {
                q = query(
                    collection(db, 'volunteerActivities'),
                    orderBy('createdAt', 'desc'),
                    limit(pageSize)
                );
            }

            const querySnapshot = await getDocs(q);
            const newActivities: VolunteerActivity[] = [];

            querySnapshot.forEach((doc) => {
                newActivities.push({
                    id: doc.id,
                    ...doc.data()
                } as VolunteerActivity);
            });

            setActivities(newActivities);
        } catch (error) {
            console.error('Error fetching activities:', error);
        } finally {
            setLoading(false);
        }
    };

    // 处理搜索
    const handleSearch = (value: string) => {
        setSearchText(value);
        setCurrentPage(1);
        fetchActivities(1, value);
        fetchTotalCount(value);
    };

    // 处理页面变化
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchActivities(page, searchText);
    };

    // 创建新活动
    const handleCreateActivity = async (values: any) => {
        if (!checkUserLogin()) {
            return;
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo')!);

            const newActivity = {
                title: values.title,
                description: values.description,
                location: values.location,
                startDate: Timestamp.fromDate(values.dateRange[0].toDate()),
                endDate: Timestamp.fromDate(values.dateRange[1].toDate()),
                requiredVolunteers: Number(values.requiredVolunteers),
                currentVolunteers: 0,
                organizerContact: values.organizerContact,
                organizerName: userInfo.displayName || values.organizerName,
                organizerId: userInfo.uid,
                createdAt: Timestamp.now(),
                status: 'upcoming'
            };

            await addDoc(collection(db, 'volunteerActivities'), newActivity);
            message.success('Activity created successfully!');
            setIsModalVisible(false);
            form.resetFields();
            fetchActivities(currentPage);
            fetchTotalCount();
        } catch (error) {
            console.error('Error creating activity:', error);
            message.error('Failed to create activity');
        }
    };

    useEffect(() => {
        fetchActivities(currentPage);
        fetchTotalCount();
    }, []);

    // 渲染活动卡片
    const renderActivityCard = (activity: VolunteerActivity) => {
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null;
        const isOwner = userInfo && userInfo.uid === activity.organizerId;
        return (<Card
                hoverable
                className="h-full"
                actions={[
                    <Button
                        type="primary"
                        onClick={() => handleJoinActivity(activity)}
                    >
                        Join Activity
                    </Button>
                ]}
            >
                {isOwner && (
                    <DeleteOutlined
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-sm cursor-pointer z-10"
                        onClick={(e) => {
                            e.stopPropagation();
                            Modal.confirm({
                                title: 'Delete Activity',
                                content: 'Are you sure you want to delete this activity?',
                                okText: 'Yes',
                                okType: 'danger',
                                cancelText: 'No',
                                onOk: () => handleDeleteActivity(activity.id)
                            });
                        }}
                    />
                )}
                <Card.Meta
                    title={<div className="text-xl font-bold">{activity.title}</div>}
                    description={
                        <div className="space-y-3 mt-3">
                            <p className="text-gray-600">{activity.description}</p>
                            <div className="flex items-center gap-2">
                                <EnvironmentOutlined/>
                                <span>{activity.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarOutlined/>
                                <span>
                                 {activity.startDate.toDate().toLocaleDateString()} -
                                    {activity.endDate.toDate().toLocaleDateString()}
                            </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TeamOutlined/>
                                <span>
                                {activity.requiredVolunteers} Volunteers
                            </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <UserOutlined/>
                                <span>{activity.organizerName}</span>
                            </div>
                            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block">
                                {activity.status}
                            </div>
                        </div>
                    }
                />
            </Card>
        );
    }

    // 渲染创建活动表单
    const renderCreateActivityModal = () => (
        <Modal
            title="Create New Volunteer Activity"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleCreateActivity}
            >
                <Form.Item
                    name="title"
                    label="Activity Title"
                    rules={[{required: true}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true}]}
                >
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Location"
                    rules={[{required: true}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="dateRange"
                    label="Activity Period"
                    rules={[{required: true}]}
                >
                    <DatePicker.RangePicker/>
                </Form.Item>

                <Form.Item
                    name="requiredVolunteers"
                    label="Required Volunteers"
                    rules={[{required: true}]}
                >
                    <InputNumber min={1}/>
                </Form.Item>

                <Form.Item
                    name="organizerContact"
                    label="Contact Information"
                    rules={[{required: true}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create Activity
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">Volunteer Activities</h1>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Search
                        placeholder="Search activities by title"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={handleSearch}
                        className="w-full sm:w-96"
                    />
                    <Button
                        type="primary"
                        onClick={() => checkUserLogin() && setIsModalVisible(true)}
                        size="large"
                    >
                        Create Activity
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <Spin size="large"/>
                </div>
            ) : activities.length === 0 ? (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={searchText ? "No matching activities found" : "No Activities Found"}
                />
            ) : (
                <>
                    <Row gutter={[24, 24]}>
                        {activities.map((activity) => (
                            <Col xs={24} sm={12} md={8} key={activity.id}>
                                {renderActivityCard(activity)}
                            </Col>
                        ))}
                    </Row>
                    <div className="mt-8 flex justify-center">
                        <Pagination
                            current={currentPage}
                            total={total}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                        />
                    </div>
                </>
            )}

            {renderCreateActivityModal()}
            {renderJoinActivityModal()}
        </div>
    );
};


export default VolunteerActivities;
