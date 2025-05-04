import React, {useEffect, useState} from "react";
import {YStack} from "tamagui";
import {ActivityIndicator} from "react-native";
import {useRouter} from "expo-router";

import {useAppDispatch, useAppSelector} from "@/store";
import {Question} from "@/types/Question";
import CustomStackScreen from "@/components/CustomStackScreen";
import {CustomText} from "@/components/CustomText";
import {savePassedTest, selectAnswer} from "@/store/testSlice";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import {Status} from "@/types";


const Test = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {currentTest, savingTestInfo} = useAppSelector((state) => state.test);
    const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    useEffect(() => {
        if (currentTest && currentTest.questions.length > 0) {
            setCurrentQuestion(currentTest.questions[currentQuestionIndex])
        }
    }, [currentQuestionIndex, currentTest]);

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

    const onAnswerSelected = (answerId: number) => {
        dispatch(selectAnswer({questionIndex: currentQuestionIndex, selectedAnswerId: answerId}))
        if (currentQuestionIndex + 1 >= currentTest.questions.length) {
            dispatch(savePassedTest())
            router.navigate("/testPassing/results")
            return;
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    return (
        <>
            <CustomStackScreen/>
            <YStack flex={1} paddingHorizontal={16} gap={20} justifyContent="center">
                <CustomText size="h3Regular" textAlign="center">
                    {`${currentQuestionIndex + 1} / ${currentTest.questions.length}`}
                </CustomText>
                <CustomText size="h2" textAlign="center">
                    {currentQuestion?.question}
                </CustomText>
                <YStack gap={16}>
                    {
                        currentQuestion?.answers.map((answer) => (
                            <PrimaryButton
                                key={answer.id}
                                text={answer.answer}
                                onPress={() => onAnswerSelected(answer.id)}
                            />
                        ))
                    }
                </YStack>
            </YStack>
        </>
    );
}

export default Test;