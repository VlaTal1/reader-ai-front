import React, {FC, useEffect, useState} from "react";
import {Input as TInput, View} from "tamagui"
import {KeyboardTypeOptions, TextInputProps} from "react-native/Libraries/Components/TextInput/TextInput";
import {Pressable} from "react-native";

import Message from "@/components/Message";

type Props = {
    id: string;
    value: string;
    setValue?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    keyboardType?: KeyboardTypeOptions;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    errorMessage?: string;
    isSearchInput?: boolean;
    flex?: number
    inputEnabled?: boolean;
    autoCapitalize?: TextInputProps["autoCapitalize"];
    secureTextEntry?: TextInputProps["secureTextEntry"];
    maxLength?: number;
};

const Input: FC<Props> = (
    {
        id,
        value,
        setValue,
        placeholder,
        disabled,
        keyboardType,
        leftElement,
        rightElement,
        errorMessage,
        isSearchInput,
        flex = 0,
        inputEnabled = true,
        autoCapitalize = "none",
        secureTextEntry = false,
        maxLength,
    },
) => {
    const inputRef = React.useRef<TInput>(null);

    const handleIconPress = () => {
        inputRef.current?.focus();
    };

    const [isErrorOpen, setIsErrorOpen] = useState(!!errorMessage)

    useEffect(() => {
        setIsErrorOpen(!!errorMessage)
    }, [errorMessage])

    const textColor = errorMessage ? "$error-primary" : (
        disabled ? "$gray-40" : "$gray-20"
    );

    return (
        <View position="relative" flex={flex}>
            <View
                height="auto"
                paddingRight={rightElement ? 12 : 0}
                paddingLeft={leftElement ? 12 : 0}
                flexDirection="row"
                alignItems="center"
                backgroundColor={isSearchInput ? "$gray-100" : (disabled ? "$gray-85" : "$gray-93")}
                borderRadius={12}
                borderWidth={errorMessage ? 1 : 0}
                borderColor="$error-primary"
            >
                {leftElement && (
                    !disabled
                        ? (
                            <Pressable onPress={handleIconPress}>
                                {leftElement}
                            </Pressable>
                        )
                        : leftElement
                )}
                <TInput
                    id={id}
                    ref={inputRef}
                    value={value}
                    onChangeText={setValue}
                    backgroundColor="transparent"
                    placeholder={placeholder}
                    placeholderTextColor="$gray-60"
                    color={textColor}
                    borderWidth={0}
                    flex={1}
                    fontFamily="$body"
                    fontSize="$3"
                    fontWeight="300"
                    paddingHorizontal={12}
                    paddingVertical={12}
                    height="auto"
                    disabled={disabled || !inputEnabled}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength}
                />
                {rightElement && (
                    !disabled
                        ? (
                            <Pressable onPress={handleIconPress}>
                                {rightElement}
                            </Pressable>
                        )
                        : rightElement
                )}
            </View>
            {errorMessage && isErrorOpen && (
                <View position="absolute" zIndex={5} width="100%" top="100%" paddingTop={4}>
                    <Message
                        message={errorMessage}
                        variant="error"
                        onClose={() => setIsErrorOpen(false)}
                    />
                </View>
            )}
        </View>
    )
}

export default Input;