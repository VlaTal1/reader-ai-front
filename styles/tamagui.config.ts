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
    // "Warm Reading Nook" shape language: generous, friendly rounding.
    // 5/6 (24/32) are cards & sheets, 7 (999) is the pill used by every button.
    radius: {0: 0, 1: 8, 2: 12, 3: 16, 4: 20, 5: 24, 6: 32, 7: 999, true: 20},
    zIndex: {0: 0, 1: 100, 2: 200},
    color: {
        // Primary brand accent — burnt terracotta (replaces the old indigo).
        "accent-regular": "#CB5A2E",
        "accent-pressed": "#A8451F",
        "accent-disabled": "#E8C7AE",
        "accent-highlight": "#FBEAD9",

        // Secondary brand hues, used consistently per feature area.
        "sage-regular": "#3F8A5D",
        "sage-pressed": "#2F6B45",
        "sage-highlight": "#E7F3EA",

        "gold-regular": "#D69E2E",
        "gold-pressed": "#B07A1E",
        "gold-highlight": "#FBF0D9",

        "teal-regular": "#2F6F62",
        "teal-pressed": "#255A50",
        "teal-highlight": "#E1F0EA",

        "plum-regular": "#9C4F86",
        "plum-pressed": "#7C3D6A",
        "plum-highlight": "#F5E9F1",

        "card-1-unselected": "#FFFFFF",
        "card-1-selected": "#FBEAD9",

        "background": "#F6EFE1",

        // Warm neutral scale (paper -> ink) replaces the old cold slate grays.
        "gray-100": "#FFFFFF",
        "gray-93": "#FBF6EC",
        "gray-85": "#EFE3CB",
        "gray-75": "#E4D5B4",
        "gray-60": "#A68A63",
        "gray-40": "#7A6248",
        "gray-20": "#2B2013",
        "black": "#1A1209",

        "gray-100-15op": "#FFFFFF26",
        "gray-100-25op": "#FFFFFF40",

        "error-highlight": "#FBEAE8",
        "error-primary": "#C1443A",
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

            "sage-regular": tokens.color["sage-regular"],
            "sage-pressed": tokens.color["sage-pressed"],
            "sage-highlight": tokens.color["sage-highlight"],
            "gold-regular": tokens.color["gold-regular"],
            "gold-pressed": tokens.color["gold-pressed"],
            "gold-highlight": tokens.color["gold-highlight"],
            "teal-regular": tokens.color["teal-regular"],
            "teal-pressed": tokens.color["teal-pressed"],
            "teal-highlight": tokens.color["teal-highlight"],
            "plum-regular": tokens.color["plum-regular"],
            "plum-pressed": tokens.color["plum-pressed"],
            "plum-highlight": tokens.color["plum-highlight"],

            "primary": tokens.color["accent-regular"],
            "primaryHover": tokens.color["accent-pressed"],
            "primaryPress": tokens.color["accent-pressed"],

            "gray-100-15op": tokens.color["gray-100-15op"],
            "gray-100-25op": tokens.color["gray-100-25op"],

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
