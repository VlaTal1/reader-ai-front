import {XStack} from "tamagui";
import React, {FC, ReactElement} from "react";

type Props = {
    icon: ReactElement;
    onPress: () => void;
    disabled?: boolean;
}

const RoundButton: FC<Props> = ({icon, onPress, disabled = false}) => {
    return (
        <XStack
            backgroundColor="$accent-regular"
            borderRadius={50}
            padding={6}
            onPress={onPress}
            disabled={disabled}
            pressStyle={{
                backgroundColor: "$accent-pressed",
            }}
            disabledStyle={{
                backgroundColor: "$accent-disabled",
            }}
        >
            {icon}
        </XStack>
    )
}

export default RoundButton;