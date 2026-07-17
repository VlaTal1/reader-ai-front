import React, {useCallback, useEffect, useState} from "react";
import {ScrollView, View, XStack, YStack} from "tamagui";
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
import {useAppSelector} from "@/store";

const ParticipantDetails = () => {
    const {isParentMode} = useUserMode();
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const {testBook} = useAppSelector((state) => state.book)

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

    const fetchTestsByParticipantIdAndBookIdApi = useApi(
        testApi.fetchTestsByParticipantIdAndBookId,
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
    }, [participant]);

    const invokeFetchTestsByParticipantIdAndBookIdApi = useCallback(() => {
        if (participant && testBook) {
            fetchTestsByParticipantIdAndBookIdApi.execute({
                participantId: participant.id.toString(),
                bookId: testBook.id.toString(),
            });
        }
    }, [participant, testBook]);

    useEffect(() => {
        if (testBook) {
            invokeFetchTestsByParticipantIdAndBookIdApi()
        } else {
            invokeFetchTestsByParticipantIdApi()
        }
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

                <YStack flex={1} paddingHorizontal={16} gap={24}>
                    
                    {/* Participant Profile Card */}
                    <YStack
                        backgroundColor="#FFFFFF"
                        borderRadius={24}
                        padding={24}
                        alignItems="center"
                        borderWidth={1}
                        borderColor="$gray-85"
                        gap={16}
                        style={{
                            shadowColor: "rgba(0, 0, 0, 0.02)",
                            shadowOffset: {width: 0, height: 4},
                            shadowRadius: 8,
                            shadowOpacity: 0.1,
                        }}
                    >
                        {(() => {
                            const colors = [
                                { bg: "#E0F2FE", text: "#0284C7" }, // Light Blue
                                { bg: "#F3E8FF", text: "#7E22CE" }, // Lavender/Purple
                                { bg: "#FCE7F3", text: "#BE185D" }, // Soft Pink
                                { bg: "#FEF3C7", text: "#B45309" }, // Soft Amber
                                { bg: "#D1FAE5", text: "#047857" }, // Mint Green
                            ];
                            const nameCode = participant.name
                                ? participant.name.split("").reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0)
                                : 0;
                            const themeColor = colors[nameCode % colors.length];
                            const initial = participant.name ? participant.name.charAt(0).toUpperCase() : "?";

                            return (
                                <View
                                    width={64}
                                    height={64}
                                    borderRadius={32}
                                    backgroundColor={themeColor.bg}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <CustomText size="h3Medium" color={themeColor.text}>
                                        {initial}
                                    </CustomText>
                                </View>
                            );
                        })()}

                        <YStack alignItems="center" gap={4}>
                            <CustomText size="h2" color="$gray-20" textAlign="center">
                                {participant.name}
                            </CustomText>
                            <CustomText size="p2Regular" color="$gray-40" textAlign="center">
                                Student Account Profile
                            </CustomText>
                        </YStack>
                    </YStack>

                    {isParentMode && (
                        <YStack gap={12} flex={1}>
                            <CustomText size="h5Medium" color="$gray-20" paddingLeft={4}>
                                {i18n.t("tests") || "Assigned Reading Assessments"}
                            </CustomText>
                            <ScrollView contentContainerStyle={{paddingBottom: 180}}>
                                <YStack gap={10}>
                                    {
                                        tests.map((test) => (
                                            <TestButton key={test.id} test={test}/>
                                        ))
                                    }
                                </YStack>
                            </ScrollView>
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
                onSave={invokeFetchTestsByParticipantIdAndBookIdApi}
                participantId={participant.id}
                participantName={participant.name}
            />
        </>
    )
};

export default ParticipantDetails;