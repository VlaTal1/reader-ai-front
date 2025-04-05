import React from "react";
import {LinearGradient} from "expo-linear-gradient";

type Props = {
    gradientColors?: readonly [string, string, ...string[]];
    children: React.ReactNode;
}

const BottomButtonGroup: React.FC<Props> = ({children, gradientColors}) => {
    return (
        <LinearGradient
            colors={gradientColors ? gradientColors : ["transparent", "rgba(255,255,255,1)"]}
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: 16,
            }}
        >
            {children}
        </LinearGradient>
    )
}

export default BottomButtonGroup;