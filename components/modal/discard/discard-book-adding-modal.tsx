import React, {FC} from "react"
import {YStack} from "tamagui";

import Modal from "@/components/modal/index";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import i18n from "@/localization/i18n";

type DiscardChangesModalProps = {
    onStay: () => void;
    onDiscard: () => void;
    isOpen: boolean;
    onClose: () => void;
}

const DiscardBookAddingModal: FC<DiscardChangesModalProps> = ({onStay, onDiscard, isOpen, onClose}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            headerText={i18n.t("discard_changes_modal_header")}
            headerDescription={i18n.t("discard_book_adding_modal_description")}
            modalActions={(
                <YStack gap={8} width="100%">
                    <PrimaryButton
                        text={i18n.t("no")}
                        onPress={onStay}
                    />
                    <SecondaryButton
                        text={i18n.t("yes")}
                        onPress={onDiscard}
                    />
                </YStack>
            )}
        />
    )
}

export default DiscardBookAddingModal