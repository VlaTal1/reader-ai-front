import React, {FC, useMemo} from "react";
import {ThemeableStack, XStack, YStack} from "tamagui";

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
    const backgroundColor = useMemo(() => {
        if (test.completed === CompleteStatus.COMPLETED) {
            return "#b0de61"
        } else if (test.completed === CompleteStatus.IN_PROGRESS) {
            return "#e8d094"
        }
        return "$gray-100"
    }, [test.completed])

    return (
        <ThemeableStack
            pressStyle={{
                opacity: 0.8,
            }}
            onPress={onPress}
            disabled={disabled}
        >
            <YStack
                backgroundColor={backgroundColor}
                borderRadius={20}
                paddingHorizontal={20}
                paddingVertical={10}
                justifyContent="space-between"
                gap={10}
            >
                <XStack justifyContent="space-between">
                    <CustomText size="h5Regular" numberOfLines={1}>
                        {test.progress.book.title}
                    </CustomText>
                    {/*{isParentMode && (*/}
                    {/*    <CustomText size="h5Regular" numberOfLines={1}>*/}
                    {/*        {i18n.t("test_button_child_name", {childName: test.progress.participant.name})}*/}
                    {/*    </CustomText>*/}
                    {/*)}*/}
                </XStack>
                <YStack>
                    <CustomText size="p1Regular" numberOfLines={1}>
                        {i18n.t("pages_range", {start: test.startPage, end: test.endPage})}
                    </CustomText>
                    <CustomText size="p1Regular" numberOfLines={1}>
                        {i18n.t("test_button_questions_amount", {questionsAmount: test.questionsAmount})}
                    </CustomText>
                </YStack>
                <XStack justifyContent="space-between">
                    <CustomText size="p1Regular" numberOfLines={1}>
                        {`${i18n.t("test_status")} ${i18n.t(test.completed)}`}
                    </CustomText>
                    {test.completed === CompleteStatus.COMPLETED && (
                        <CustomText size="p1Regular" numberOfLines={1}>
                            {i18n.t("result_grade", {grade: test.grade})}
                        </CustomText>
                    )}
                </XStack>
            </YStack>
        </ThemeableStack>
    );
}

export default TestButton;