import React, {memo} from "react";
import {Label, YStack, YStackProps} from "tamagui";


type Props = {
    label: string;
    htmlFor?: string;
    children: React.ReactNode;
} & YStackProps

const LabelledInput: React.FC<Props> = (props) => {
    const {label, htmlFor, children, ...containerStyles} = props;

    return (
        <YStack gap={6} {...containerStyles}>
            <Label
                htmlFor={htmlFor}
                fontFamily="$body"
                fontSize="$3"
                fontWeight="400"
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {label}
            </Label>
            {children}
        </YStack>
    )
}

export default memo(LabelledInput);