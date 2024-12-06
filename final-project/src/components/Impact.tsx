import React, {useState} from 'react';
import {Carousel} from 'antd';
import classNames from 'classnames';

const contentData = {
    title: 'Our Impact & Commitments',
    items: [
        {
            icon: '🤝',
            title: 'Community Partnership & Integration',
            description: 'We build strong partnerships with local Chicago organizations and IIT departments to create meaningful volunteer opportunities. Our platform connects students with community needs, fostering lasting relationships between IIT and Chicago neighborhoods while promoting cultural exchange and understanding.',
            image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
            icon: '🎓',
            title: 'Student Development & Leadership',
            description: 'Our program emphasizes both community service and personal growth. Students gain valuable leadership experience, develop professional skills, and build their resumes while making a positive impact. We provide training, mentorship, and reflection opportunities to enhance the learning experience.',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
            icon: '🌟',
            title: 'Sustainable Impact & Recognition',
            description: 'We focus on creating lasting positive change in our communities through sustained engagement and measured outcomes. Our volunteers receive recognition for their service hours, and outstanding contributors are celebrated through our awards program and service certificates.',
            image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        }
    ]
};


const Impact: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = React.useRef<any>();

    // 处理内容点击
    const handleContentClick = (index: number) => {
        setActiveIndex(index);
        carouselRef.current?.goTo(index);
    };

    // 处理悬停
    const handleContentHover = (index: number) => {
        setActiveIndex(index);
        carouselRef.current?.goTo(index);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            {/* 标题区域 */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-center mb-16">
                    {contentData.title}
                </h2>
            </div>

            {/* 主要内容区域 */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* 左侧内容列表 */}
                <div className="lg:w-2/5 space-y-4">
                    {contentData.items.map((item, index) => (
                        <div
                            key={index}
                            className={classNames(
                                'p-6 rounded-lg cursor-pointer transition-all duration-300',
                                'hover:shadow-lg',
                                {
                                    'bg-orange-50 border-l-4 border-orange-500': activeIndex === index,
                                    'bg-white': activeIndex !== index
                                }
                            )}
                            onClick={() => handleContentClick(index)}
                            onMouseEnter={() => handleContentHover(index)}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-orange-500 text-2xl">{item.icon}</span>
                                <h3 className="font-bold text-lg text-left"> {/* 添加 text-left */}
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-left"> {/* 添加 text-left */}
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* 右侧图片轮播 */}
                <div className="hidden lg:block lg:w-3/5">
                    <Carousel
                        ref={carouselRef}
                        effect="fade"
                        autoplay={false}
                        dots={false}
                        afterChange={(current) => setActiveIndex(current)}
                    >
                        {contentData.items.map((item, index) => (
                            <div key={index}>
                                <div className="relative overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
                                    />
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>

            {/* 移动端指示器 */}
            <div className="flex justify-center gap-2 mt-6 lg:hidden">
                {contentData.items.map((_, index) => (
                    <div
                        key={index}
                        className={classNames('w-2 h-2 rounded-full transition-all', {
                            'bg-orange-500': activeIndex === index,
                            'bg-gray-300': activeIndex !== index
                        })}
                        onClick={() => handleContentClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Impact;
