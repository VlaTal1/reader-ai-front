import React, {useEffect, useState} from "react";
import {View, YStack} from "tamagui";
import {TouchableOpacity} from "react-native";
import Modal from "react-native-modal";
import * as Application from "expo-application";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ListButton from "@/components/buttons/ListButton";
import ArrowRightIcon from "@/assets/images/icons/next-icon.svg";
import CloseIcon from "@/assets/images/icons/close-icon.svg";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import i18n from "@/localization/i18n";
import {CustomText} from "@/components/CustomText";
import ProfileIcon from "@/assets/images/icons/profile-icon.svg";
import SwitchParticipantModal from "@/components/modal/switch-participant-modal";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

const BurgerMenu: React.FC<Props> = ({isOpen, onClose, onLogout}) => {
    const version = Constants.expoConfig?.version;
    const buildNumber = Application.nativeBuildVersion;

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
        onClose();
    }

    return (
        <>
            <Modal
                isVisible={isOpen}
                presentationStyle="overFullScreen"
                style={{margin: 0}}
                onBackButtonPress={onClose}
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                useNativeDriver={true}
                swipeDirection="left"
                onSwipeComplete={onClose}
                propagateSwipe={true}
            >
                <View gap={24} flex={1} padding={16} backgroundColor="$gray-100">
                    <TouchableOpacity onPress={onClose} style={{width: 56}}>
                        <View
                            width={56}
                            height={56}
                            borderRadius={56}
                            borderColor="$gray-60"
                            borderWidth={1}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <CloseIcon fill="#333333"/>
                        </View>
                    </TouchableOpacity>
                    <YStack flex={1} gap={8}>
                        <YStack
                            borderRadius={16}
                            gap={6}
                            borderColor="$gray-85"
                            borderWidth={1}
                            paddingVertical={6}
                            paddingHorizontal={20}
                        >
                            <ListButton
                                onPress={handleSwitchMode}
                                text={i18n.t("burger_profile")}
                                icon={ProfileIcon}
                                iconColor="#333333"
                                rightPart={(
                                    <ArrowRightIcon
                                        fill="#333333"
                                        onPress={handleSwitchMode}
                                    />
                                )}
                            />
                        </YStack>
                        <YStack>
                            <CustomText size="p3Light" textAlign="center" color="$gray-85">
                                {`${version}#${buildNumber}`}
                            </CustomText>
                        </YStack>
                    </YStack>
                    <PrimaryButton text={i18n.t("logout")} onPress={onLogout}/>
                </View>
            </Modal>

            <SwitchParticipantModal
                onClose={() => setIsSwitchParticipantModalOpen(false)}
                isOpen={isSwitchParticipantModalOpen}
            />
        </>
    )
}

export default BurgerMenu;
