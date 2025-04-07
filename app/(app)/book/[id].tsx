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
import bookApi from "@/api/endpoints/bookApi";
import {Book} from "@/types/Book";
import ParticipantButton from "@/components/buttons/ParticipantButton";
import BottomButtonGroup from "@/components/buttons/BottomButtonGroup";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ParticipantSelectModal from "@/components/modal/participant-select-modal";
import accessApi from "@/api/endpoints/accessApi";
import {useUserMode} from "@/hooks/userModeContext";

const BookDetails = () => {
    const {isParentMode} = useUserMode();
    const {id} = useLocalSearchParams();
    const router = useRouter();

    const [book, setBook] = useState<Book | undefined>(undefined);

    const [isParticipantSelectModalOpen, setIsParticipantSelectModalOpen] = useState(false)

    const onCancel = useCallback(() => {
        router.back();
    }, [router]);

    useBackHandler(() => {
        onCancel();
        return true;
    });

    const fetchBookByIdApi = useApi(
        bookApi.fetchBookById,
        {
            onSuccess: (data) => {
                setBook(data);
            },
            errorHandler: {
                title: i18n.t("error"),
                message: `${i18n.t("failed_to_fetch_book")}\n${i18n.t("please_try_again_later")}`,
                options: {
                    tryAgain: true,
                    cancel: true,
                },
            },
        },
    );

    const grantAccessApi = useApi(
        accessApi.grantAccess,
        {
            onSuccess: () => {
                invokeFetchBookApi()
            },
            errorHandler: {
                title: i18n.t("error"),
                message: `${i18n.t("failed_to_grant_access")}\n${i18n.t("please_try_again_later")}`,
                options: {
                    tryAgain: true,
                    cancel: true,
                },
            },
        },
    );

    const invokeFetchBookApi = useCallback(() => {
        fetchBookByIdApi.execute({bookId: typeof id === "string" ? id : id[0]});
    }, [fetchBookByIdApi, id]);

    useEffect(() => {
        invokeFetchBookApi()
    }, []);

    const handleChildSelect = useCallback(async (childId: string) => {
        if (book) {
            await grantAccessApi.execute({
                bookId: book.id.toString(),
                participantId: childId,
            })
        }
    }, [book, grantAccessApi]);

    if (fetchBookByIdApi.loading || !book) {
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
                            {book.title}
                        </CustomText>
                        <CustomText size="h3Regular">
                            {book.author}
                        </CustomText>
                    </YStack>
                    {isParentMode && (
                        <YStack>
                            <CustomText size="h4Regular" width="100%" textAlign="center">
                                {i18n.t("list_of_accesses")}
                            </CustomText>
                            {
                                book.accesses.map((access) => (
                                    <ParticipantButton key={access.participant.id}
                                                       participant={access.participant}/>
                                ))
                            }
                        </YStack>
                    )}
                </YStack>
            </YStack>

            <BottomButtonGroup>
                {isParentMode && (
                    <PrimaryButton
                        onPress={() => setIsParticipantSelectModalOpen(true)}
                        text={i18n.t("grant_access")}
                    />
                )}
                <PrimaryButton
                    onPress={() => router.navigate(`/reader/${book.id}`)}
                    text={i18n.t("read")}
                />
            </BottomButtonGroup>

            <ParticipantSelectModal
                onClose={() => setIsParticipantSelectModalOpen(false)}
                isOpen={isParticipantSelectModalOpen}
                onSelect={handleChildSelect}
            />
        </>
    );
};

export default BookDetails;