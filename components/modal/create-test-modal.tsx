import React, {FC, useCallback, useEffect, useState} from "react";
import {ScrollView, XStack, YStack} from "tamagui";
import {Controller, useForm} from "react-hook-form";
import {ActivityIndicator, TouchableOpacity} from "react-native";

import i18n from "@/localization/i18n";
import Modal from "@/components/modal/index";
import Input from "@/components/input";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import useWindow from "@/hooks/useWindow";
import LabelledInput from "@/components/LabelledInput";
import useApi from "@/hooks/useApi";
import testApi from "@/api/endpoints/testApi";
import {Test} from "@/types/Test";
import {useAppSelector} from "@/store";
import BookSelectModal from "@/components/modal/book-select-modal";
import {Book} from "@/types/Book";
import NextIcon from "@/assets/images/icons/next-icon.svg";

type Props = {
    onClose: () => void;
    isOpen: boolean;
    onSave: () => void;
    participantId: number | undefined;
    participantName: string;
}

type FormValues = {
    bookName: string;
    startPage: string;
    endPage: string;
    questionsAmount: string;
};

const CreateTestModal: FC<Props> = ({onClose, isOpen, onSave, participantId, participantName}) => {
    const {keyboardVisible, availableContentHeight} = useWindow()

    const {testBook} = useAppSelector((state) => state.book)
    const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined)

    const [isBookSelectModalOpen, setIsBookSelectModalOpen] = useState(false)

    const {control, handleSubmit, setValue, watch, reset, formState: {errors, isDirty}} = useForm<FormValues>({
        defaultValues: {
            bookName: "",
            startPage: "1",
            endPage: "10",
            questionsAmount: "10",
        },
        mode: "onChange",
    });

    const formValues = watch();

    const handleReset = useCallback(() => {
        reset({
            bookName: "",
            startPage: "1",
            endPage: "10",
            questionsAmount: "10",
        });
    }, [reset]);

    const onCancel = useCallback(() => {
        onClose();
        handleReset();
    }, [onClose, handleReset]);

    useEffect(() => {
        if (testBook) {
            setValue("bookName", testBook.title)
        }
    }, [testBook, setValue]);

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
        if (!testBook && !selectedBook) {
            return;
        }
        try {
            const bookId = testBook ? testBook.id : selectedBook?.id
            console.log(bookId)
            const test = {
                progress: {
                    book: {
                        id: bookId,
                    },
                    participant: {
                        id: participantId,
                    },
                },
                startPage: Number(data.startPage),
                endPage: Number(data.endPage),
                questionsAmount: Number(data.questionsAmount),
            } as Test

            await createTestApi.execute(test).then();
            onSave();
            onCancel();
        } catch (error) {
            console.error("Error creating test:", error);
        }
    }, [createTestApi, handleReset, onClose]);

    const isValid =
        formValues.bookName !== "" &&
        formValues.startPage !== "0" &&
        formValues.endPage !== "0" &&
        Number(formValues.startPage) < Number(formValues.endPage) &&
        (testBook !== undefined || selectedBook !== undefined);

    const handleBookSelect = (book: Book) => {
        setSelectedBook(book)
        setValue("bookName", book.title)
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onCancel}
                headerText={i18n.t("create_test")}
                headerDescription={
                    testBook ?
                        i18n.t("create_test_modal_description", {
                            bookName: testBook?.title || "",
                            childName: participantName,
                        }) :
                        i18n.t("create_test_for_child", {childName: participantName})
                }
                modalActions={(
                    <XStack gap={6}>
                        <SecondaryButton
                            flex={1}
                            text={i18n.t("cancel")}
                            onPress={onCancel}
                        />
                        <PrimaryButton
                            flex={1}
                            text={createTestApi.loading ? "" : i18n.t("save")}
                            disabled={!isValid || createTestApi.loading}
                            onPress={handleSubmit(handleSave)}
                        />
                    </XStack>
                )}
                isKeyboardVisible={keyboardVisible}
                height={availableContentHeight}
            >
                {createTestApi.loading ? (
                    <ActivityIndicator size="small" color="blue"/>
                ) : (
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                        <YStack gap={12}>
                            <LabelledInput label={i18n.t("book")} htmlFor="bookName">
                                <Controller
                                    control={control}
                                    name="bookName"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: i18n.t("name_validation"),
                                        },
                                    }}
                                    render={({field: {onChange, value}}) => (
                                        <TouchableOpacity
                                            onPress={() => setIsBookSelectModalOpen(true)}
                                            activeOpacity={0.7}
                                        >
                                            <Input
                                                inputEnabled={false}
                                                disabled={testBook !== undefined}
                                                id="bookName"
                                                value={value}
                                                setValue={onChange}
                                                placeholder={i18n.t("book")}
                                                errorMessage={errors.bookName?.message}
                                                rightElement={<NextIcon fill="black" disabled={testBook !== undefined}/>}
                                            />
                                        </TouchableOpacity>
                                    )}
                                />
                            </LabelledInput>

                            {/* Start Page */}
                            <LabelledInput label={i18n.t("start_page")} htmlFor="startPage">
                                <Controller
                                    control={control}
                                    name="startPage"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: i18n.t("start_page_validation"),
                                        },
                                    }}
                                    render={({field: {onChange, value}}) => (
                                        <Input
                                            id="startPage"
                                            value={value}
                                            setValue={onChange}
                                            placeholder={i18n.t("start_page")}
                                            errorMessage={errors.startPage?.message}
                                        />
                                    )}
                                />
                            </LabelledInput>

                            {/* End Page */}
                            <LabelledInput label={i18n.t("end_page")} htmlFor="endPage">
                                <Controller
                                    control={control}
                                    name="endPage"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: i18n.t("end_page_validation"),
                                        },
                                    }}
                                    render={({field: {onChange, value}}) => (
                                        <Input
                                            id="endPage"
                                            value={value}
                                            setValue={onChange}
                                            placeholder={i18n.t("end_page")}
                                            errorMessage={errors.endPage?.message}
                                        />
                                    )}
                                />
                            </LabelledInput>

                            {/* Questions Amount */}
                            <LabelledInput label={i18n.t("questions_amount")} htmlFor="questionsAmount">
                                <Controller
                                    control={control}
                                    name="questionsAmount"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: i18n.t("questions_amount_validation"),
                                        },
                                    }}
                                    render={({field: {onChange, value}}) => (
                                        <Input
                                            id="questionsAmount"
                                            value={value}
                                            setValue={onChange}
                                            placeholder={i18n.t("questions_amount")}
                                            errorMessage={errors.endPage?.message}
                                        />
                                    )}
                                />
                            </LabelledInput>
                        </YStack>
                    </ScrollView>
                )}
            </Modal>

            <BookSelectModal
                isOpen={isBookSelectModalOpen}
                onClose={() => setIsBookSelectModalOpen(false)}
                onSelectBook={handleBookSelect}
            />
        </>
    )
}

export default CreateTestModal