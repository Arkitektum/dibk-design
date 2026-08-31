// Dependencies
import { type ReactNode, createContext, useContext } from "react";

// Components
import { AsteriskIcon } from "../icons";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./FieldRequirementIndicator.module.scss";

export type RequirementIndicatorMode = "required" | "optional" | "none";

interface FieldRequirementIndicatorContextValue {
    mode: RequirementIndicatorMode;
    optionalLabel: string;
}

const defaultContextValue: FieldRequirementIndicatorContextValue = {
    mode: "required",
    optionalLabel: "Valgfritt"
};

const FieldRequirementIndicatorContext = createContext<FieldRequirementIndicatorContextValue>(defaultContextValue);

export interface FieldRequirementProviderProps {
    children: ReactNode;
    mode?: RequirementIndicatorMode;
    optionalLabel?: string;
}

export const FieldRequirementProvider = ({
    children,
    mode = defaultContextValue.mode,
    optionalLabel = defaultContextValue.optionalLabel
}: FieldRequirementProviderProps) => (
    <FieldRequirementIndicatorContext.Provider value={{ mode, optionalLabel }}>{children}</FieldRequirementIndicatorContext.Provider>
);

export const useFieldRequirementIndicator = () => useContext(FieldRequirementIndicatorContext);

export interface FieldRequirementIndicatorProps {
    required: boolean;
    mode?: RequirementIndicatorMode;
    optionalLabel?: string;
    requiredClassName?: string;
    optionalClassName?: string;
}

const FieldRequirementIndicator = ({ required, mode, optionalLabel, requiredClassName, optionalClassName }: FieldRequirementIndicatorProps) => {
    const { mode: contextMode, optionalLabel: contextOptionalLabel } = useFieldRequirementIndicator();

    const effectiveMode = mode ?? contextMode;
    const effectiveOptionalLabel = optionalLabel ?? contextOptionalLabel;

    if (effectiveMode === "none") return null;

    if (effectiveMode === "required") {
        return required ? <AsteriskIcon aria-hidden="true" className={requiredClassName} /> : null;
    }

    // Styled through a class rather than an inline style, which no consumer
    // could override: an inline style beats any selector they could write,
    // including the `optionalClassName` this component asks them for.
    return !required ? (
        <span className={classNameArrayToClassNameString([style.optionalLabel, optionalClassName])}>
            {" "}
            ({effectiveOptionalLabel})
        </span>
    ) : null;
};

export default FieldRequirementIndicator;
