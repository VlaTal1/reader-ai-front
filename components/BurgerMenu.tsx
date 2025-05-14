import React, {useState} from "react";
import {View, YStack} from "tamagui";
import {TouchableOpacity} from "react-native";
import Modal from "react-native-modal";
import * as Application from "expo-application";
import Constants from "expo-constants";

import ListButton from "@/components/buttons/ListButton";
import CloseIcon from "@/assets/images/icons/close-icon.svg";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import i18n from "@/localization/i18n";
import {CustomText} from "@/components/CustomText";
import ProfileIcon from "@/assets/images/icons/profile-icon.svg";
import ParticipantSelectModal from "@/components/modal/participant-select-modal";
import {UserMode, useUserMode} from "@/hooks/userModeContext";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

const BurgerMenu: React.FC<Props> = ({isOpen, onClose, onLogout}) => {
    const {setActiveChildId, changeUserMode, userMode, isChildMode} = useUserMode();

    const version = Constants.expoConfig?.version;
    const buildNumber = Application.nativeBuildVersion;

    const [isSwitchParticipantModalOpen, setIsSwitchParticipantModalOpen] = useState(false)

    const handleSwitchMode = async () => {
        if (isChildMode) {
            await changeUserMode(UserMode.PARENT);
        } else {
            setIsSwitchParticipantModalOpen(true)
        }
        onClose();
    }

    const handleChildSelect = async (childId: string) => {
        await setActiveChildId(childId);
        await changeUserMode(UserMode.CHILD)
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
                                text={i18n.t(`${userMode === UserMode.PARENT ? "switch_to_child_mode" : "switch_to_parent_mode"}`)}
                                icon={ProfileIcon}
                                iconColor="#333333"
                                delimiter={false}
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

            <ParticipantSelectModal
                onClose={() => setIsSwitchParticipantModalOpen(false)}
                isOpen={isSwitchParticipantModalOpen}
                onSelectId={handleChildSelect}
            />
        </>
    )
}

export default BurgerMenu;
