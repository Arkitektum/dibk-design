import { createContext, useContext, type ReactNode } from "react";
import { AsteriskIcon } from "../icons";

export type RequirementIndicatorMode = "required" | "optional" | "none";

interface FieldRequirementIndicatorContextValue {
  mode: RequirementIndicatorMode;
  optionalLabel: string;
}

const defaultContextValue: FieldRequirementIndicatorContextValue = {
  mode: "required",
  optionalLabel: "Valgfritt",
};

const FieldRequirementIndicatorContext =
  createContext<FieldRequirementIndicatorContextValue>(defaultContextValue);

export interface FieldRequirementProviderProps {
  children: ReactNode;
  mode?: RequirementIndicatorMode;
  optionalLabel?: string;
}

export const FieldRequirementProvider = ({
  children,
  mode = defaultContextValue.mode,
  optionalLabel = defaultContextValue.optionalLabel,
}: FieldRequirementProviderProps) => (
  <FieldRequirementIndicatorContext.Provider value={{ mode, optionalLabel }}>
    {children}
  </FieldRequirementIndicatorContext.Provider>
);

export const useFieldRequirementIndicator = () =>
  useContext(FieldRequirementIndicatorContext);

export interface FieldRequirementIndicatorProps {
  required: boolean;
  mode?: RequirementIndicatorMode;
  optionalLabel?: string;
  requiredClassName?: string;
  optionalClassName?: string;
}

const FieldRequirementIndicator = ({
  required,
  mode,
  optionalLabel,
  requiredClassName,
  optionalClassName,
}: FieldRequirementIndicatorProps) => {
  const {
    mode: contextMode,
    optionalLabel: contextOptionalLabel,
  } = useFieldRequirementIndicator();

  const effectiveMode = mode ?? contextMode;
  const effectiveOptionalLabel = optionalLabel ?? contextOptionalLabel;

  if (effectiveMode === "none") return null;

  if (effectiveMode === "required") {
    return required ? (
      <AsteriskIcon aria-hidden="true" className={requiredClassName} />
    ) : null;
  }

  return !required ? (
    <span
      className={optionalClassName}
      style={{ color: "#828282", fontWeight: 400 }}
    >
      {" "}
      ({effectiveOptionalLabel})
    </span>
  ) : null;
};

export default FieldRequirementIndicator;
