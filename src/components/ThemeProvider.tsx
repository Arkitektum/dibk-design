import {
  addGlobalStylesheet,
  getCssVariablesFromTheme,
  stringifyCssColorVariables,
} from '../functions/helpers';
import type { ThemeProps } from './Theme';
import {
  FieldRequirementProvider,
  type RequirementIndicatorMode,
} from "./FieldRequirementIndicator";

import './ThemeProvider.module.scss';

export interface ThemeProviderProps {
  theme?: ThemeProps;
  children: React.ReactNode;
  fieldRequirementIndicatorMode?: RequirementIndicatorMode;
  fieldOptionalLabel?: string;
}

const ThemeProvider = ({
  theme,
  children,
  fieldRequirementIndicatorMode,
  fieldOptionalLabel,
}: ThemeProviderProps) => {
  const cssVariablesFromTheme = getCssVariablesFromTheme(theme);
  const cssColorVariablesString = stringifyCssColorVariables(
    cssVariablesFromTheme
  );
  addGlobalStylesheet('theme-provider', `:root {${cssColorVariablesString}}`);

  return (
    <FieldRequirementProvider
      mode={fieldRequirementIndicatorMode}
      optionalLabel={fieldOptionalLabel}
    >
      {children}
    </FieldRequirementProvider>
  );
};

export default ThemeProvider;
