import React, {FC} from "react";
import {ThemeableStack, YStack} from "tamagui";

import {CustomText} from "@/components/CustomText";
import {Test} from "@/types/Test";
import i18n from "@/localization/i18n";
import CompleteStatus from "@/types/CompleteStatus";

type Props = {
    test: Test
    onPress?: () => void
    disabled?: boolean
}
const TestButton: FC<Props> = ({test, onPress, disabled = false}) => {
    return (
        <ThemeableStack
            pressStyle={{
                opacity: 0.8,
            }}
            onPress={onPress}
            disabled={disabled}
        >
            <YStack
                backgroundColor="$gray-100"
                borderRadius={20}
                paddingHorizontal={20}
                paddingVertical={10}
                justifyContent="space-between"
            >
                <CustomText size="h5Regular" numberOfLines={1}>
                    {test.progress.book.title}
                </CustomText>
                <CustomText size="p1Regular" numberOfLines={1}>
                    {i18n.t("pages_range", {start: test.startPage, end: test.endPage})}
                </CustomText>
                {test.completed === CompleteStatus.COMPLETED && (
                    <CustomText size="p1Regular" numberOfLines={1}>
                        {i18n.t("result_grade", {grade: test.grade})}
                    </CustomText>
                )}
                <CustomText size="p1Regular" numberOfLines={1}>
                    {i18n.t("test_status", {status: test.completed})}
                </CustomText>
            </YStack>
        </ThemeableStack>
    );
}

export default TestButton;