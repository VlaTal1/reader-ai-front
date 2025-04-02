import {Button, XStack} from "tamagui";
import React, {FC} from "react";
import {SvgProps} from "react-native-svg";

import {CustomText} from "@/components/CustomText";

type Props = {
    onPress: () => void;
    disabled?: boolean;
    text: string;
    icon: React.ComponentType<SvgProps> | string | undefined;
    iconColor?: string;
    delimiter?: boolean;
    rightPart?: React.ReactNode;
    variant?: "default" | "red";
}

const styles = {
    default: {
        text: {
            activeColor: "$gray-20",
            disabledColor: "$gray-40",
        },
    },
    red: {
        text: {
            activeColor: "$error-primary",
            disabledColor: "$error-primary",
        },
    },
}

const ListButton: FC<Props> = (
    {
        onPress,
        disabled = false,
        icon: Icon,
        text,
        iconColor,
        delimiter = true,
        rightPart,
        variant = "default",
    },
) => {
    const appropriateStyles = styles[variant];

    return (
        <Button
            paddingVertical={14}
            paddingHorizontal={0}
            borderBottomColor="$gray-75"
            borderBottomWidth={delimiter ? 1 : 0}
            onPress={onPress}
            backgroundColor="transparent"
            pressStyle={{backgroundColor: "transparent", opacity: 0.5}}
            height="auto"
            justifyContent="space-between"
            alignItems="center"
            disabled={disabled}
        >
            <XStack justifyContent="flex-start" alignItems="center" gap={10}>
                {Icon && (typeof Icon === "string" ? (
                    <CustomText size="p1Regular" color={disabled ? "$gray-40" : "$gray-20"}>
                        {Icon}
                    </CustomText>
                ) : (
                    <Icon fill={iconColor} width={24} height={24}/>
                ))}

                <CustomText
                    size="p1Regular"
                    color={disabled ? appropriateStyles.text.disabledColor : appropriateStyles.text.activeColor}
                >
                    {text}
                </CustomText>
            </XStack>
            {rightPart}
        </Button>
    );
}

export default ListButton;