import React, {FC, useCallback, useEffect, useState} from "react";
import {ScrollView, XStack, YStack} from "tamagui";
import {Controller, useForm} from "react-hook-form";
import {ActivityIndicator} from "react-native";

import i18n from "@/localization/i18n";
import Modal from "@/components/modal/index";
import Input from "@/components/input";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import useWindow from "@/hooks/useWindow";
import LabelledInput from "@/components/LabelledInput";
import {CustomText} from "@/components/CustomText";
import useApi from "@/hooks/useApi";
import bookApi from "@/api/endpoints/bookApi";
import {Book} from "@/types/Book";
import testApi from "@/api/endpoints/testApi";
import {Test} from "@/types/Test";

type Props = {
    onClose: () => void;
    isOpen: boolean;
    onSave: () => void;
    participantId: number;
}

type FormValues = {
    startPage: number;
    endPage: number;
    questionsAmount: number;
};

const CreateTestModal: FC<Props> = ({onClose, isOpen, onSave, participantId}) => {
    const {keyboardVisible, availableContentHeight} = useWindow()

    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);

    const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false)
    const [selectedFileName, setSelectedFileName] = useState<string>("");

    const {control, handleSubmit, setValue, watch, reset, formState: {errors, isDirty}} = useForm<FormValues>({
        defaultValues: {
            startPage: 0,
            endPage: 10,
            questionsAmount: 1,
        },
        mode: "onChange",
    });

    const formValues = watch();

    const handleReset = useCallback(() => {
        reset({
            startPage: 0,
            endPage: 10,
            questionsAmount: 1,
        });
        setSelectedFileName("");
    }, [reset]);

    const onCancel = useCallback(() => {
        onClose();
        handleReset();
    }, [onClose, handleReset]);

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

    const createTestApi = useApi(
        testApi.createTest,
        {
            onSuccess: () => {
                onClose();
                handleReset();
            },
            errorHandler: {
                title: i18n.t("error"),
                message: `${i18n.t("failed_to_create_test")}\n${i18n.t("please_try_again_later")}`,
                options: {
                    tryAgain: true,
                    cancel: true,
                },
            },
        },
    );

    const handleSave = useCallback(async (data: FormValues) => {
        if (!selectedBook) {
            return;
        }
        try {
            const test = {
                progress: {
                    book: {
                        id: selectedBook.id,
                    },
                    participant: {
                        id: participantId,
                    },
                },
                startPage: data.startPage,
                endPage: data.endPage,
                questionsAmount: data.questionsAmount,
            } as Test

            await createTestApi.execute(test).then(onSave);
        } catch (error) {
            console.error("Error creating test:", error);
        }
    }, [createTestApi, handleReset, onClose]);

    const isValid =
        formValues.startPage !== 0 &&
        formValues.endPage !== 0 &&
        formValues.startPage > formValues.endPage &&
        selectedBook === undefined;

    return (
        <Modal
                isOpen={isOpen}
                onClose={() => isDirty ? setIsDiscardModalOpen(true) : onCancel()}
                headerText={i18n.t("create_test")}
                modalActions={(
                    <XStack gap={6}>
                        <SecondaryButton
                            flex={1}
                            text={i18n.t("cancel")}
                            onPress={onCancel}
                        />
                        <PrimaryButton
                            flex={1}
                            text={uploadBookApi.loading ? "" : i18n.t("save")}
                            disabled={!isValid || uploadBookApi.loading}
                            onPress={handleSubmit(handleSave)}
                        />
                    </XStack>
                )}
                isKeyboardVisible={keyboardVisible}
                height={availableContentHeight}
            >
                {uploadBookApi.loading ? (
                    <ActivityIndicator size="small" color="blue"/>
                ) : (
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                        <YStack gap={12}>
                            {/* Book Name */}
                            <LabelledInput label={i18n.t("name")} htmlFor="name">
                                <Controller
                                    control={control}
                                    name="name"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: i18n.t("name_validation"),
                                        },
                                    }}
                                    render={({field: {onChange, value}}) => (
                                        <Input
                                            id="name"
                                            value={value}
                                            setValue={onChange}
                                            placeholder={i18n.t("name")}
                                            errorMessage={errors.name?.message}
                                        />
                                    )}
                                />
                            </LabelledInput>

                            {/* Author */}
                            <LabelledInput label={i18n.t("author")} htmlFor="author">
                                <Controller
                                    control={control}
                                    name="author"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: i18n.t("author_validation"),
                                        },
                                    }}
                                    render={({field: {onChange, value}}) => (
                                        <Input
                                            id="author"
                                            value={value}
                                            setValue={onChange}
                                            placeholder={i18n.t("author")}
                                            errorMessage={errors.author?.message}
                                        />
                                    )}
                                />
                            </LabelledInput>

                            {/* Book */}
                            <YStack gap={8} width="100%">
                                <CustomText
                                    size="p1Regular"
                                >
                                    {i18n.t("select_book")}
                                </CustomText>
                                <XStack gap={8}>
                                    <YStack borderRadius={12} padding={12} backgroundColor="$gray-93" flex={1}
                                            justifyContent="center">
                                        <CustomText size="p1Light" color={selectedFileName ? "$gray-20" : "$gray-60"}
                                                    numberOfLines={1}>
                                            {selectedFileName || i18n.t("file_name")}
                                        </CustomText>
                                    </YStack>
                                    <PrimaryButton
                                        text={i18n.t("select")}
                                        onPress={pickDocument}
                                        flex={0.5}
                                    />
                                </XStack>
                            </YStack>
                        </YStack>
                    </ScrollView>
                )}
            </Modal>
    )
}

export default CreateTestModal