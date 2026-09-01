// stories/ProgressBar.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";

import ProgressBar from "../components/ProgressBar";

const meta: Meta<typeof ProgressBar> = {
    title: "Primitives/ProgressBar",
    component: ProgressBar,
    argTypes: {
        progress: { control: { type: "range", min: 0, max: 100, step: 1 } },
        hasErrors: { control: "boolean" },
        ariaLabel: { control: "text" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { progress: 25 }
};

export const Empty: Story = {
    args: { progress: 0 }
};

export const Complete: Story = {
    args: { progress: 100 }
};

export const WithError: Story = {
    args: { progress: 60, hasErrors: true }
};

// The bar is exposed as role="progressbar", so `ariaLabel` is all a screen
// reader has to say what the percentage refers to.
export const WithCustomAriaLabel: Story = {
    args: { progress: 40, ariaLabel: "Opplasting av vedlegg" }
};
