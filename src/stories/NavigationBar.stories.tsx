import type { Meta, StoryObj } from "@storybook/react-vite";

import NavigationBar from "../components/NavigationBar";
import customThemes from "../data/customTheme";

const meta: Meta<typeof NavigationBar> = {
  title: "Example/NavigationBar",
  component: NavigationBar,
  argTypes: {
    compact: {
      control: "boolean",
      defaultValue: false,
    },

    theme: {
      control: "select",
      options: ["dibk", "arbeidstilsynet"],
      mapping: customThemes,
      defaultValue: "dibk",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    theme: customThemes.dibk,
  },
};

export const WithLogoLink: Story = {
  args: {
    theme: customThemes.dibk,
    logoLink: "https://dibk.no/",
    logoLinkTitle: "Gå til forside",
    openLogoLinkInNewTab: true,
  },
};

export const WithSecondaryColor: Story = {
  args: {
    theme: customThemes.dibk,
    color: "secondary",
  },
};
