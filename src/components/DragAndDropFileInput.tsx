// Dependencies
import { useCallback, useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import type React from "react";

// Components
import FieldRequirementIndicator, { type RequirementIndicatorMode } from "./FieldRequirementIndicator";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

// Stylesheets
import style from "./DragAndDropFileInput.module.scss";

export interface DragAndDropFileInputProps {
    id: string;
    name?: string;
    onSelectChange: () => void;
    onDragAndDropChange: (files: FileList) => void;
    label?: string | (string | JSX.Element)[];
    subLabel?: string | (string | JSX.Element)[];
    buttonContent?: string;
    buttonContentWhenSelectedFile?: string;
    selectedFileName?: string;
    /**
     * Renders the chosen file name as static text: the label, then a plain
     * `<span>`. No drop zone, no file input, no button and nothing focusable —
     * for read-only and view modes, where `disabled` would wrongly imply
     * "temporarily unavailable".
     */
    contentOnly?: boolean;
    /** `contentOnly` only. Text shown when no file has been chosen. */
    defaultContent?: string;
    /** Prompt shown in the drop zone before a file is chosen. */
    dropZoneLabel?: string;
    /** Prefix shown before the chosen file's name. */
    selectedFileLabel?: string;
    /** Hint shown next to the button before a file is chosen. */
    buttonHelpText?: string;
    hasErrors?: boolean;
    errorMessage?: string | (string | JSX.Element)[];
    required?: boolean;
    requirementIndicatorMode?: RequirementIndicatorMode;
    optionalLabel?: string;

    "data-transaction-name"?: string;
}

const DragAndDropFileInput = ({
    id,
    name,
    onSelectChange,
    onDragAndDropChange,
    label = "",
    subLabel = "",
    buttonContent,
    buttonContentWhenSelectedFile,
    selectedFileName,
    contentOnly = false,
    defaultContent = "",
    dropZoneLabel = "Slipp fil her",
    selectedFileLabel = "Valgt fil:",
    buttonHelpText = "eller klikk på knappen for å velge fil",
    hasErrors = false,
    errorMessage = "",
    required = false,
    requirementIndicatorMode,
    optionalLabel,

    "data-transaction-name": transactionName
}: DragAndDropFileInputProps) => {
    const [highlight, setHighlight] = useState(false);
    const containerElementRef = useRef<HTMLDivElement>(null);
    const fileInputElementRef = useRef<HTMLInputElement>(null);

    const preventDefaults = useCallback((e: Event) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleAddButtonOnClick = () => {
        fileInputElementRef.current?.click();
    };

    const getErrorElementId = () => `${id}-errorMessage`;

    const inputElementProps: React.InputHTMLAttributes<HTMLInputElement> = {
        id,
        "aria-describedby": hasErrors && errorMessage?.toString().length ? getErrorElementId() : undefined,
        "aria-invalid": hasErrors ? "true" : undefined,
        "aria-required": required ? "true" : undefined,
        name
    };

    const buttonLabel = selectedFileName ? buttonContentWhenSelectedFile || buttonContent : buttonContent;

    const highlightOn = useCallback(() => setHighlight(true), []);
    const highlightOff = useCallback(() => setHighlight(false), []);
    const handleDrop = useCallback(
        (e: DragEvent) => {
            preventDefaults(e);
            if (e.dataTransfer?.files) {
                onDragAndDropChange(e.dataTransfer.files);
            }
            setHighlight(false);
        },
        [onDragAndDropChange]
    );

    useEffect(() => {
        const node = containerElementRef.current;
        if (!node) return;

        ["dragenter", "dragover"].forEach((eventName) => {
            node.addEventListener(eventName, highlightOn);
        });
        ["dragleave", "drop"].forEach((eventName) => {
            node.addEventListener(eventName, highlightOff);
        });

        ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
            node.addEventListener(eventName, preventDefaults);
        });

        node.addEventListener("drop", handleDrop);

        return () => {
            ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
                node.removeEventListener(eventName, preventDefaults);
                node.removeEventListener(eventName, highlightOn);
                node.removeEventListener(eventName, highlightOff);
            });
            node.removeEventListener("drop", handleDrop);
        };
    }, [handleDrop, highlightOn, highlightOff, preventDefaults]);

    const labelElement = (
        <Label htmlFor={id} subLabel={subLabel}>
            {label}
            <FieldRequirementIndicator
                required={required}
                mode={requirementIndicatorMode}
                optionalLabel={optionalLabel}
                requiredClassName={style.requiredSymbol}
            />
        </Label>
    );

    // Placed after the hooks, not before them, so the hook order stays the same
    // in both modes. The drag listeners are a no-op here: their effect bails out
    // because the drop zone it looks for is never rendered.
    if (contentOnly) {
        return (
            <div className={style.dragAndDropFileInput}>
                {labelElement}
                <span className={style.contentOnly}>{selectedFileName || defaultContent}</span>
                <ErrorMessage id={getErrorElementId()} content={errorMessage} />
            </div>
        );
    }

    return (
        <div className={style.dragAndDropFileInput}>
            {labelElement}

            <div
                ref={containerElementRef}
                className={`${style.dragAndDropContainer} ${highlight ? style.highlighted : ""} ${hasErrors ? style.hasErrors : ""}`}
            >
                {selectedFileName ? (
                    <div>
                        <span>
                            <b>{selectedFileLabel}</b> {selectedFileName}
                        </span>
                    </div>
                ) : (
                    <div>{dropZoneLabel}</div>
                )}
                <input {...inputElementProps} ref={fileInputElementRef} type="file" onChange={onSelectChange} />
                {buttonContent && (
                    <>
                        <div>{selectedFileName ? "" : buttonHelpText}</div>

                        <Button
                            size="small"
                            inputType="button"
                            color="primary"
                            onClick={handleAddButtonOnClick}
                            content={buttonLabel}
                            data-transaction-name={transactionName}
                        />
                    </>
                )}
            </div>

            <ErrorMessage id={getErrorElementId()} content={errorMessage} />
        </div>
    );
};

export default DragAndDropFileInput;
