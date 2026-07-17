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
        "accent-regular": "#6366F1",
        "accent-pressed": "#4F46E5",
        "accent-disabled": "#CBD5E1",
        "accent-highlight": "#EEF2F6",

        "card-1-unselected": "#FFFFFF",
        "card-1-selected": "#EEF2F6",

        "background": "#FAF8F5",

        "gray-100": "#FFFFFF",
        "gray-93": "#F8FAFC",
        "gray-85": "#F1F5F9",
        "gray-75": "#E2E8F0",
        "gray-60": "#94A3B8",
        "gray-40": "#64748B",
        "gray-20": "#0F172A",
        "black": "#020617",

        "gray-100-15op": "#FFFFFF26",
        "gray-100-25op": "#FFFFFF40",

        "error-highlight": "#FDF2F2",
        "error-primary": "#EF4444",
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

            "primary": tokens.color["accent-regular"],
            "primaryHover": tokens.color["accent-pressed"],
            "primaryPress": tokens.color["accent-pressed"],

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
