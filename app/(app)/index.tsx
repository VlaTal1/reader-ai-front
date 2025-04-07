import React, {useEffect, useState} from "react";
import {View, XStack} from "tamagui";
import {Alert, BackHandler} from "react-native";
import {useBackHandler} from "@react-native-community/hooks";
import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomStackScreen from "@/components/CustomStackScreen";
import {HomeMenuCard} from "@/components/home/HomeMenuCard";
import i18n from "@/localization/i18n";
import BurgerMenu from "@/components/BurgerMenu";
import SwitchParticipantModal from "@/components/modal/switch-participant-modal";

const Home = () => {
    const router = useRouter();

    useBackHandler(() => {
        BackHandler.exitApp();
        return true;
    })

    const [isBurgerOpen, setIsBurgerOpen] = useState(false)
    const [isSwitchParticipantModalOpen, setIsSwitchParticipantModalOpen] = useState(false)
    const [userMode, setUserMode] = useState<string | undefined>(undefined)

    useEffect(() => {
        const loadUserMode = async () => {
            const mode = await AsyncStorage.getItem("userMode");
            if (mode) {
                setUserMode(mode);
            }
        };
        loadUserMode();
    }, []);

    const handleSwitchMode = () => {
        if (userMode === "child") {
            AsyncStorage.setItem("userMode", "parent");
        } else {
            setIsSwitchParticipantModalOpen(true)
        }
    }

    return (
        <>
            <CustomStackScreen/>
            <View padding={16} flexDirection="column" flex={1} justifyContent="flex-end">
                <XStack flexDirection="column" gap={6}>
                    <HomeMenuCard
                        title={i18n.t("books")}
                        onPress={() => router.navigate("/books")}
                    />
                    <HomeMenuCard
                        title={i18n.t("children")}
                        onPress={() => Alert.alert("Will be implemented later")}
                    />
                    <HomeMenuCard
                        title={i18n.t("switch_user_mode")}
                        onPress={handleSwitchMode}
                    />
                </XStack>
            </View>

            <BurgerMenu
                isOpen={isBurgerOpen}
                onClose={() => setIsBurgerOpen(false)}
                onLogout={() => Alert.alert("Will be implemented later")}
            />

            <SwitchParticipantModal
                onClose={() => setIsSwitchParticipantModalOpen(false)}
                isOpen={isSwitchParticipantModalOpen}
            />
        </>
    )
}

export default Home;
