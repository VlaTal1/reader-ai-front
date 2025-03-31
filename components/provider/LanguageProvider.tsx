import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import i18n from "@/localization/i18n";

interface LanguageContextType {
    language: string;
    changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    changeLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useReducer((_: string, newLang: string) => newLang, i18n.locale);
    
    useEffect(() => {
        const loadLanguage = async () => {
            const savedLang = await AsyncStorage.getItem("language");
            if (savedLang) {
                i18n.locale = savedLang;
                setLanguage(savedLang);
            }
        };
        loadLanguage();
    }, []);
    
    const changeLanguage = async (lang: string) => {
        i18n.locale = lang;
        await AsyncStorage.setItem("language", lang);
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
