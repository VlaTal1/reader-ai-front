import {createFont} from "tamagui";

export const Geist = createFont({
    family: "GeistRegular",
    size: {
        1: 15,
        2: 15,
        3: 15,
        4: 17,
        true: 17,
        5: 19,
        6: 28,
        7: 36,
        8: 40,
    },
    lineHeight: {
        1: 12,
        2: 22,
        3: 22,
        4: 24,
        true: 24, // Default line height when "true" is used
        5: 32,
        6: 28,
        7: 32,
        8: 36,
    },
    letterSpacing: {
        1: -0.15,
        2: -0.15,
        3: -0.3,
        4: -0.34,
        5: -0.38,
        6: -0.56,
        7: -0.72,
        8: -0.8,
        true: 0, // Default letter spacing when "true" is used
    },
    weight: {
        1: 400,
        2: 500,
    },
    face: {
        400: {normal: "GeistRegular"},
        500: {normal: "GeistMedium"},
    },
})

export const Inter = createFont({
    family: "InterRegular",
    size: {
        1: 12,
        2: 13,
        3: 15,
        4: 17,
        true: 17,
        5: 19,
        6: 32,
        7: 36,
        8: 40,
    },
    lineHeight: {
        1: 16,
        2: 20,
        3: 24,
        4: 24,
        true: 24, // Default line height when "true" is used
        5: 32,
        6: 28,
        7: 32,
        8: 38,
    },
    letterSpacing: {
        1: 0,
        2: 0,
        3: 0,
        4: -0.17,
        5: -0.19,
        6: -0.32,
        7: -0.36,
        8: -0.4,
        true: 0, // Default letter spacing when "true" is used
    },
    weight: {
        1: 300,
        2: 400,
        3: 500,
    },
    face: {
        300: {normal: "InterLight"},
        400: {normal: "InterRegular"},
        500: {normal: "InterMedium"},
    },
});