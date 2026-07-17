import React, {FC} from "react";
import {Button} from "tamagui";
import {SvgProps} from "react-native-svg";

import {CustomText} from "@/components/CustomText";

interface Props {
    text?: string,
    icon?: React.ComponentType<SvgProps>;
    iconPosition?: "left" | "right";
    iconFillType?: "fill" | "stroke";
    disabled?: boolean,
    onPress: () => void;
    flex?: number;
    width?: string | number;
    filled?: boolean;
}

const SecondaryButton: FC<Props> = ({
                                        text,
                                        icon: Icon,
                                        iconPosition = "left",
                                        iconFillType = "fill",
                                        disabled,
                                        onPress,
                                        flex,
                                        width = "100%",
                                        filled = false,
                                    }) => {

    return (
        <Button
            onPress={onPress}
            disabled={disabled}
            backgroundColor={filled ? "$gray-100" : "transparent"}
            width={width}
            height="auto"
            borderRadius={16}
            padding={14}
            borderColor="$gray-75"
            pressStyle={{
                borderColor: "$accent-regular",
                backgroundColor: filled ? "$gray-93" : "transparent",
            }}
            disabledStyle={{borderColor: "$gray-85"}}
            flex={flex}
        >
            {Icon && iconPosition === "left" ? (
                <Icon
                    width={24}
                    height={24}
                    {...(iconFillType === "fill" && {fill: disabled ? "#999999" : "#333333"})}
                    {...(iconFillType === "stroke" && {stroke: disabled ? "#999999" : "#333333"})}
                />
            ) : null}
            {text && (
                <CustomText
                    color={disabled ? "$gray-60" : "$gray-20"}
                    size="p1Regular"
                    paddingLeft={Icon && iconPosition === "right" ? 8 : 0}
                    paddingRight={Icon && iconPosition === "left" ? 8 : 0}
                >
                    {text}
                </CustomText>
            )}
            {Icon && iconPosition === "right" ? (
                <Icon
                    width={24}
                    height={24}
                    {...(iconFillType === "fill" && {fill: disabled ? "#999999" : "#333333"})}
                    {...(iconFillType === "stroke" && {stroke: disabled ? "#999999" : "#333333"})}
                />
            ) : null}
        </Button>
    );
};

export default SecondaryButton;