import React, {FC, useCallback, useState} from "react";
import {ScrollView, XStack, YStack} from "tamagui";
import {Controller, useForm} from "react-hook-form";

import {isBlank} from "@/functions";
import i18n from "@/localization/i18n";
import Modal from "@/components/modal/index";
import Input from "@/components/input";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import useWindow from "@/hooks/useWindow";
import LabelledInput from "@/components/LabelledInput";
import DiscardBookAddingModal from "@/components/modal/discard/discard-book-adding-modal";
import {CustomText} from "@/components/CustomText";

type Props = {
    onClose: () => void;
    isOpen: boolean;
}

type FormValues = {
    name: string;
    author: string;
    file: Blob;
};

const AddBookModal: FC<Props> = ({onClose, isOpen}) => {
    const {keyboardVisible, availableContentHeight} = useWindow()

    const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false)

    const {control, handleSubmit, setValue, watch, reset, formState: {errors, isDirty}} = useForm<FormValues>({
        defaultValues: {
            name: "",
            author: "",
            file: undefined,
        },
        mode: "onChange",
    });

    const formValues = watch();

    const handleReset = useCallback(() => {
        reset({
            name: "",
            author: "",
            file: undefined,
        });
    }, [reset]);

    const onCancel = useCallback(() => {
        onClose();
        handleReset();
    }, [onClose, handleReset]);

    const onSave = useCallback((data: FormValues) => {

    }, []);

    const isValid =
        !isBlank(formValues.name) &&
        !isBlank(formValues.author) &&
        formValues.file !== undefined;

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => isDirty ? setIsDiscardModalOpen(true) : onCancel()}
                headerText={i18n.t("add_book")}
                modalActions={(
                    <XStack gap={6}>
                        <SecondaryButton
                            flex={1}
                            text={i18n.t("cancel")}
                            onPress={onCancel}
                        />
                        <PrimaryButton
                            flex={1}
                            text={i18n.t("save")}
                            disabled={!isValid}
                            onPress={handleSubmit(onSave)}
                        />
                    </XStack>
                )}
                isKeyboardVisible={keyboardVisible}
                height={availableContentHeight}
            >
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
                                        errorMessage={errors.name?.message}
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
                                <YStack borderRadius={12} padding={12} backgroundColor="$gray-93" flex={1}>
                                    <CustomText size="p1Light" color="$gray-60">
                                        {i18n.t("file_name")}
                                    </CustomText>
                                </YStack>
                                <PrimaryButton
                                    text={i18n.t("select")}
                                    onPress={() => {
                                    }}
                                    flex={0.5}
                                />
                            </XStack>
                        </YStack>
                    </YStack>
                </ScrollView>
            </Modal>

            <DiscardBookAddingModal
                isOpen={isDiscardModalOpen}
                onClose={() => setIsDiscardModalOpen(false)}
                onStay={() => setIsDiscardModalOpen(false)}
                onDiscard={() => {
                    setIsDiscardModalOpen(false)
                    onCancel()
                }}
            />
        </>
    )
}

export default AddBookModal
