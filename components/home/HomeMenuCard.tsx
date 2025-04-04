import React from "react";
import {GetProps, Image, ThemeableStack, View} from "tamagui";
import {Easing, ImageSourcePropType} from "react-native";
import TextTicker from "react-native-text-ticker";

import {CustomText} from "@/components/CustomText";

type HomeMenuCardProps = {
    title: string,
    image?: ImageSourcePropType,
    disabled?: boolean
} & GetProps<typeof ThemeableStack>

export const HomeMenuCard = (props: HomeMenuCardProps) => {
    const {title, disabled, image, onPress} = props

    return (
        <ThemeableStack
            pressStyle={{
                opacity: 0.8,
            }}
            onPress={onPress}
            disabled={disabled}
            {...props}
        >
            <View
                backgroundColor="$gray-100"
                borderRadius={20}
                padding={20}
                gap={12}
                justifyContent="space-between"
            >
                {image && (
                    <Image source={image} width={48} height={48}/>
                )}
                <TextTicker
                    style={{width: 100}}
                    duration={5000}
                    loop={true}
                    bounce={true}
                    repeatSpacer={50}
                    easing={Easing.linear}>
                    <CustomText size="h5Regular" numberOfLines={1}>
                        {title}
                    </CustomText>
                </TextTicker>
            </View>
        </ThemeableStack>
    );
}
