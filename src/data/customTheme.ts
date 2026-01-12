import arbeidstilsynetLogo from "../assets/svg/arbeidstilsynet-logo.svg?url";
import dibkLogo from "../assets/svg/dibk-logo.svg?url";
import dibkLogoWithTitle from "../assets/svg/dibk-logo-with-title.svg?url";
import type { ThemeProps } from "../components/Theme";

const dibk: ThemeProps = {
  appName: "DiBK",
  logo: dibkLogoWithTitle,
  logoCompact: dibkLogo,

  colors: {
    bodyBackground: "#ebf4fa",
    defaultText: "#202020",
    headingText: "#003045",
    primaryText: "#005275",
    primary: "#003045",
    primaryLight: "#264f61",
    primaryXLight: "#406474",
    primaryContrast: "#ffffff",
    secondary: "#ffffff",
    secondaryLight: "#c7e0f2",
    secondaryXLight: "#ebf4fa",
    secondaryContrast: "#005275",
    formElement: "#003045",
    border: "#89bad6",
    focus: "rgba(0, 92, 173, 0.4)",
    defaultBackground: "#f1fae3",
    secondaryBackground: "#f5f0f0",
    success: "#177912",
    successLight: "#cbebb0",
    successXLight: "#f1fae3",
    warning: "#ffbe00",
    warningLight: "#fcefb6",
    warningXLight: "#fff8db",
    error: "#db0000",
    errorLight: "#ffc5c2",
    errorXLight: "#fceceb",
  },
};
const arbeidstilsynet: ThemeProps = {
  appName: "Arbeidstilsynet",
  logo: arbeidstilsynetLogo,

  colors: {
    bodyBackground: "#e7f9f7",
    defaultText: "#262626",
    headingText: "#323232",
    primaryText: "#D13C0A",
    primary: "#0D7168",
    primaryLight: "#4a958e" /*75%*/,
    primaryXLight: "#86b8b4" /*50%*/,
    primaryContrast: "#ffffff",
    secondary: "#a0e6df",
    secondaryLight: "#d0f3ef" /*50%*/,
    secondaryXLight: "#e7f9f7" /*25%*/,
    secondaryContrast: "#38514e",
    formElement: "#333",
    border: "#0D7168",
    focus: "#00C0B0",
    defaultBackground: "#EDEEF2",
    secondaryBackground: "#f6f7f9",
    success: "#13D646",
    successLight: "#c4f5d1",
    successXLight: "#e2fae8",
    warning: "#FFC414",
    warningLight: "#fff0c2",
    warningXLight: "#fff7e0",
    error: "#FF3116",
    errorLight: "#ffccc5",
    errorXLight: "#ffe5e2",
  },
};

const customThemes = {
  dibk,
  arbeidstilsynet,
};

export default customThemes;
