import React from "react";
import {View} from "tamagui";
import {BackHandler} from "react-native";
import {useBackHandler} from "@react-native-community/hooks";

import CustomStackScreen from "@/components/CustomStackScreen";
import {CustomText} from "@/components/CustomText";

const Home = () => {
    useBackHandler(() => {
        BackHandler.exitApp();
        return true;
    })

    return (
        <>
            <CustomStackScreen/>
            <View height="100%" padding={16} flexDirection="column">
                <CustomText
                    color="$gray-40"
                    size="p1Light"
                    textAlign="center"
                    width="100%"
                >
                    Hello
                </CustomText>
            </View>
        </>
    )
}

export default Home;
