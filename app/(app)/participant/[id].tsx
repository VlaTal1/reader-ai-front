import React, {useCallback, useEffect, useState} from "react";
import {XStack, YStack} from "tamagui";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useBackHandler} from "@react-native-community/hooks";
import {ActivityIndicator} from "react-native";

import CustomStackScreen from "@/components/CustomStackScreen";
import i18n from "@/localization/i18n";
import Header from "@/components/Header";
import HeaderButton from "@/components/buttons/HeaderButton";
import {CustomText} from "@/components/CustomText";
import useApi from "@/hooks/useApi";
import BottomButtonGroup from "@/components/buttons/BottomButtonGroup";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import {useUserMode} from "@/hooks/userModeContext";
import participantApi from "@/api/endpoints/participantApi";
import {Participant} from "@/types/Paticipant";
import testApi from "@/api/endpoints/testApi";
import {Test} from "@/types/Test";
import TestButton from "@/components/buttons/TestButton";
import CreateTestModal from "@/components/modal/create-test-modal";

const ParticipantDetails = () => {
    const {isParentMode} = useUserMode();
    const {id} = useLocalSearchParams();
    const router = useRouter();

    const [participant, setParticipant] = useState<Participant | undefined>(undefined);
    const [tests, setTests] = useState<Test[]>([])

    const [isCreateTestModalOpen, setIsCreateTestModalOpen] = useState(false)

    const onCancel = useCallback(() => {
        router.back();
    }, [router]);

    useBackHandler(() => {
        onCancel();
        return true;
    });

    const fetchParticipantByIdApi = useApi(
        participantApi.fetchParticipantById,
        {
            onSuccess: (data) => {
                setParticipant(data);
            },
            errorHandler: {
                title: i18n.t("error"),
                message: `${i18n.t("failed_to_fetch_child")}\n${i18n.t("please_try_again_later")}`,
                options: {
                    tryAgain: true,
                    cancel: true,
                },
            },
        },
    );

    const invokeFetchParticipantByIdApi = useCallback(() => {
        fetchParticipantByIdApi.execute(typeof id === "string" ? id : id[0]);
    }, [fetchParticipantByIdApi, id]);

    useEffect(() => {
        invokeFetchParticipantByIdApi()
    }, []);

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

    const invokeFetchTestsByParticipantIdApi = useCallback(() => {
        if (participant) {
            fetchTestsByParticipantIdApi.execute(participant.id.toString());
        }
    }, [fetchTestsByParticipantIdApi, participant]);

    useEffect(() => {
        invokeFetchTestsByParticipantIdApi()
    }, [participant]);

    if (fetchParticipantByIdApi.loading || !participant) {
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
                    <YStack flex={1} justifyContent="center" alignItems="center">
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </YStack>
                </YStack>
            </>
        )
    }

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

                <YStack flex={1} paddingHorizontal={16} gap={20}>
                    <YStack>
                        <CustomText size="h2">
                            {participant.name}
                        </CustomText>
                    </YStack>
                    {isParentMode && (
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
                    )}
                </YStack>
            </YStack>

            <BottomButtonGroup>
                <PrimaryButton
                    onPress={() => setIsCreateTestModalOpen(true)}
                    text={i18n.t("assign_test")}
                />
            </BottomButtonGroup>

            <CreateTestModal
                onClose={() => setIsCreateTestModalOpen(false)}
                isOpen={isCreateTestModalOpen}
                onSave={invokeFetchTestsByParticipantIdApi}
                participantId={participant.id}
                participantName={participant.name}
            />
        </>
    )
};

export default ParticipantDetails;