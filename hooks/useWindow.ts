import {useEffect, useState} from "react";
import {Dimensions, Keyboard, Platform} from "react-native";
import {DimensionValue} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type WindowInfo = {
    keyboardVisible: boolean;
    keyboardHeight: number;
    availableContentHeight: DimensionValue;
};

const useWindow = (additionalSpace = 0): WindowInfo => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const windowHeight = Dimensions.get("window").height;
    const availableContentHeight = keyboardVisible
        ? windowHeight - keyboardHeight + additionalSpace
        : "auto";

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
            (e) => {
                setKeyboardVisible(true);
                setKeyboardHeight(e.endCoordinates.height);
            },
        );

        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
            () => {
                setKeyboardVisible(false);
                setKeyboardHeight(0);
            },
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return {
        keyboardVisible,
        keyboardHeight,
        availableContentHeight,
    };
};

export default useWindow;