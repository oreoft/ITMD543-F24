import React, {useEffect, useState} from 'react';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut, User} from 'firebase/auth';
import {Button, message} from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';

interface LoginButtonProps {
    isMobile: boolean;
    isVeryNarrow: boolean;
}

// 定义用户信息接口
interface UserInfo {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}


const LoginButton: React.FC<LoginButtonProps> = ({isMobile, isVeryNarrow}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const auth = getAuth();

    // 保存用户信息到 localStorage
    const saveUserToLocalStorage = (user: User) => {
        const userInfo: UserInfo = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    };

    // 从 localStorage 移除用户信息
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('userInfo');
    };

    // 监听认证状态变化
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                saveUserToLocalStorage(currentUser);
            } else {
                removeUserFromLocalStorage();
            }
        });

        // 检查 localStorage 中是否有用户信息
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            const userInfo = JSON.parse(storedUser);
            console.log('Stored user info:', userInfo);
        }

        return () => unsubscribe();
    }, [auth]);

    // 处理登录
    const handleLogin = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            saveUserToLocalStorage(result.user);
            message.success('Successfully logged in');
            console.log('Login successful:', result.user);
        } catch (error) {
            console.error('Login error:', error);
            message.error('Login failed, please try again');
        } finally {
            setLoading(false);
        }
    };

    // 处理登出
    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            removeUserFromLocalStorage();
            message.success('Successfully logged out');
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout error:', error);
            message.error('Logout failed, please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${isMobile ? 'w-24' : 'w-48'} flex justify-end`}>
            {user ? (
                // Logged in state
                <div className="flex items-center">
                    <Button
                        icon={<LogoutOutlined/>}
                        onClick={handleLogout}
                        type="text"
                        loading={loading}
                        className="text-gray-700 hover:text-gray-900"
                    >Logout
                    </Button>
                </div>
            ) : (
                // Logged out state
                <Button
                    icon={<UserOutlined/>}
                    onClick={handleLogin}
                    type="text"
                    loading={loading}
                    className="text-gray-700 hover:text-gray-900"
                >
                    Login
                </Button>
            )}
        </div>
    );
};

export default LoginButton;
