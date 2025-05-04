import React from "react";
import {YStack} from "tamagui";
import {ActivityIndicator} from "react-native";
import {useRouter} from "expo-router";

import {useAppDispatch, useAppSelector} from "@/store";
import CustomStackScreen from "@/components/CustomStackScreen";
import {CustomText} from "@/components/CustomText";
import {Status} from "@/types";
import i18n from "@/localization/i18n";
import BottomButtonGroup from "@/components/buttons/BottomButtonGroup";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import {resetCurrentTest} from "@/store/testSlice";


const Results = () => {
    const {currentTest, savingTestInfo} = useAppSelector((state) => state.test);

    const router = useRouter();
    const dispatch = useAppDispatch();

    if (!currentTest || savingTestInfo.status === Status.LOADING) {
        return (
            <>
                <CustomStackScreen/>
                <YStack flex={1}>
                    <YStack flex={1} justifyContent="center" alignItems="center">
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </YStack>
                </YStack>
            </>
        )
    }

    const handleHomeButtonPress = () => {
        dispatch(resetCurrentTest())
        router.dismissTo("/");
    }

    return (
        <>
            <CustomStackScreen/>
            <YStack flex={1} paddingHorizontal={16} gap={20} justifyContent="center">
                <CustomText size="h3Regular" textAlign="center">
                    {i18n.t("correct_answer_amount", {amount: currentTest.correctAnswers})}
                </CustomText>
                <CustomText size="h2" textAlign="center">
                    {i18n.t("result_grade", {grade: currentTest.grade})}
                </CustomText>
            </YStack>

            <BottomButtonGroup>
                <PrimaryButton
                    onPress={handleHomeButtonPress}
                    text={i18n.t("back_to_home")}
                />
            </BottomButtonGroup>
        </>
    );
}

export default Results;