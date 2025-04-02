import React, {FC} from "react";
import {Button} from "tamagui";
import {SvgProps} from "react-native-svg";

import {CustomText} from "@/components/CustomText";

interface Props {
    text?: string;
    textBlock?: React.ReactNode;
    icon?: React.ComponentType<SvgProps>;
    iconPosition?: "left" | "right";
    iconFillType?: "fill" | "stroke";
    disabled?: boolean,
    onPress: () => void;
    width?: string | number;
    paddingLeft?: number;
    paddingRight?: number;
    flex?: number;
}

const PrimaryButton: FC<Props> = (
    {
        text,
        textBlock,
        icon: Icon,
        iconPosition = "left",
        iconFillType = "fill",
        disabled,
        onPress,
        width = "100%",
        flex,
    },
) => {
    return (
        <Button
            onPress={onPress}
            disabled={disabled}
            backgroundColor="$gray-20"
            color="$gray-20"
            width={width}
            height="auto"
            borderRadius={12}
            padding={12}
            pressStyle={{backgroundColor: "$backgroundPress"}}
            disabledStyle={{backgroundColor: "$accent-disabled"}}
            flex={flex}
        >
            {Icon && iconPosition === "left" ? (
                <Icon
                    width={24} height={24}
                    {...(iconFillType === "fill" && {fill: disabled ? "#BFBFBF" : "#FFFFFF"})}
                    {...(iconFillType === "stroke" && {stroke: disabled ? "#BFBFBF" : "#FFFFFF"})}
                />
            ) : null}
            {textBlock
                ? textBlock
                : text ? (
                    <CustomText
                        color={disabled ? "$gray-75" : "$gray-100"}
                        size="p1Regular"
                        textAlign="center"
                        paddingLeft={Icon && iconPosition === "right" ? 8 : 0}
                        paddingRight={Icon && iconPosition === "left" ? 8 : 0}
                    >
                        {text}
                    </CustomText>
                ) : undefined
            }
            {Icon && iconPosition === "right" ? (
                <Icon
                    width={24} height={24}
                    {...(iconFillType === "fill" && {fill: disabled ? "#BFBFBF" : "#FFFFFF"})}
                    {...(iconFillType === "stroke" && {stroke: disabled ? "#BFBFBF" : "#FFFFFF"})}
                />
            ) : null}
        </Button>
    );
};

export default PrimaryButton;