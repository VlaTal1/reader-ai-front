import {styled, Text} from "tamagui";

const CustomText = styled(Text, {
    variants: {
        size: {
            h1: {
                fontFamily: "$heading",
                fontSize: "$8",
                fontWeight: "400",
                lineHeight: "$8",
                paddingTop: 6,
            },
            h2: {
                fontFamily: "$heading",
                fontSize: "$7",
                fontWeight: "500",
                lineHeight: "$7",
                paddingTop: 4,
            },
            h3Regular: {
                fontFamily: "$heading",
                fontSize: "$6",
                fontWeight: "400",
                lineHeight: "$6",
                paddingTop: 2,
            },
            h3Medium: {
                fontFamily: "$heading",
                fontSize: "$6",
                fontWeight: "500",
                lineHeight: "$6",
                paddingTop: 2,
            },
            h4Regular: {
                fontFamily: "$heading",
                fontSize: "$5",
                fontWeight: "400",
                lineHeight: "$5",
            },
            h4Medium: {
                fontFamily: "$heading",
                fontSize: "$5",
                fontWeight: "500",
                lineHeight: "$5",
            },
            h5Regular: {
                fontFamily: "$heading",
                fontSize: "$4",
                fontWeight: "400",
                lineHeight: "$4",
            },
            h5Medium: {
                fontFamily: "$heading",
                fontSize: "$4",
                fontWeight: "500",
                lineHeight: "$4",
            },
            h6: {
                fontFamily: "$heading",
                fontSize: "$3",
                fontWeight: "500",
                lineHeight: "$3",
            },
            p1Light: {
                fontFamily: "$body",
                fontSize: "$3",
                fontWeight: "300",
                lineHeight: "$3",
            },
            p1Regular: {
                fontFamily: "$body",
                fontSize: "$3",
                fontWeight: "400",
                lineHeight: "$3",
            },
            p1Medium: {
                fontFamily: "$body",
                fontSize: "$3",
                fontWeight: "500",
                lineHeight: "$3",
            },
            p2Light: {
                fontFamily: "$body",
                fontSize: "$2",
                fontWeight: "300",
                lineHeight: "$2",
            },
            p2Regular: {
                fontFamily: "$body",
                fontSize: "$2",
                fontWeight: "400",
                lineHeight: "$2",
            },
            p2Medium: {
                fontFamily: "$body",
                fontSize: "$2",
                fontWeight: "500",
                lineHeight: "$2",
            },
            p3Light: {
                fontFamily: "$body",
                fontSize: "$1",
                fontWeight: "300",
                lineHeight: "$1",
            },
            p3Regular: {
                fontFamily: "$body",
                fontSize: "$1",
                fontWeight: "400",
                lineHeight: "$1",
            },
            p3Medium: {
                fontFamily: "$body",
                fontSize: "$1",
                fontWeight: "500",
                lineHeight: "$1",
            },
        },

    } as const,
})

export {CustomText};