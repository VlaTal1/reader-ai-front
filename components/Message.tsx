import {View} from "tamagui";
import React, {FC} from "react";
import {TouchableOpacity} from "react-native";
import {Shadow} from "react-native-shadow-2";

import CloseIcon from "@/assets/images/icons/close-icon.svg";
import {CustomText} from "@/components/CustomText";

type MessageProps = {
    message: string;
    onClose: () => void;
    variant: "regular" | "error";
};

const styles = {
    regular: {
        background: "$gray-100",
        textColor: "$gray-20",
        iconColor: "#333333",
    },
    error: {
        background: "$error-primary",
        textColor: "$error-highlight",
        iconColor: "#F5E6E6",
    },
}

const Message: FC<MessageProps> = ({message, onClose, variant}) => {
    const appropriateStyles = styles[variant];

    return (
        <Shadow offset={[5, 5]} distance={10} startColor="hsla(0, 0%, 0%, 0.1)">
            <View
                backgroundColor={appropriateStyles.background}
                borderRadius={8}
                flexDirection="row"
                alignItems="flex-start"
                gap={10}
                width="100%"
            >
                <CustomText
                    size="p2Regular"
                    color={appropriateStyles.textColor}
                    flex={1}
                    padding={6}
                    paddingLeft={12}
                >
                    {message}
                </CustomText>
                <TouchableOpacity onPress={onClose} style={{padding: 6}}>
                    <CloseIcon fill={appropriateStyles.iconColor} width={20} height={20}/>
                </TouchableOpacity>
            </View>
        </Shadow>
    )
}

export default Message;