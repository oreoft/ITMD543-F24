// 创建 SidebarContext.tsx
import React, {createContext, useContext, useState} from 'react';

interface SidebarContextType {
    isOpen: boolean;
    isShaking: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const closeSidebar = () => setIsOpen(false);
    const openSidebar = () => {
        if (isOpen) {
            // 如果已经打开，触发抖动动画
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        } else {
            setIsOpen(true);
        }
    };

    return (
        <SidebarContext.Provider value={{isOpen, isShaking, openSidebar, closeSidebar}}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
