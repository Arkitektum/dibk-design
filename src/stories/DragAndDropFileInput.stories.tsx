import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import DragAndDropFileInput from "../components/DragAndDropFileInput";

const meta: Meta<typeof DragAndDropFileInput> = {
    title: "Primitives/DragAndDropFileInput",
    component: DragAndDropFileInput,
    argTypes: {
        actionButtonColor: { control: "radio", options: ["primary", "secondary"] },
        requirementIndicatorMode: {
            control: "radio",
            options: ["required", "optional", "none"]
        }
    },
    tags: ["autodocs"],
    render: (args) => <DragAndDropFileInput {...args} />
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithoutSelectedFile: Story = {
    args: {
        id: "dragAndDropInput-1",
        label: "Input uten valgt fil",
        buttonContent: "Velg fil",
        onSelectChange: fn(),
        onDragAndDropChange: fn()
    }
};

export const WithSelectedFile: Story = {
    args: {
        ...WithoutSelectedFile.args,
        selectedFileName: "important-file.xml"
    }
};

export const Required: Story = {
    args: {
        ...WithoutSelectedFile.args,
        required: true
    }
};

export const WithCustomButtonContentWhenSelectedFile: Story = {
    args: {
        ...WithSelectedFile.args,
        buttonContentWhenSelectedFile: "Velg annen fil"
    }
};

export const WithError: Story = {
    args: {
        ...WithCustomButtonContentWhenSelectedFile.args,
        selectedFileName: "wrong-file.xml",
        hasErrors: true,
        errorMessage: "Filen må være midre enn 15MB"
    }
};

export const WithSubLabel: Story = {
    args: {
        ...WithoutSelectedFile.args,
        subLabel: "Støtter PDF, PNG og JPG. Maks 15MB."
    }
};

// Every string in the drop zone can be replaced, for an application that is not
// in Norwegian or wants different wording.
export const WithCustomDropZoneText: Story = {
    args: {
        ...WithoutSelectedFile.args,
        label: "Attachment",
        buttonContent: "Choose file",
        dropZoneLabel: "Drop your file here",
        buttonHelpText: "or use the button to pick one"
    }
};

export const WithCustomSelectedFileLabel: Story = {
    args: {
        ...WithSelectedFile.args,
        selectedFileLabel: "Chosen file:"
    }
};

// In `optional` mode the indicator moves to the fields that may be left alone.
export const OptionalIndicator: Story = {
    args: {
        ...WithoutSelectedFile.args,
        label: "Vedlegg",
        requirementIndicatorMode: "optional"
    }
};

export const ContentOnly: Story = {
    args: {
        ...WithoutSelectedFile.args,
        label: "Content only",
        contentOnly: true,
        selectedFileName: "important-file.xml"
    }
};

export const ContentOnlyWithDefaultContent: Story = {
    args: {
        ...WithoutSelectedFile.args,
        label: "Content only (no file)",
        contentOnly: true,
        defaultContent: "Ingen fil valgt"
    }
};

export const WithSecondaryActionButton: Story = {
    args: {
        ...WithoutSelectedFile.args,
        label: "Secondary button colour",
        actionButtonColor: "secondary"
    }
};
