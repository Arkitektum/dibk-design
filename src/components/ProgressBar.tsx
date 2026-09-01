// Dependencies
import type { CSSProperties } from "react";

// Stylesheets
import style from "./ProgressBar.module.scss";

export interface ProgressBarProps {
    progress?: number;
    hasErrors?: boolean;
    /**
     * Accessible name of the progress bar. A `progressbar` role without one is
     * announced as a bare percentage, with nothing to say what is progressing.
     * Name what it measures when the default is too vague — a form's completion
     * and a file upload should not both be "Fremdrift".
     */
    ariaLabel?: string;
}

const ProgressBar = ({ progress = 0, hasErrors = false, ariaLabel = "Fremdrift" }: ProgressBarProps) => {
    return (
        <div
            className={`${style.progressBar} ${hasErrors ? style.hasErrors : ""}`}
            role="progressbar"
            aria-label={ariaLabel}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ "--value": progress } as CSSProperties}
        ></div>
    );
};

export default ProgressBar;
