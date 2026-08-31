import type { Meta, StoryObj } from "@storybook/react-vite";
import Theme from "../components/Theme";
import customThemes from "../data/customTheme";

const meta: Meta<typeof Theme> = {
    title: "Primitives/Theme",
    component: Theme,
    argTypes: {
        themeId: { control: "select", options: ["dibk", "arbeidstilsynet"] },
        logoPadding: { control: "text" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        ...customThemes.dibk
    }
};

export const Arbeidstilsynet: Story = {
    args: {
        ...customThemes.arbeidstilsynet
    }
};
