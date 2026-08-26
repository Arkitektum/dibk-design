// Dependencies
import type React from "react";
import { useEffect, useLayoutEffect, useMemo } from "react";

// Components
import { FieldRequirementProvider, type RequirementIndicatorMode } from "./FieldRequirementIndicator";
import type { ThemeProps } from "./Theme";

// Helpers
import { addGlobalStylesheet, getCssVariablesFromTheme, stringifyCssColorVariables } from "../functions/helpers";
import { getCustomThemeForThemeId, getCustomThemeId } from "@/data/customTheme";

// Stylesheets
import style from "./ThemeProvider.scss?inline";

// The stylesheet must be in place before the first paint to avoid a flash of
// unthemed content, but useLayoutEffect has no effect — and warns — on the server.
const useGlobalStylesheetEffect = typeof document === "undefined" ? useEffect : useLayoutEffect;

export interface ThemeProviderProps {
    theme?: ThemeProps;
    children: React.ReactNode;
    fieldRequirementIndicatorMode?: RequirementIndicatorMode;
    fieldOptionalLabel?: string;
}

const ThemeProvider = ({ theme, children, fieldRequirementIndicatorMode, fieldOptionalLabel }: ThemeProviderProps) => {
    const themeId = theme?.themeId ? theme.themeId : theme?.appName ? getCustomThemeId(theme.appName) : undefined;

    const globalStylesheet = useMemo(() => {
        const customTheme = themeId ? getCustomThemeForThemeId(themeId) : undefined;
        const cssVariablesFromTheme = getCssVariablesFromTheme(theme, customTheme);
        return `:root {${stringifyCssColorVariables(cssVariablesFromTheme)}} ${style}`;
    }, [theme, themeId]);

    useGlobalStylesheetEffect(() => {
        addGlobalStylesheet("theme-provider", globalStylesheet);
    }, [globalStylesheet]);

    return (
        <FieldRequirementProvider mode={fieldRequirementIndicatorMode} optionalLabel={fieldOptionalLabel}>
            {children}
        </FieldRequirementProvider>
    );
};

export default ThemeProvider;
