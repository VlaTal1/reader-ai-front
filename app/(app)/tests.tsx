import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {useBackHandler} from "@react-native-community/hooks";
import {ScrollView, XStack, YStack} from "tamagui";
import {Alert, RefreshControl} from "react-native";

import useApi from "@/hooks/useApi";
import i18n from "@/localization/i18n";
import CustomStackScreen from "@/components/CustomStackScreen";
import Header from "@/components/Header";
import HeaderButton from "@/components/buttons/HeaderButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import BottomButtonGroup from "@/components/buttons/BottomButtonGroup";
import {useUserMode} from "@/hooks/userModeContext";
import {Test} from "@/types/Test";
import testApi from "@/api/endpoints/testApi";
import {CustomText} from "@/components/CustomText";
import TestButton from "@/components/buttons/TestButton";

const Tests = () => {
    const {childId, isParentMode} = useUserMode();
    const router = useRouter();

    const [tests, setTests] = useState<Test[]>([])

    const onCancel = useCallback(() => {
        router.back();
    }, [router]);

    useBackHandler(() => {
        onCancel();
        return true;
    })

    const fetchTestsByParticipantIdApi = useApi(
        testApi.fetchTestsByParticipantId,
        {
            onSuccess: (data) => {
                setTests(data);
            },
            errorHandler: {
                title: i18n.t("error"),
                message: `${i18n.t("failed_to_fetch_tests")}\n${i18n.t("please_try_again_later")}`,
                options: {
                    tryAgain: true,
                    cancel: true,
                },
            },
        },
    );

    const fetchTestsApi = useApi(
        testApi.fetchTests,
        {
            onSuccess: (data) => {
                setTests(data);
            },
            errorHandler: {
                title: i18n.t("error"),
                message: `${i18n.t("failed_to_fetch_tests")}\n${i18n.t("please_try_again_later")}`,
                options: {
                    tryAgain: true,
                    cancel: true,
                },
            },
        },
    );

    const invokeFetchTestsByParticipantIdApi = useCallback(() => {
        if (childId) {
            fetchTestsByParticipantIdApi.execute(childId.toString());
        }
    }, [fetchTestsByParticipantIdApi, childId]);

    const invokeFetchTestsApi = useCallback(() => {
        if (childId) {
            fetchTestsApi.execute();
        }
    }, [fetchTestsApi, childId]);

    useEffect(() => {
        if (isParentMode) {
            invokeFetchTestsApi()
        } else {
            invokeFetchTestsByParticipantIdApi()
        }
    }, [childId]);

    return (
        <>
            <CustomStackScreen/>
            <YStack flex={1}>
                <Header backgroundColor="transparent">
                    <XStack justifyContent="space-between" width="100%">
                        <HeaderButton
                            onPress={onCancel}
                            backgroundColor="transparent"
                            color="$gray-20"
                            text={i18n.t("back")}
                        />
                    </XStack>
                </Header>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={fetchTestsByParticipantIdApi.loading}
                            onRefresh={invokeFetchTestsByParticipantIdApi}
                        />
                    }
                >
                    <YStack flex={1} paddingHorizontal={16} gap={20}>
                        <YStack gap={16}>
                            <CustomText size="h4Regular" width="100%" textAlign="center">
                                {i18n.t("tests")}
                            </CustomText>
                            <YStack gap={6}>
                                {
                                    tests.map((test) => (
                                        <TestButton key={test.id} test={test}/>
                                    ))
                                }
                            </YStack>
                        </YStack>
                    </YStack>
                </ScrollView>
            </YStack>

            {isParentMode && (
                <BottomButtonGroup>
                    <PrimaryButton
                        onPress={() => Alert.alert("later")}
                        text={i18n.t("assign_test")}
                    />
                </BottomButtonGroup>
            )}
        </>
    )
}

export default Tests;