import React from "react";
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";
import {View, XStack} from "tamagui";

import {CustomText} from "@/components/CustomText";

type Props = {
    options: string[];
    currentTab: number;
    onChange: (index: number) => void;
    variant: "gray" | "white";
}

const SegmentedControl: React.FC<Props> = ({options, currentTab, onChange, variant}) => {
    const itemWidth = 100 / options.length;

    const rStyle = useAnimatedStyle(() => {
        return {
            left: withTiming(`${currentTab * itemWidth}%`),
        }
    })

    return (
        <XStack
            backgroundColor={variant === "gray" ? "$gray-93" : "$gray-100"}
            padding={6}
            borderRadius={12}
        >
            <View
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                padding={6}
            >
                <Animated.View
                    style={[
                        {
                            backgroundColor: "#333333",
                            borderRadius: 8,
                            width: `${itemWidth}%`,
                            flex: 1,
                        },
                        rStyle,
                    ]}
                />
            </View>
            {options.map((option, index) => (
                <View
                    key={option}
                    onPress={() => onChange(index)}
                    flex={1}
                    borderRadius={8}
                    paddingVertical={6}
                    paddingHorizontal={4}
                >
                    <CustomText
                        size="p1Regular"
                        textAlign="center"
                        color={currentTab === index
                            ? "$gray-100"
                            : "$gray-20"}
                        numberOfLines={1}
                    >
                        {option}
                    </CustomText>
                </View>
            ))}
        </XStack>
    )
}

export default SegmentedControl;