import React, {FC, useMemo} from "react";
import {GetProps, ThemeableStack, XStack, YStack} from "tamagui";
import Feather from "@expo/vector-icons/Feather";

import {CustomText} from "@/components/CustomText";
import {Test} from "@/types/Test";
import i18n from "@/localization/i18n";
import CompleteStatus from "@/types/CompleteStatus";

type Props = {
    test: Test;
    onPress?: () => void;
    disabled?: boolean;
} & GetProps<typeof ThemeableStack>;

const TestButton: FC<Props> = ({test, onPress, disabled = false, ...props}) => {
    const statusDetails = useMemo(() => {
        switch (test.completed) {
            case CompleteStatus.COMPLETED:
                return {
                    bg: "#ECFDF5",
                    text: "#059669",
                    label: i18n.t("COMPLETED") || "Completed",
                };
            case CompleteStatus.IN_PROGRESS:
                return {
                    bg: "#FFFBEB",
                    text: "#D97706",
                    label: i18n.t("IN_PROGRESS") || "In Progress",
                };
            default:
                return {
                    bg: "#F8FAFC",
                    text: "#64748B",
                    label: i18n.t("NOT_STARTED") || "Not Started",
                };
        }
    }, [test.completed]);

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
            <YStack
                backgroundColor="#FFFFFF"
                borderRadius={16}
                padding={16}
                borderWidth={1}
                borderColor="$gray-85"
                gap={12}
            >
                <XStack justifyContent="space-between" alignItems="flex-start" gap={8}>
                    <YStack gap={2} flex={1}>
                        <CustomText size="h5Medium" color="$gray-20" numberOfLines={2}>
                            {test.progress.book.title}
                        </CustomText>
                        <CustomText size="p3Regular" color="$gray-40">
                            {test.progress.book.author}
                        </CustomText>
                    </YStack>
                    <XStack
                        backgroundColor={statusDetails.bg}
                        paddingHorizontal={8}
                        paddingVertical={4}
                        borderRadius={8}
                        alignItems="center"
                    >
                        <CustomText
                            size="p3Medium"
                            color={statusDetails.text}
                            style={{fontSize: 11}}
                        >
                            {statusDetails.label}
                        </CustomText>
                    </XStack>
                </XStack>

                <XStack gap={16} paddingVertical={4} borderTopWidth={1} borderTopColor="$gray-93" paddingTop={10}>
                    <XStack alignItems="center" gap={6}>
                        <Feather name="book-open" size={14} color="#94A3B8" />
                        <CustomText size="p2Regular" color="$gray-40">
                            {i18n.t("pages_range", {start: test.startPage, end: test.endPage})}
                        </CustomText>
                    </XStack>
                    <XStack alignItems="center" gap={6}>
                        <Feather name="help-circle" size={14} color="#94A3B8" />
                        <CustomText size="p2Regular" color="$gray-40">
                            {i18n.t("test_button_questions_amount", {questionsAmount: test.questionsAmount})}
                        </CustomText>
                    </XStack>
                </XStack>

                {test.completed === CompleteStatus.COMPLETED && (
                    <XStack
                        justifyContent="space-between"
                        alignItems="center"
                        backgroundColor="#F5F3FF"
                        padding={10}
                        borderRadius={10}
                    >
                        <CustomText size="p2Medium" color="#6366F1">
                            {i18n.t("test_status") || "Status:"} {i18n.t("COMPLETED")}
                        </CustomText>
                        <CustomText size="p2Medium" color="#6366F1">
                            {i18n.t("result_grade", {grade: test.grade})}
                        </CustomText>
                    </XStack>
                )}
            </YStack>
        </ThemeableStack>
    );
};

export default TestButton;