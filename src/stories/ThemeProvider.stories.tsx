import type { Meta, StoryObj } from "@storybook/react-vite";

import InputField from "../components/InputField";
import ThemeProvider from "../components/ThemeProvider";
import customThemes from "../data/customTheme";

const meta: Meta<typeof ThemeProvider> = {
    title: "Primitives/ThemeProvider",
    component: ThemeProvider,
    argTypes: {
        fieldRequirementIndicatorMode: {
            control: "radio",
            options: ["required", "optional", "none"]
        },
        fieldOptionalLabel: { control: "text" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

// Every story is already wrapped in a ThemeProvider by .storybook/preview.tsx,
// and the theme is written to a single global stylesheet — so use the Theme
// toolbar to see `theme` switch colours. The stories below cover the part of
// this component that a nested provider does control: the field requirement
// context it hands to every form control below it.
const fields = (
    <>
        <InputField id="themeProvider-required" label="Kontaktperson" required />
        <InputField id="themeProvider-optional" label="Telefonnummer" />
    </>
);

export const Default: Story = {
    args: {
        theme: customThemes.dibk,
        children: fields
    }
};

// `required` — the default — marks required fields with an asterisk.
export const RequiredIndicatorMode: Story = {
    args: {
        fieldRequirementIndicatorMode: "required",
        children: fields
    }
};

// `optional` inverts it: optional fields are labelled, required ones are bare.
export const OptionalIndicatorMode: Story = {
    args: {
        fieldRequirementIndicatorMode: "optional",
        children: fields
    }
};

export const OptionalIndicatorModeCustomLabel: Story = {
    args: {
        fieldRequirementIndicatorMode: "optional",
        fieldOptionalLabel: "kan stå tomt",
        children: fields
    }
};

// `none` turns the indicators off everywhere below the provider.
export const NoIndicators: Story = {
    args: {
        fieldRequirementIndicatorMode: "none",
        children: fields
    }
};
