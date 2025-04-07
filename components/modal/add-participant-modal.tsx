import React, {FC, useCallback} from "react";
import {ScrollView, XStack, YStack} from "tamagui";
import {Controller, useForm} from "react-hook-form";
import {ActivityIndicator} from "react-native";

import {isBlank} from "@/functions";
import i18n from "@/localization/i18n";
import Modal from "@/components/modal/index";
import Input from "@/components/input";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import useWindow from "@/hooks/useWindow";
import LabelledInput from "@/components/LabelledInput";
import useApi from "@/hooks/useApi";
import participantApi from "@/api/endpoints/participantApi";
import {Participant} from "@/types/Paticipant";

type Props = {
    onClose: () => void;
    isOpen: boolean;
    onSave: () => void;
}

type FormValues = {
    name: string;
};

const AddParticipantModal: FC<Props> = ({onClose, isOpen, onSave}) => {
    const {keyboardVisible, availableContentHeight} = useWindow()

    const {control, handleSubmit, setValue, watch, reset, formState: {errors, isDirty}} = useForm<FormValues>({
        defaultValues: {
            name: "",
        },
        mode: "onChange",
    });

    const formValues = watch();

    const handleReset = useCallback(() => {
        reset({
            name: "",
        });
    }, [reset]);

    const onCancel = useCallback(() => {
        onClose();
        handleReset();
    }, [onClose, handleReset]);

    const saveParticipantApi = useApi(
        participantApi.saveParticipant,
        {
            onSuccess: () => {
                onClose();
                handleReset();
            },
            errorHandler: {
                title: i18n.t("error"),
                message: `${i18n.t("failed_to_save_child")}\n${i18n.t("please_try_again_later")}`,
                options: {
                    tryAgain: true,
                    cancel: true,
                },
            },
        },
    );

    const handleSave = useCallback(async (data: FormValues) => {
        const participant = {
            name: data.name,
        } as Participant;
        await saveParticipantApi.execute({participant: participant}).then(onSave);
    }, [saveParticipantApi]);

    const isValid = !isBlank(formValues.name)

    return (
        <Modal
                isOpen={isOpen}
                onClose={onCancel}
                headerText={i18n.t("add_child")}
                modalActions={(
                    <XStack gap={6}>
                        <SecondaryButton
                            flex={1}
                            text={i18n.t("cancel")}
                            onPress={onCancel}
                        />
                        <PrimaryButton
                            flex={1}
                            text={saveParticipantApi.loading ? "" : i18n.t("save")}
                            disabled={!isValid || saveParticipantApi.loading}
                            onPress={handleSubmit(handleSave)}
                        />
                    </XStack>
                )}
                isKeyboardVisible={keyboardVisible}
                height={availableContentHeight}
            >
                {saveParticipantApi.loading ? (
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
                                            placeholder={i18n.t("child_name")}
                                            errorMessage={errors.name?.message}
                                        />
                                    )}
                                />
                            </LabelledInput>
                        </YStack>
                    </ScrollView>
                )}
            </Modal>
    )
}

export default AddParticipantModal