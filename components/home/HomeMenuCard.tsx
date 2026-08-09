import React from "react";
import {GetProps, ThemeableStack, View, XStack, YStack} from "tamagui";
import Feather from "@expo/vector-icons/Feather";

import {CustomText} from "@/components/CustomText";

type HomeMenuCardProps = {
    title: string;
    type: "books" | "tests" | "participants" | "statistics" | "readingSpeed";
    onPress?: () => void;
    disabled?: boolean;
} & GetProps<typeof ThemeableStack>;

export const HomeMenuCard = ({title, type, onPress, disabled, ...props}: HomeMenuCardProps) => {
    let iconName: React.ComponentProps<typeof Feather>["name"] = "book-open";
    let iconColor = "#3B82F6";
    let iconBg = "#EFF6FF";
    let description = "";

    switch (type) {
        case "books":
            iconName = "book-open";
            iconColor = "#6366F1";
            iconBg = "#EEF2F6";
            description = "Explore library & read PDFs";
            break;
        case "tests":
            iconName = "clipboard";
            iconColor = "#10B981";
            iconBg = "#ECFDF5";
            description = "Assess reading comprehension";
            break;
        case "participants":
            iconName = "users";
            iconColor = "#8B5CF6";
            iconBg = "#F5F3FF";
            description = "Manage student access profiles";
            break;
        case "statistics":
            iconName = "bar-chart-2";
            iconColor = "#F59E0B";
            iconBg = "#FFFBEB";
            description = "Monitor times & performance metrics";
            break;
        case "readingSpeed":
            iconName = "mic";
            iconColor = "#EC4899";
            iconBg = "#FDF2F8";
            description = "Measure reading speed & accuracy";
            break;
    }

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
                borderRadius={20}
                padding={16}
                alignItems="center"
                justifyContent="space-between"
                borderWidth={1}
                borderColor="$gray-85"
                gap={16}
            >
                <XStack alignItems="center" gap={16} flex={1}>
                    <View
                        backgroundColor={iconBg}
                        padding={12}
                        borderRadius={16}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Feather name={iconName} size={24} color={iconColor} />
                    </View>
                    <YStack gap={2} flex={1}>
                        <CustomText size="h5Medium" color="$gray-20">
                            {title}
                        </CustomText>
                        {description ? (
                            <CustomText size="p3Regular" color="$gray-40">
                                {description}
                            </CustomText>
                        ) : null}
                    </YStack>
                </XStack>
                <Feather name="chevron-right" size={20} color="#94A3B8" />
            </XStack>
        </ThemeableStack>
    );
};
