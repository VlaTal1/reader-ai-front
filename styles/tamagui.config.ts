import {createTamagui, createTokens} from "tamagui";

import {Geist, Inter} from "@/styles/fonts";


export const size = {
    1: 12,
    2: 16,
    3: 18,
    4: 20,
    5: 28,
    6: 36,
    7: 40,
    8: 48,
    true: 16,
};

export const tokens = createTokens({
    size,
    space: {...size, "-1": -5, "-2": -10},
    radius: {0: 0, 1: 3},
    zIndex: {0: 0, 1: 100, 2: 200},
    color: {
        "accent-regular": "#333333",
        "accent-pressed": "#262626",
        "accent-disabled": "#8C8C8C",
        "accent-highlight": "#BFBFBF",

        "card-1-unselected": "#FFFFFF",
        "card-1-selected": "#EBEAE5",

        "background": "#E0E0DC",

        "gray-100": "#FFFFFF",
        "gray-93": "#F0EFEB",
        "gray-85": "#D9D9D9",
        "gray-75": "#BFBFBF",
        "gray-60": "#999999",
        "gray-40": "#666666",
        "gray-20": "#333333",
        "black": "#000000",

        "gray-100-15op": "#FFFFFF26",
        "gray-100-25op": "#FFFFFF40",

        "error-highlight": "#F5E6E6",
        "error-primary": "#D65C5C",
    },
});

const tamaguiConfig = createTamagui({
    fonts: {
        heading: Geist,
        body: Inter,
    },
    tokens,
    themes: {
        light: {
            "color": tokens.color["black"],

            "viewBackground": tokens.color["background"],

            "background": tokens.color["accent-regular"],
            "backgroundHover": tokens.color["accent-highlight"],
            "backgroundFocus": tokens.color["accent-highlight"],
            "backgroundPress": tokens.color["accent-pressed"],
            "accent-disabled": tokens.color["accent-disabled"],

            "card-1-unselected": tokens.color["card-1-unselected"],
            "card-1-selected": tokens.color["card-1-selected"],

            "gray-100": tokens.color["gray-100"],
            "gray-93": tokens.color["gray-93"],
            "gray-85": tokens.color["gray-85"],
            "gray-75": tokens.color["gray-75"],
            "gray-60": tokens.color["gray-60"],
            "gray-40": tokens.color["gray-40"],
            "gray-20": tokens.color["gray-20"],

            "gray-100-15op": tokens.color["gray-100-15op"],
            "gray-100-25op": tokens.color["gray-100-15op"],

            "error-highlight": tokens.color["error-highlight"],
            "error-primary": tokens.color["error-primary"],
        },
        // TODO : add black theme
    },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig

declare module "tamagui" {
    interface TamaguiCustomConfig extends Conf {
    }
}
