import React from "react";
import {Stack} from "expo-router";

const CustomStackScreen = (props: React.ComponentProps<typeof Stack.Screen>) => {
    return (
        <Stack.Screen
            {...props}
            options={{
                headerShown: false,
                animation: "flip",
                animationDuration: 500,
                contentStyle: {backgroundColor: "#F6EFE1"},
                ...(props.options || {}),
            }}
        />
    );
};

export default CustomStackScreen;