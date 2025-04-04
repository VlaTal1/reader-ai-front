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
                contentStyle: {backgroundColor: "#E0E0DC"},
                ...(props.options || {}),
            }}
        />
    );
};

export default CustomStackScreen;