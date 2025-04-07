import React, {useCallback, useEffect, useState} from "react";
import {ScrollView, XStack, YStack} from "tamagui";
import {ActivityIndicator, Alert, FlatList, RefreshControl} from "react-native";
import {useBackHandler} from "@react-native-community/hooks";
import {useRouter} from "expo-router";

import useApi from "@/hooks/useApi";
import participantApi from "@/api/endpoints/participantApi";
import i18n from "@/localization/i18n";
import {Participant} from "@/types/Paticipant";
import CustomStackScreen from "@/components/CustomStackScreen";
import Header from "@/components/Header";
import HeaderButton from "@/components/buttons/HeaderButton";
import ParticipantButton from "@/components/buttons/ParticipantButton";
import BottomButtonGroup from "@/components/buttons/BottomButtonGroup";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import AddParticipantModal from "@/components/modal/add-participant-modal";

const Participants = () => {
    const router = useRouter();

    const [participants, setParticipants] = useState<Participant[]>([]);

    const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] = useState(false)

    const onCancel = useCallback(() => {
        router.back();
    }, [router]);

    useBackHandler(() => {
        onCancel();
        return true;
    })

    const fetchAllParticipantApi = useApi(
        participantApi.fetchAllParticipants,
        {
            onSuccess: (data) => {
                setParticipants(data);
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

    useEffect(() => {
        invokeFetchAllParticipants()
    }, []);

    if (fetchAllParticipantApi.loading) {
        return (
            <>
                <CustomStackScreen/>
                <YStack flex={1} justifyContent="center" alignItems="center">
                    <ActivityIndicator size="large" color="#0000ff"/>
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
                <ScrollView
                    contentContainerStyle={{flex: participants.length === 0 ? 1 : "unset", paddingHorizontal: 16}}
                    refreshControl={
                        <RefreshControl
                            refreshing={fetchAllParticipantApi.loading}
                            onRefresh={invokeFetchAllParticipants}
                        />
                    }
                >
                    <YStack flex={1} height="100%" paddingBottom={80}>
                        <FlatList
                            numColumns={1}
                            contentContainerStyle={{
                                marginVertical: 11,
                                gap: 8,
                            }}
                            scrollEnabled={false}
                            data={participants}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => (
                                <ParticipantButton key={item.id} participant={item} onPress={() => Alert.alert("later")}/>
                            )}
                        />
                    </YStack>
                </ScrollView>
            </YStack>

            <BottomButtonGroup>
                <PrimaryButton
                    onPress={() => setIsAddParticipantModalOpen(true)}
                    text={i18n.t("add_child")}
                />
            </BottomButtonGroup>

            <AddParticipantModal
                onClose={() => setIsAddParticipantModalOpen(false)}
                isOpen={isAddParticipantModalOpen}
                onSave={invokeFetchAllParticipants}
            />
        </>
    )
}

export default Participants