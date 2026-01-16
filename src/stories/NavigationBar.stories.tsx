import type { Meta, StoryObj } from "@storybook/react-vite";

import NavigationBar from "../components/NavigationBar";

const meta: Meta<typeof NavigationBar> = {
  title: "Primitives/NavigationBar",
  component: NavigationBar,
  argTypes: {
    theme: {
      control: "select",
      options: ["dibk", "arbeidstilsynet"],
      defaultValue: "dibk",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    theme: "dibk",
  },
};

export const WithLogoLink: Story = {
  args: {
    theme: "dibk",
    logoLink: "https://dibk.no/",
    logoLinkTitle: "Gå til forside",
    openLogoLinkInNewTab: true,
  },
};

export const WithSecondaryColor: Story = {
  args: {
    theme: "dibk",
    color: "secondary",
  },
};
