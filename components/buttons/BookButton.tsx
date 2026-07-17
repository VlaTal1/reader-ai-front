import React, {FC} from "react";
import {GetProps, ThemeableStack, View, XStack, YStack} from "tamagui";
import Feather from "@expo/vector-icons/Feather";

import {CustomText} from "@/components/CustomText";
import {Book} from "@/types/Book";

type Props = {
    book: Book;
    onPress: () => void;
    disabled?: boolean;
} & GetProps<typeof ThemeableStack>;

const BookButton: FC<Props> = ({book, onPress, disabled = false, ...props}) => {
    return (
        <ThemeableStack
            pressStyle={{
                opacity: 0.9,
                scale: 0.98,
            }}
            onPress={onPress}
            disabled={disabled}
            {...props}
        >
            <XStack
                backgroundColor="#FFFFFF"
                borderRadius={16}
                padding={12}
                alignItems="center"
                justifyContent="space-between"
                borderWidth={1}
                borderColor="$gray-85"
                gap={12}
            >
                <XStack alignItems="center" gap={12} flex={1}>
                    <View
                        backgroundColor="#EEF2F6"
                        padding={10}
                        borderRadius={12}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Feather name="book-open" size={20} color="#6366F1" />
                    </View>
                    <YStack gap={2} flex={1}>
                        <CustomText size="h5Medium" color="$gray-20" numberOfLines={1}>
                            {book.title}
                        </CustomText>
                        <CustomText size="p2Regular" color="$gray-40" numberOfLines={1}>
                            {book.author}
                        </CustomText>
                    </YStack>
                </XStack>
                <Feather name="chevron-right" size={16} color="#94A3B8" />
            </XStack>
        </ThemeableStack>
    );
};

export default BookButton;