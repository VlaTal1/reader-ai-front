import {Button} from "tamagui";
import React, {FC} from "react";

import {CustomText} from "@/components/CustomText";

type Props = {
    onPress: () => void;
    backgroundColor: string;
    color: string;
    text: string;
    disabled?: boolean;
}

const HeaderButton: FC<Props> = ({onPress, backgroundColor, color, text, disabled = false}) => (
    <Button
        onPress={onPress}
        backgroundColor={backgroundColor}
        height="min-content"
        paddingVertical={9}
        paddingHorizontal={16}
        pressStyle={{opacity: 0.5, backgroundColor: "transparent"}}
        disabled={disabled}
    >
        <CustomText
            size="p1Regular"
            color={disabled ? "$gray-60" : color}
            lineHeight={24}
        >
            {text}
        </CustomText>
    </Button>
)

export default HeaderButton