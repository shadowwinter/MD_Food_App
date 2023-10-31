import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    darkGreen: "#222E9A",
    darkLime: "#1A2187",
    lightLime: "#BBBBD7",
    lime: "#2B31D7",
    lightGreen: "#E9E8FA",
    lightGreen1: "#9091BD",

    white: "#fff",
    white2: '#F9F9F9',
    black: "#020202",
    blue: "#4096FE",
    grey: "#777777",
    grey2: '#F8F8F8',
    lightGrey: "#F5F6FB",
    lightGrey2: '#757575',

    transparentBlack1: 'rgba(2, 2, 2, 0.1)',
    transparentBlack3: 'rgba(2, 2, 2, 0.3)',
    transparentBlack5: 'rgba(2, 2, 2, 0.5)',
    transparentBlack7: 'rgba(2, 2, 2, 0.7)',
    transparentBlack9: 'rgba(2, 2, 2, 0.9)',

    transparentGrey: 'rgba(77,77,77, 0.8)',
    transparentDarkgrey: 'rgba(20,20,20, 0.9)',

    transparent: 'transparent',
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Helvetica", fontSize: SIZES.largeTitle },
    h1: { fontFamily: "Helvetica-Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Helvetica-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Helvetica-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Helvetica-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Helvetica-Light", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Helvetica-Light", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Helvetica-Light", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Helvetica-Light", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Helvetica-Light", fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { SIZES, FONTS };

export default appTheme;