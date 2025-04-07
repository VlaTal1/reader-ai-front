import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum UserMode {
    PARENT = "parent",
    CHILD = "child"
}

interface UserModeContextType {
    userMode: UserMode;
    isParentMode: boolean;
    isChildMode: boolean;
    childId: string | null;
    changeUserMode: (mode: UserMode) => Promise<void>;
    toggleUserMode: () => Promise<void>;
    setActiveChildId: (id: string | null) => Promise<void>;
    isLoading: boolean;
}

interface UserModeProviderProps {
    children: ReactNode;
}

const defaultContextValue: UserModeContextType = {
    userMode: UserMode.CHILD,
    isParentMode: false,
    isChildMode: true,
    childId: null,
    changeUserMode: async () => {},
    toggleUserMode: async () => {},
    setActiveChildId: async () => {},
    isLoading: true,
};

export const UserModeContext = createContext<UserModeContextType>(defaultContextValue);

export const useUserMode = (): UserModeContextType => {
    const context = useContext(UserModeContext);
    return context;
};

export const UserModeProvider: React.FC<UserModeProviderProps> = ({ children }) => {
    const [userMode, setUserMode] = useState<UserMode>(UserMode.CHILD);
    const [childId, setChildId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [savedMode, savedChildId] = await Promise.all([
                    AsyncStorage.getItem("userMode"),
                    AsyncStorage.getItem("childId"),
                ]);

                if (savedMode !== null && Object.values(UserMode).includes(savedMode as UserMode)) {
                    setUserMode(savedMode as UserMode);
                }

                if (savedChildId !== null) {
                    setChildId(savedChildId);
                }
            } catch (error) {
                console.error("Failed to load data from async storage:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const changeUserMode = async (mode: UserMode): Promise<void> => {
        try {
            await AsyncStorage.setItem("userMode", mode);
            setUserMode(mode);
        } catch (error) {
            console.error("Failed to save user mode:", error);
        }
    };

    const setActiveChildId = async (id: string | null): Promise<void> => {
        try {
            if (id) {
                await AsyncStorage.setItem("childId", id);
            } else {
                await AsyncStorage.removeItem("childId");
            }
            setChildId(id);
        } catch (error) {
            console.error("Failed to save participant id:", error);
        }
    };

    const toggleUserMode = async (): Promise<void> => {
        const newMode = userMode === UserMode.PARENT
            ? UserMode.CHILD
            : UserMode.PARENT;

        await changeUserMode(newMode);
    };

    const contextValue: UserModeContextType = {
        userMode,
        isParentMode: userMode === UserMode.PARENT,
        isChildMode: userMode === UserMode.CHILD,
        childId,
        changeUserMode,
        toggleUserMode,
        setActiveChildId,
        isLoading,
    };

    return (
        <UserModeContext.Provider value={contextValue}>
            {children}
        </UserModeContext.Provider>
    );
};