import React, {FC, useMemo} from "react";
import {GetProps, ThemeableStack, View, XStack} from "tamagui";
import Feather from "@expo/vector-icons/Feather";

import {CustomText} from "@/components/CustomText";
import {Participant} from "@/types/Paticipant";

type Props = {
    participant: Participant;
    onPress?: () => void;
    disabled?: boolean;
} & GetProps<typeof ThemeableStack>;

const ParticipantButton: FC<Props> = ({participant, onPress, disabled = false, ...props}) => {
    const themeColor = useMemo(() => {
        const colors = [
            { bg: "#E0F2FE", text: "#0284C7" }, // Light Blue
            { bg: "#F3E8FF", text: "#7E22CE" }, // Lavender/Purple
            { bg: "#FCE7F3", text: "#BE185D" }, // Soft Pink
            { bg: "#FEF3C7", text: "#B45309" }, // Soft Amber
            { bg: "#D1FAE5", text: "#047857" }, // Mint Green
        ];
        const nameCode = participant.name
            ? participant.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
            : 0;
        return colors[nameCode % colors.length];
    }, [participant.name]);

    const initial = useMemo(() => {
        return participant.name ? participant.name.charAt(0).toUpperCase() : "?";
    }, [participant.name]);

    return (
        <ThemeableStack
            pressStyle={{
                opacity: 0.9,
                scale: 0.98,
            }}
            onPress={onPress}
            disabled={disabled}
            {...props}
        >
            <XStack
                backgroundColor="#FFFFFF"
                borderRadius={16}
                padding={12}
                alignItems="center"
                justifyContent="space-between"
                borderWidth={1}
                borderColor="$gray-85"
                gap={12}
            >
                <XStack alignItems="center" gap={12} flex={1}>
                    <View
                        width={40}
                        height={40}
                        borderRadius={20}
                        backgroundColor={themeColor.bg}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <CustomText
                            size="h5Medium"
                            color={themeColor.text}
                            style={{lineHeight: undefined, paddingTop: 0}}
                        >
                            {initial}
                        </CustomText>
                    </View>
                    <CustomText size="h5Medium" color="$gray-20" numberOfLines={1} flex={1}>
                        {participant.name}
                    </CustomText>
                </XStack>
                <Feather name="chevron-right" size={16} color="#94A3B8" />
            </XStack>
        </ThemeableStack>
    );
};

export default ParticipantButton;