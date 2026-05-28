// Dependencies
import type { CSSProperties } from "react";

// Stylesheets
import style from "./ProgressBar.module.scss";

export interface ProgressBarProps {
    progress?: number;
    hasErrors?: boolean;
}

const ProgressBar = ({ progress = 0, hasErrors = false }: ProgressBarProps) => {
    return (
        <div
            className={`${style.progressBar} ${hasErrors ? style.hasErrors : ""}`}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ "--value": progress } as CSSProperties}
        ></div>
    );
};

export default ProgressBar;
