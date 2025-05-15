import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {useBackHandler} from "@react-native-community/hooks";
import {ScrollView, XStack, YStack} from "tamagui";
import { RefreshControl, TouchableOpacity} from "react-native";

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
import participantApi from "@/api/endpoints/participantApi";
import LabelledInput from "@/components/LabelledInput";
import Input from "@/components/input";
import NextIcon from "@/assets/images/icons/next-icon.svg";
import {Participant} from "@/types/Paticipant";
import ParticipantSelectModal from "@/components/modal/participant-select-modal";
import CreateTestModal from "@/components/modal/create-test-modal";

const Tests = () => {
    const {childId, isParentMode} = useUserMode();
    const router = useRouter();

    const [tests, setTests] = useState<Test[]>([])
    const [currentParticipant, setCurrentParticipant] = useState<Participant | undefined>(undefined)

    const [isParticipantSelectModalOpen, setIsParticipantSelectModalOpen] = useState(false)
    const [isCreateTestModalOpen, setIsCreateTestModalOpen] = useState(false)

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

    const fetchAllParticipantApi = useApi(
        participantApi.fetchAllParticipants,
        {
            onSuccess: (data) => {
                if (data.length > 0) {
                    setCurrentParticipant(data[0])
                }
            },
            errorHandler: {
                title: i18n.t("error"),
                message: `${i18n.t("failed_to_fetch_children")}\n${i18n.t("please_try_again_later")}`,
                options: {
                    tryAgain: true,
                    cancel: true,
                    navigate: {
                        mode: "back",
                    },
                },
            },
        },
    );

    const invokeFetchAllParticipants = useCallback(() => {
        fetchAllParticipantApi.execute();
    }, [fetchAllParticipantApi]);

    const invokeFetchTestsByParticipantIdApi = useCallback(() => {
        if (childId) {
            fetchTestsByParticipantIdApi.execute(childId.toString());
        } else if (currentParticipant) {
            fetchTestsByParticipantIdApi.execute(currentParticipant.id.toString());
        }
    }, [fetchTestsByParticipantIdApi, childId, currentParticipant]);

    useEffect(() => {
        invokeFetchTestsByParticipantIdApi()
    }, [isParentMode, currentParticipant]);

    useEffect(() => {
        if (isParentMode) {
            invokeFetchAllParticipants()
        }
    }, []);

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
                    contentContainerStyle={{paddingHorizontal: 16}}
                >
                    <YStack flex={1} gap={20}>
                        <YStack gap={16}>
                            <CustomText size="h2">
                                {i18n.t("tests")}
                            </CustomText>
                            {isParentMode && (
                                <LabelledInput label={i18n.t("child_name")} htmlFor="childName">
                                    <TouchableOpacity
                                        onPress={() => setIsParticipantSelectModalOpen(true)}
                                        activeOpacity={0.7}
                                    >
                                        <Input
                                            id="childName"
                                            inputEnabled={false}
                                            value={currentParticipant?.name || i18n.t("name")}
                                            placeholder={i18n.t("name")}
                                            rightElement={<NextIcon fill="black"/>}
                                        />
                                    </TouchableOpacity>
                                </LabelledInput>
                            )}
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
                        onPress={() => setIsCreateTestModalOpen(true)}
                        text={i18n.t("assign_test")}
                    />
                </BottomButtonGroup>
            )}

            <ParticipantSelectModal
                onClose={() => setIsParticipantSelectModalOpen(false)}
                isOpen={isParticipantSelectModalOpen}
                onSelectParticipant={setCurrentParticipant}
            />

            {isParentMode && currentParticipant && (
                <CreateTestModal
                    onClose={() => setIsCreateTestModalOpen(false)}
                    isOpen={isCreateTestModalOpen}
                    onSave={invokeFetchTestsByParticipantIdApi}
                    participantId={currentParticipant.id}
                    participantName={currentParticipant.name}
                />
            )}
        </>
    )
}

export default Tests;