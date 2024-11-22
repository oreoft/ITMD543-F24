// contexts/LanguageContext.tsx
import React, {createContext, useState, useContext} from 'react';

type LanguageType = 'en' | 'zh';

interface LanguageContextType {
    currentLang: LanguageType;
    setCurrentLang: (lang: LanguageType) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [currentLang, setCurrentLang] = useState<LanguageType>(
        (localStorage.getItem('language') as LanguageType) || 'en'
    );

    return (
        <LanguageContext.Provider value={{currentLang, setCurrentLang}}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
