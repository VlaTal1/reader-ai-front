import React, {FC} from "react";
import {SvgProps} from "react-native-svg";
import {Button} from "tamagui";

type Props = {
    onPress: () => void;
    icon: React.ComponentType<SvgProps>;
    disabled?: boolean;
}

const FabButton: FC<Props> = ({onPress, icon: Icon, disabled = false}) => {
    return (
        <Button
            onPress={onPress}
            borderRadius={64}
            width={56}
            height={56}
            disabled={disabled}
            backgroundColor="$accent-regular"
            pressStyle={{
                backgroundColor: "$accent-pressed",
            }}
            disabledStyle={{
                backgroundColor: "$accent-disabled",
            }}
        >
            <Icon fill={disabled ? "#BFBFBF" : "#FFFFFF"}/>
        </Button>
    )
}

export default FabButton;