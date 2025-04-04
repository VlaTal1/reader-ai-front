import React from "react";
import {View, XStack} from "tamagui";
import {Alert, BackHandler} from "react-native";
import {useBackHandler} from "@react-native-community/hooks";
import {useRouter} from "expo-router";

import CustomStackScreen from "@/components/CustomStackScreen";
import {HomeMenuCard} from "@/components/home/HomeMenuCard";
import i18n from "@/localization/i18n";

const Home = () => {
    const router = useRouter();

    useBackHandler(() => {
        BackHandler.exitApp();
        return true;
    })

    return (
        <>
            <CustomStackScreen/>
            <View padding={16} flexDirection="column">
                <XStack flexDirection="column" gap={6}>
                    <HomeMenuCard
                        title={i18n.t("books")}
                        onPress={() => router.navigate("/books")}
                    />
                    <HomeMenuCard
                        title={i18n.t("children")}
                        onPress={() => Alert.alert("Will be implemented later")}
                    />
                </XStack>
            </View>
        </>
    )
}

export default Home;
