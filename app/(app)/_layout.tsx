import React from "react";
import {ActivityIndicator} from "react-native";
import {YStack} from "tamagui";
import {Redirect, Stack} from "expo-router";

import {useAuth} from "@/auth/SupabaseAuthProvider";
import CustomStackScreen from "@/components/CustomStackScreen";


export default function App() {
    const {user, isLoading: isProfileLoading} = useAuth();

    if (!isProfileLoading && !user) {
        return (
            <>
                <CustomStackScreen/>
                <YStack flex={1} justifyContent="center" alignItems="center">
                    <ActivityIndicator size="large" color="#0000ff"/>
                </YStack>
                <Redirect href="/login"/>
            </>
        )
    }

    if (isProfileLoading || !user ) {
        return (
            <>
                <CustomStackScreen/>
                <YStack flex={1} justifyContent="center" alignItems="center">
                    <ActivityIndicator size="large" color="#0000ff"/>
                </YStack>
            </>
        );
    }

    return (
        <Stack/>
    );
}
