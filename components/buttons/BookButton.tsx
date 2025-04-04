import React, {FC} from "react";
import {ThemeableStack, YStack} from "tamagui";

import {CustomText} from "@/components/CustomText";
import {Book} from "@/types/Book";

type Props = {
    book: Book
    onPress: () => void
    disabled?: boolean
}

export const BookButton: FC<Props> = ({book, onPress, disabled = false}) => {
    return (
        <ThemeableStack
            pressStyle={{
                opacity: 0.8,
            }}
            onPress={onPress}
            disabled={disabled}
        >
            <YStack
                backgroundColor="$gray-100"
                borderRadius={20}
                paddingHorizontal={20}
                paddingVertical={10}
                justifyContent="space-between"
            >
                <CustomText size="h5Regular" numberOfLines={1}>
                    {book.title}
                </CustomText>
                <CustomText size="p1Regular" numberOfLines={1}>
                    {book.author}
                </CustomText>
            </YStack>
        </ThemeableStack>
    );
}

export default BookButton;