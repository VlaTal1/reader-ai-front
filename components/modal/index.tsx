import React, {FC} from "react";
import Modal from "react-native-modal";
import {ScrollView, View} from "tamagui";
import {DimensionValue} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

import BottomButtonGroup from "@/components/buttons/BottomButtonGroup";
import {CustomText} from "@/components/CustomText";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    headerImage?: React.ReactNode;
    headerText?: string;
    headerDescription?: string;
    headerActions?: React.ReactNode;
    headerActionsVariant?: "underDescription" | "inHeader";
    modalActions?: React.ReactNode;
    modalActionsVariant?: "default" | "floating";
    scrollable?: boolean;
    onDiscard?: () => unknown;
    minHeight?: DimensionValue | undefined;
    children?: React.ReactNode;
    isSwipeDisable?: boolean;
    swipeThreshold?: number;
    height?: DimensionValue | undefined;
    isKeyboardVisible?: boolean;
}

const BottomSheetModal: FC<ModalProps> = (
    {
        isOpen,
        onClose,
        headerImage,
        headerText,
        headerDescription,
        headerActions,
        headerActionsVariant = "underDescription",
        modalActions,
        modalActionsVariant = "default",
        scrollable = true,
        onDiscard = undefined,
        minHeight,
        children,
        isSwipeDisable,
        swipeThreshold,
        height,
        isKeyboardVisible = false,
    },
) => {
    return (
        <Modal
            isVisible={isOpen}
            onBackdropPress={onClose}
            onSwipeMove={(_percentageShown, gestureState) => {
                const swipeDistance = Math.abs(gestureState.dy);
                const THRESHOLD = 100; // Replace with your desired threshold
                if (!!onDiscard && swipeDistance > THRESHOLD) {
                    onDiscard();
                }
            }}
            swipeThreshold={swipeThreshold ?? 400}
            onSwipeComplete={onDiscard ? undefined : onClose}
            swipeDirection={isSwipeDisable ? undefined : "down"}
            style={{justifyContent: "flex-end", margin: 0}}
            onBackButtonPress={onClose}
        >
            <View
                backgroundColor="white"
                paddingTop={isSwipeDisable ? 22 : 10}
                paddingHorizontal={22}
                paddingBottom={22}
                borderTopLeftRadius={!isKeyboardVisible ? 20 : 0}
                borderTopRightRadius={!isKeyboardVisible ? 20 : 0}
                gap={24}
                maxHeight={isKeyboardVisible ? "100%" : "90%"}
                height={height}
            >
                {!isSwipeDisable &&
                    <View
                        width={65}
                        height={5}
                        borderRadius={100}
                        backgroundColor="#CAC8D0"
                        alignSelf="center"
                    />
                }
                {scrollable ? (
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            width: "100%",
                            gap: 24,
                            minHeight: minHeight,
                        }}
                        keyboardShouldPersistTaps="always"
                    >
                        <ModalContent
                            image={headerImage}
                            title={headerText}
                            description={headerDescription}
                            actions={headerActions}
                            actionsVariant={headerActionsVariant}
                        >
                            {children}
                        </ModalContent>
                    </ScrollView>
                ) : (
                    <ModalContent
                        image={headerImage}
                        title={headerText}
                        description={headerDescription}
                        actions={headerActions}
                        actionsVariant={headerActionsVariant}
                    >
                        {children}
                    </ModalContent>
                )}
                {modalActions && (
                    modalActionsVariant === "default" ? (
                        <View width="100%" alignItems="center">
                            {modalActions}
                        </View>
                    ) : (
                        <BottomButtonGroup>
                            {modalActions}
                        </BottomButtonGroup>
                    )
                )}
            </View>
        </Modal>
    )
}

export default BottomSheetModal;

const ModalContent: React.FC<{
    image?: React.ReactNode;
    title?: string;
    description?: string;
    actions?: React.ReactNode;
    actionsVariant?: "underDescription" | "inHeader";
    children?: React.ReactNode;
}> = ({image, title, description, actions, actionsVariant, children}) => {
    return (
        <>
            <View alignItems="center" gap={24} width="100%">
                {image && image}
                <View gap={12} width="100%">
                    {title && (
                        <CustomText size="h4Regular" textAlign="center" color="$gray-20">
                            {title}
                        </CustomText>
                    )}
                    {description && (
                        <CustomText size="p1Light" textAlign="center" color="$gray-40">
                            {description}
                        </CustomText>
                    )}
                    {actionsVariant === "underDescription"
                        ? actions
                        : (
                            <View position="absolute" top={0} right={0}>
                                {actions}
                            </View>
                        )}
                </View>
            </View>
            {children}
        </>
    )
}
