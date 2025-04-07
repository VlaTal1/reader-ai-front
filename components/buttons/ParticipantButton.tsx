import React, {FC} from "react";
import {ThemeableStack, YStack} from "tamagui";

import {CustomText} from "@/components/CustomText";
import {Participant} from "@/types/Paticipant";

type Props = {
    participant: Participant
    onPress?: () => void
    disabled?: boolean
}
const ParticipantButton: FC<Props> = ({participant, onPress, disabled = false}) => {
    return (
        <ThemeableStack
            pressStyle={{
                opacity: 0.8,
            }}
            onPress={onPress}
            disabled={disabled}
        >
            <YStack
                backgroundColor="$gray-100"
                borderRadius={20}
                paddingHorizontal={20}
                paddingVertical={10}
                justifyContent="space-between"
            >
                <CustomText size="h5Regular" numberOfLines={1}>
                    {participant.name}
                </CustomText>
            </YStack>
        </ThemeableStack>
    );
}

export default ParticipantButton;