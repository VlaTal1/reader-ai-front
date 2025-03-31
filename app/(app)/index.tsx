import {useRouter} from "expo-router";
import React, {useState} from "react";
import {View} from "tamagui";
import {BackHandler} from "react-native";
import {useBackHandler} from "@react-native-community/hooks";
import CustomStackScreen from "@/components/CustomStackScreen";
import {CustomText} from "@/components/CustomText";

const Home = () => {
    const router = useRouter();

    useBackHandler(() => {
        BackHandler.exitApp();
        return true;
    })

    const [isBurgerOpen, setIsBurgerOpen] = useState(false)
    const [isUploadBillModalOpen, setIsUploadBillModalOpen] = useState(false)

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
