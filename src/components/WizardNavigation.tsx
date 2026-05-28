// Components
import Step, { type StepData } from "./Step";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./WizardNavigation.module.scss";

export type StepKey = "SignIn" | "AvailableReportees" | "Import" | "NextProcessCategory" | "Receipt";

export interface WizardNavigationProps {
    steps: Record<StepKey, StepData>;
    activeStepId: string | number;
    direction?: "vertical" | "horizontal";
    "aria-label"?: string;
}

const WizardNavigation = ({ steps, activeStepId, direction = "vertical", "aria-label": ariaLabelProp }: WizardNavigationProps) => {
    const stepKeys = Object.keys(steps);
    const amountOfSteps = stepKeys.length;

    const defaultAriaLabel = `I dette skjemaet er det totalt ${amountOfSteps} steg som du skal gå igjennom`;
    const ariaLabel = ariaLabelProp?.length ? ariaLabelProp : defaultAriaLabel;

    return (
        <nav aria-label={ariaLabel} className={classNameArrayToClassNameString([style.wizardTopnavContainer, style[direction]])}>
            <ol className={style.wizardTopnav}>
                {stepKeys.map((stepKey, index) => (
                    <Step key={stepKey} step={steps[stepKey as StepKey]} activeStepId={activeStepId} direction={direction} index={index} />
                ))}
            </ol>
        </nav>
    );
};

export default WizardNavigation;
