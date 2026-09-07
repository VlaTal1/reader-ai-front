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
                scale: 0.94,
            }}
            disabledStyle={{
                backgroundColor: "$accent-disabled",
            }}
            style={{
                shadowColor: "rgba(43, 32, 19, 0.25)",
                shadowOffset: {width: 0, height: 4},
                shadowRadius: 8,
                shadowOpacity: 1,
            }}
        >
            <Icon fill={disabled ? "#C9AE87" : "#FFFFFF"}/>
        </Button>
    )
}

export default FabButton;