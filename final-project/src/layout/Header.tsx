import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useMediaQuery} from 'react-responsive';
import {useSidebar} from "../contexts/SidebarContext";
import LoginButton from "../components/LoginButton";

interface Translations {
    home: string;
    activities: string;
    contact: string;
}

const translations: Translations = {
    home: 'HOME',
    activities: 'ACTIVITIES',
    contact: 'CONTACT'
};

const Header: React.FC = () => {
    const location = useLocation();
    const isMobile = useMediaQuery({maxWidth: 768});
    const {openSidebar} = useSidebar();

    const isActive = (path: string): boolean => {
        const currentPath = location.pathname;
        if (path === '/') {
            return currentPath === '/';
        }
        return currentPath === `${path}`;
    };

    const NavLink: React.FC<{
        to?: string;
        onClick?: () => void;
        text: string;
        isActive: boolean;
    }> = ({to, onClick, text, isActive: active}) => {
        const Component = to ? Link : 'div';
        const props = to ? {to} : {onClick};

        return (
            //@ts-ignore
            <Component
                {...props}
                className={`relative group py-3 text-gray-700 hover:text-gray-900 cursor-pointer text-base`}
            >
                {text}
                <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-black transform transition-transform duration-300 
                    ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                />
            </Component>
        );
    };

    return (
        <header className="w-full h-16 bg-white shadow-md fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                {/* Logo区域 */}
                <div className={`${isMobile ? 'w-24' : 'w-48'}`}>
                    <Link to={`/`} className="flex items-center">
                        <img
                            src="/assets/logo.png"
                            alt="logo"
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold"
                        />
                        {!isMobile && (
                            <span className="ml-2 text-lg font-medium">VolunteerHub</span>
                        )}
                    </Link>
                </div>

                {/* 导航区域 - 居中 */}
                <div className="flex-1 flex justify-center">
                    <nav className="flex space-x-12">
                        {!isMobile && (
                            <NavLink
                                to={`/`}
                                text={translations.home}
                                isActive={isActive('/')}
                            />
                        )}
                        <NavLink
                            to={`/activities`}
                            text={translations.activities}
                            isActive={isActive('/activities')}
                        />
                        <NavLink
                            onClick={openSidebar}
                            text={translations.contact}
                            isActive={isActive('/contact')}
                        />
                    </nav>
                </div>

                {/* 登录按钮 */}
                <div className={`${isMobile ? 'w-24' : 'w-48'} flex justify-end`}>
                    <LoginButton isMobile isVeryNarrow></LoginButton>
                </div>
            </div>
        </header>
    );
};

export default Header;
