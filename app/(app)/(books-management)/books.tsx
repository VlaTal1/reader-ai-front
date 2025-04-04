import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {useBackHandler} from "@react-native-community/hooks";
import {ScrollView, XStack, YStack} from "tamagui";
import {Alert, FlatList, RefreshControl} from "react-native";

import {Book} from "@/types/Book";
import useApi from "@/hooks/useApi";
import bookApi from "@/api/endpoints/bookApi";
import i18n from "@/localization/i18n";
import CustomStackScreen from "@/components/CustomStackScreen";
import Header from "@/components/Header";
import HeaderButton from "@/components/buttons/HeaderButton";
import BookButton from "@/components/buttons/BookButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import AddBookModal from "@/components/modal/add-item-modal";
import BottomButtonGroup from "@/components/buttons/BottomButtonGroup";

const Books = () => {
    const router = useRouter();

    const [books, setBooks] = useState<Book[]>([]);

    const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

    const onCancel = useCallback(() => {
        router.back();
    }, [router]);

    useBackHandler(() => {
        onCancel();
        return true;
    })

    const fetchBooksApi = useApi(
        bookApi.fetchBooks,
        {
            onSuccess: (data) => {
                setBooks(data);
            },
            errorHandler: {
                title: i18n.t("error"),
                message: `${i18n.t("failed_to_fetch_books")}\n${i18n.t("please_try_again_later")}`,
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

    const invokeFetchBooks = useCallback(() => {
        fetchBooksApi.execute();
    }, [fetchBooksApi]);

    useEffect(() => {
        invokeFetchBooks()
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
                    contentContainerStyle={{flex: books.length === 0 ? 1 : "unset", paddingHorizontal: 16}}
                    refreshControl={
                        <RefreshControl
                            refreshing={fetchBooksApi.loading}
                            onRefresh={invokeFetchBooks}
                        />
                    }
                >
                    <FlatList
                        numColumns={1}
                        contentContainerStyle={{
                            marginVertical: 11,
                            gap: 8,
                        }}
                        scrollEnabled={false}
                        data={books}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <BookButton book={item} onPress={() => Alert.alert("Will be implemented later")}/>
                        )}
                     />
                </ScrollView>
            </YStack>

            <BottomButtonGroup>
                <PrimaryButton
                    onPress={() => setIsAddBookModalOpen(true)}
                    text={i18n.t("add_book")}
                />
            </BottomButtonGroup>

            <AddBookModal
                onClose={() => setIsAddBookModalOpen(false)}
                isOpen={isAddBookModalOpen}
                onSave={invokeFetchBooks}
            />
        </>
    )
}

export default Books;