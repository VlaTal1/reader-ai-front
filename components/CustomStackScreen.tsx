import React from "react";
import {Stack} from "expo-router";

const CustomStackScreen = (props: React.ComponentProps<typeof Stack.Screen>) => {
    return (
        <Stack.Screen
            {...props}
            options={{
                headerShown: false,
                animation: "fade",
                animationDuration: 500,
                contentStyle: {backgroundColor: "transparent"},
                ...(props.options || {}),
            }}
        />
    );
};

export default CustomStackScreen;