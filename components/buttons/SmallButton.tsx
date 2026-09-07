import React, {FC} from "react";
import {Button, XStack} from "tamagui";
import {SvgProps} from "react-native-svg";

import {CustomText} from "@/components/CustomText";

type Props = {
    text?: string,
    onPress?: () => void;
    icon?: React.ComponentType<SvgProps>;
    disabled?: boolean;
    variant: "primary" | "secondary" | "error";
}

const styles = {
    primary: {
        background: {
            color: "$accent-regular",
            activeColor: "$accent-pressed",
            disabledColor: "$accent-disabled",
        },
        border: null,
        textColor: "$gray-100",
        textDisabledColor: "$gray-75",
        iconColor: "#FFFFFF",
        iconDisabledColor: "#C9AE87",
    },
    secondary: {
        background: null,
        border: {
            color: "$gray-75",
            activeColor: "$gray-20",
        },
        textColor: "$gray-20",
        textDisabledColor: "$gray-60",
        iconColor: "#3A2E20",
        iconDisabledColor: "#A68A63",
    },
    error: {
        background: {
            color: "$error-highlight",
            activeColor: "$error-highlight",
            disabledColor: "$error-highlight",
        },
        border: {
            color: "$error-primary",
            activeColor: "$error-primary",
        },
        textColor: "$error-primary",
        textDisabledColor: "$error-primary",
        iconColor: "#C1443A",
        iconDisabledColor: "#C1443A",
    },
}

const SmallButton: FC<Props> = ({text, onPress, icon: Icon, variant, disabled = false}) => {
    const appropriateStyles = styles[variant];
    return (
        <Button
            backgroundColor={appropriateStyles.background
                ? (disabled ? appropriateStyles.background.disabledColor : appropriateStyles.background.color)
                : "transparent"
            }
            borderColor={appropriateStyles.border ? appropriateStyles.border.color : "transparent"}
            borderWidth={appropriateStyles.border ? 1 : 0}
            pressStyle={{
                backgroundColor: appropriateStyles.background ? appropriateStyles.background.activeColor : "transparent",
                borderColor: appropriateStyles.border ? appropriateStyles.border.activeColor : "transparent",
                scale: 0.96,
            }}
            onPress={onPress}
            disabled={disabled}
            height="auto"
            borderRadius={999}
            paddingHorizontal={12}
            paddingVertical={5}
        >
            <XStack gap={4} alignItems="center">
                {text && (
                    <CustomText
                        color={disabled ? appropriateStyles.textDisabledColor : appropriateStyles.textColor}
                        size="p2Regular"
                    >
                        {text}
                    </CustomText>
                )}
                {Icon && (
                    <Icon
                        fill={disabled ? appropriateStyles.iconDisabledColor : appropriateStyles.iconColor}
                        width={18}
                        height={18}
                    />
                )}
            </XStack>
        </Button>
    );
};

export default SmallButton;