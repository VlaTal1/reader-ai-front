import React, {useState, useMemo} from "react";
import {View, YStack, XStack} from "tamagui";
import {TouchableOpacity, Dimensions} from "react-native";
import Modal from "react-native-modal";
import * as Application from "expo-application";
import Constants from "expo-constants";
import Feather from "@expo/vector-icons/Feather";

import CloseIcon from "@/assets/images/icons/close-icon.svg";
import i18n from "@/localization/i18n";
import {CustomText} from "@/components/CustomText";
import ParticipantSelectModal from "@/components/modal/participant-select-modal";
import {UserMode, useUserMode} from "@/hooks/userModeContext";
import {useAuth} from "@/auth/SupabaseAuthProvider";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

const BurgerMenu: React.FC<Props> = ({isOpen, onClose, onLogout}) => {
    const {setActiveChildId, changeUserMode, userMode, isChildMode} = useUserMode();
    const {user} = useAuth();

    const screenWidth = Dimensions.get("window").width;
    const drawerWidth = screenWidth * 0.8;

    const version = Constants.expoConfig?.version;
    const buildNumber = Application.nativeBuildVersion;

    const [isSwitchParticipantModalOpen, setIsSwitchParticipantModalOpen] = useState(false);

    const handleSwitchMode = async () => {
        if (isChildMode) {
            await setActiveChildId(null);
            await changeUserMode(UserMode.PARENT);
        } else {
            setIsSwitchParticipantModalOpen(true);
        }
        onClose();
    };

    const handleChildSelect = async (childId: string) => {
        await setActiveChildId(childId);
        await changeUserMode(UserMode.CHILD);
        onClose();
    };

    const userInitial = useMemo(() => {
        if (user?.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return "P";
    }, [user?.email]);

    return (
        <>
            <Modal
                isVisible={isOpen}
                onBackdropPress={onClose}
                presentationStyle="overFullScreen"
                style={{margin: 0, justifyContent: "flex-start", flexDirection: "row"}}
                onBackButtonPress={onClose}
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                useNativeDriver={true}
                swipeDirection="left"
                onSwipeComplete={onClose}
                propagateSwipe={true}
            >
                <View
                    width={drawerWidth}
                    height="100%"
                    padding={20}
                    backgroundColor="$gray-100"
                    borderTopRightRadius={24}
                    borderBottomRightRadius={24}
                    justifyContent="space-between"
                >
                    <YStack gap={24} flex={1}>
                        {/* Header Row */}
                        <XStack justifyContent="space-between" alignItems="center">
                            <CustomText size="h3Medium" color="$gray-20">
                                Menu
                            </CustomText>
                            <TouchableOpacity onPress={onClose}>
                                <View
                                    width={40}
                                    height={40}
                                    borderRadius={20}
                                    borderColor="$gray-85"
                                    borderWidth={1}
                                    alignItems="center"
                                    justifyContent="center"
                                    backgroundColor="$gray-93"
                                >
                                    <CloseIcon fill="#0F172A" width={16} height={16} />
                                </View>
                            </TouchableOpacity>
                        </XStack>

                        {/* User Profile Card */}
                        <XStack
                            backgroundColor="$gray-93"
                            padding={16}
                            borderRadius={16}
                            alignItems="center"
                            gap={12}
                            borderWidth={1}
                            borderColor="$gray-85"
                        >
                            <View
                                width={48}
                                height={48}
                                borderRadius={24}
                                backgroundColor="#EEF2F6"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <CustomText size="h4Medium" color="#6366F1">
                                    {userInitial}
                                </CustomText>
                            </View>
                            <YStack flex={1} gap={2}>
                                <CustomText size="p2Medium" color="$gray-20">
                                    {userMode === UserMode.PARENT ? "Parent Account" : "Child Mode Active"}
                                </CustomText>
                                <CustomText size="p3Regular" color="$gray-40" numberOfLines={1}>
                                    {user?.email || "parent@bookwise.com"}
                                </CustomText>
                            </YStack>
                        </XStack>

                        {/* Main Navigation Menu List */}
                        <YStack gap={12}>
                            <TouchableOpacity onPress={handleSwitchMode} activeOpacity={0.7}>
                                <XStack
                                    backgroundColor="#FFFFFF"
                                    borderRadius={16}
                                    padding={16}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    borderWidth={1}
                                    borderColor="$gray-85"
                                >
                                    <XStack alignItems="center" gap={12}>
                                        <View
                                            backgroundColor="#F5F3FF"
                                            padding={10}
                                            borderRadius={12}
                                        >
                                            <Feather name="refresh-cw" size={20} color="#8B5CF6" />
                                        </View>
                                        <CustomText size="p1Medium" color="$gray-20">
                                            {i18n.t(
                                                userMode === UserMode.PARENT
                                                    ? "switch_to_child_mode"
                                                    : "switch_to_parent_mode"
                                            )}
                                        </CustomText>
                                    </XStack>
                                    <Feather name="chevron-right" size={16} color="#94A3B8" />
                                </XStack>
                            </TouchableOpacity>
                        </YStack>
                    </YStack>

                    {/* Bottom Info and Logout */}
                    <YStack gap={16}>
                        <CustomText size="p3Light" textAlign="center" color="$gray-60">
                            {`Version ${version} #${buildNumber}`}
                        </CustomText>
                        <TouchableOpacity onPress={onLogout} activeOpacity={0.7}>
                            <View
                                backgroundColor="#FDF2F2"
                                borderColor="#FCA5A5"
                                borderWidth={1}
                                borderRadius={16}
                                padding={14}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <CustomText size="p1Medium" color="#EF4444">
                                    {i18n.t("logout")}
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                    </YStack>
                </View>
            </Modal>

            <ParticipantSelectModal
                onClose={() => setIsSwitchParticipantModalOpen(false)}
                isOpen={isSwitchParticipantModalOpen}
                onSelectId={handleChildSelect}
            />
        </>
    );
};

export default BurgerMenu;
