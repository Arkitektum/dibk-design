import { Link as RouterLink } from "react-router-dom";
import { checkmarkSymbolIcon } from "../icons";
import { classNameArrayToClassNameString } from "../functions/helpers";
import style from "./Step.module.scss";

export interface StepData {
  id: string | number;
  name: string;
  finished?: boolean;
  hasErrors?: boolean;
  link?: { pathname: string; search: string };
}

export interface StepProps {
  step: StepData;
  index: number;
  activeStepId: string | number;
  direction?: "vertical" | "horizontal";
}

const Step = ({
  step,
  index,
  activeStepId,
  direction = "vertical",
}: StepProps) => {
  const isActive = activeStepId === step.id;
  const isVertical = direction === "vertical";

  const baseClassName = classNameArrayToClassNameString([
    style.wizardTopnavItem,
    isActive && style.active,
    step.finished && style.finished,
    step.hasErrors && style.hasErrors,
    style[direction],
  ]);

  const ariaCurrent = isActive ? "step" : undefined;

  const renderStepContent = () => (
    <>
      <span className={style.stepNumber}>{index + 1}</span>
      <span className={style.stepName}>{step.name}</span>
      {isVertical && step.finished && !isActive && (
        <img
          src={checkmarkSymbolIcon}
          alt=""
          className={style.checkmarkSymbol}
        />
      )}
    </>
  );

  if (step.link && Object.keys(step.link).length > 0) {
    return (
      <li className={baseClassName}>
        <RouterLink
          to={step.link}
          aria-current={ariaCurrent}
          className={style.wizardTopnavItemContent}
        >
          {renderStepContent()}
        </RouterLink>
      </li>
    );
  }

  return (
    <li className={baseClassName}>
      <span
        aria-current={ariaCurrent}
        className={style.wizardTopnavItemContent}
      >
        {renderStepContent()}
      </span>
    </li>
  );
};

export default Step;
