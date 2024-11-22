import React from 'react';
import {Button} from 'antd';
import {
    CustomerServiceOutlined, GithubOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PhoneOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {useSidebar} from "../contexts/SidebarContext";

interface SidebarProps {
    github?: string;
    email?: string;
    director?: string;
    wechat?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             github = "https://github.com/oreoft",
                                             email = "meetyifan@gmail.com",
                                             director = "Yifan",
                                         }) => {
    const {openSidebar, closeSidebar, isOpen, isShaking} = useSidebar();

    const getText = (key: string) => {
        const textContent = {
            adminContact: 'Admin Contact',
            adminDirector: 'Admin',
            adminGithub: 'Admin Github',
            adminEmail: 'Admin Email',
        };

        return textContent[key as keyof typeof textContent];
    };

    const handleGithubClick = () => {
        window.open(github, '_blank');
    };

    const handleEmailClick = () => {
        window.location.href = `mailto:${email}`;
    };

    return (
        <div className={`fixed right-0 top-1/2 -translate-y-1/2 transition-all duration-300 
        ${isOpen ? 'w-64' : 'w-12'} bg-white shadow-lg rounded-l-lg z-50
        ${isShaking ? 'animate-shake' : ''}`}>
            {isOpen ? (
                <div>
                    <div>
                        <Button
                            type="text"
                            className="absolute left-0 top-0 z-10"
                            icon={<MenuUnfoldOutlined/>}
                            onClick={() => closeSidebar()}
                        />

                        {/* 标题 */}
                        <div className="text-orange-500 font-bold text-lg pt-1">
                            {getText('adminContact')}
                        </div>
                    </div>

                    <div className="p-4 pt-6">
                        <div className="space-y-4"> {/* 增加整体间距 */}
                            <div className="space-y-1"> {/* 使用space-y-1控制标题和内容的间距 */}
                                <div className="flex items-center">
                                    <UserOutlined className="mr-2"/>
                                    <span>{getText('adminDirector')}</span>
                                </div>
                                <div className="pl-6 text-orange-500">{director}</div>
                                {/* 使用pl-6缩进内容 */}
                            </div>

                            {/* github */}
                            <div className="space-y-1">
                                <div className="flex items-center">
                                    <GithubOutlined className="mr-2"/>
                                    <span>{getText('adminGithub')}</span>
                                </div>
                                <div
                                    className="pl-6 text-orange-500 cursor-pointer hover:underline"
                                    onClick={handleGithubClick}
                                >
                                    Oreoft
                                </div>
                            </div>

                            {/* 邮箱 */}
                            <div className="space-y-1">
                                <div className="flex items-center">
                                    <MailOutlined className="mr-2"/>
                                    <span>{getText('adminEmail')}</span>
                                </div>
                                <div
                                    className="pl-6 text-orange-500 cursor-pointer hover:underline"
                                    onClick={handleEmailClick}
                                >
                                    {email}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <div
                    className="h-20 flex flex-col items-center justify-center cursor-pointer"
                    onClick={openSidebar}>
                    <CustomerServiceOutlined className="text-2xl text-orange-500 mb-2"/>
                    <MenuFoldOutlined className="text-gray-500"/>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
