import React from "react";
import {YStack} from "tamagui";
import {ActivityIndicator, BackHandler} from "react-native";
import {useBackHandler} from "@react-native-community/hooks";
import {Redirect} from "expo-router";

import Login from "@/components/Login";
import {useAuth} from "@/auth/SupabaseAuthProvider";
import CustomStackScreen from "@/components/CustomStackScreen";

const LoginPage = () => {
    const {user, isLoading: isProfileLoading} = useAuth();

    useBackHandler(() => {
        BackHandler.exitApp();
        return true;
    });

    if (isProfileLoading) {
        return (
            <>
                <CustomStackScreen/>
                <YStack flex={1} justifyContent="center" alignItems="center">
                    <ActivityIndicator size="large" color="#0000ff"/>
                </YStack>
            </>
        );
    }

    if (user) {
        return (
            <>
                <CustomStackScreen/>
                <YStack flex={1} justifyContent="center" alignItems="center">
                    <ActivityIndicator size="large" color="#0000ff"/>
                </YStack>
                <Redirect href="/"/>
            </>
        )
    }

    return <Login/>;
}

export default LoginPage;