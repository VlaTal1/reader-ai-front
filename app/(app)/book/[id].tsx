import React, {useCallback, useEffect, useState} from "react";
import {ScrollView, View, XStack, YStack} from "tamagui";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useBackHandler} from "@react-native-community/hooks";
import {ActivityIndicator} from "react-native";

import CustomStackScreen from "@/components/CustomStackScreen";
import Feather from "@expo/vector-icons/Feather";
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
import {useAppDispatch} from "@/store";
import {resetTestBook, setTestBook} from "@/store/bookSlice";

const BookDetails = () => {
    const {isParentMode} = useUserMode();
    const {id} = useLocalSearchParams();

    const router = useRouter();
    const dispatch = useAppDispatch();

    const [book, setBook] = useState<Book | undefined>(undefined);

    const [isParticipantSelectModalOpen, setIsParticipantSelectModalOpen] = useState(false)

    const onCancel = useCallback(() => {
        dispatch(resetTestBook());
        router.back();
    }, [dispatch, router]);

    useBackHandler(() => {
        onCancel();
        return true;
    });

    const fetchBookByIdApi = useApi(
        bookApi.fetchBookById,
        {
            onSuccess: (data) => {
                setBook(data);
                dispatch(setTestBook(data));
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

                <YStack flex={1} paddingHorizontal={16} gap={24}>
                    
                    {/* Book Cover Card */}
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
                        <View
                            width={64}
                            height={64}
                            borderRadius={32}
                            backgroundColor="#EEF2F6"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Feather name="book-open" size={32} color="#6366F1" />
                        </View>
                        <YStack alignItems="center" gap={4}>
                            <CustomText size="h3Medium" color="$gray-20" textAlign="center">
                                {book.title}
                            </CustomText>
                            <CustomText size="p1Regular" color="$gray-40" textAlign="center">
                                {book.author}
                            </CustomText>
                        </YStack>
                        
                        {/* Book Metadata Badge */}
                        <XStack
                            backgroundColor="#F1F5F9"
                            paddingHorizontal={10}
                            paddingVertical={4}
                            borderRadius={8}
                        >
                            <CustomText size="p3Medium" color="$gray-40">
                                PDF Document
                            </CustomText>
                        </XStack>
                    </YStack>

                    {isParentMode && (
                        <YStack gap={12}>
                            <CustomText size="h5Medium" color="$gray-20" paddingLeft={4}>
                                {i18n.t("list_of_accesses") || "Student Access Control"}
                            </CustomText>
                            <ScrollView contentContainerStyle={{paddingBottom: 120}}>
                                <YStack gap={8}>
                                    {
                                        book.accesses.map((access) => (
                                            <ParticipantButton
                                                key={access.participant.id}
                                                participant={access.participant}
                                                onPress={() => router.navigate(`/participant/${access.participant.id}`)}
                                            />
                                        ))
                                    }
                                </YStack>
                            </ScrollView>
                        </YStack>
                    )}
                </YStack>
            </YStack>

            <BottomButtonGroup>
                <YStack gap={6}>
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
                </YStack>
            </BottomButtonGroup>

            <ParticipantSelectModal
                onClose={() => setIsParticipantSelectModalOpen(false)}
                isOpen={isParticipantSelectModalOpen}
                onSelectId={handleChildSelect}
            />
        </>
    );
};

export default BookDetails;