import React, {useState} from "react";
import {Circle, View, XStack} from "tamagui";
import { BackHandler} from "react-native";
import {useBackHandler} from "@react-native-community/hooks";
import {useRouter} from "expo-router";

import BurgerIcon from "@/assets/images/icons/burger-icon.svg";
import {useAuth} from "@/auth/SupabaseAuthProvider";
import CustomStackScreen from "@/components/CustomStackScreen";
import {HomeMenuCard} from "@/components/home/HomeMenuCard";
import i18n from "@/localization/i18n";
import BurgerMenu from "@/components/BurgerMenu";
import {useUserMode} from "@/hooks/userModeContext";

const Home = () => {
    const {user, profile, isLoading: isProfileLoading, signOut} = useAuth();
    const {isParentMode} = useUserMode();
    const router = useRouter();

    useBackHandler(() => {
        BackHandler.exitApp();
        return true;
    })

    const onLogout = async () => {
        await signOut();
        setIsBurgerOpen(false);
    };

    const [isBurgerOpen, setIsBurgerOpen] = useState(false)

    return (
        <>
            <CustomStackScreen/>
            <View padding={16} flexDirection="column" flex={1} justifyContent="flex-end">
                <View
                    flex={1}
                    flexDirection="column"
                    position="relative"
                >
                    <XStack
                        position="absolute"
                        top={0}
                        left={0}
                        flexDirection="row"
                        alignItems="center"
                        gap={10}
                        zIndex={100}
                    >
                        <Circle
                            pressStyle={{opacity: 0.5}}
                            backgroundColor="transparent"
                            borderColor="$gray-60"
                            borderWidth={1}
                            padding={16}
                            onPress={() => setIsBurgerOpen(true)}
                        >
                            <BurgerIcon width={24} height={24} fill="#333333"/>
                        </Circle>
                    </XStack>
                </View>
                <XStack flexDirection="column" gap={6}>
                    <HomeMenuCard
                        title={i18n.t("books")}
                        onPress={() => router.navigate("/books")}
                    />
                    <HomeMenuCard
                        title={i18n.t("tests")}
                        onPress={() => router.navigate("/tests")}
                    />
                    {isParentMode && (
                        <HomeMenuCard
                            title={i18n.t("children")}
                            onPress={() => router.navigate("/participants")}
                        />
                    )}
                    <HomeMenuCard
                        title={i18n.t("statistics")}
                        onPress={() => router.navigate("/statistics")}
                    />
                </XStack>
            </View>

            <BurgerMenu
                isOpen={isBurgerOpen}
                onClose={() => setIsBurgerOpen(false)}
                onLogout={onLogout}
            />
        </>
    )
}

export default Home;
