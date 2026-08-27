import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Container from "../components/Container";

const meta: Meta<typeof Container> = {
  title: "Primitives/Container",
  component: Container,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => (
  <Container {...args}>Container with max width</Container>
);

export const Default: Story = {
  args: {},
  render,
};

export const WithMaxWidth: Story = {
  args: {
    maxWidth: "230px",
  },
  render,
};

export const Normal: Story = {
  args: {
    size: "normal",
  },
  render,
};

export const Small: Story = {
  args: {
    size: "small",
  },
  render,
};

// Regression: ThemeProvider emitted --size-* custom properties from a theme's
// `sizes` and no stylesheet read them, so the option silently did nothing.
export const WithThemeContentWidth: Story = {
  render: () => (
    <div style={{ ["--size-content-width" as string]: "400px" }}>
      <Container>Container sized by the theme</Container>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const container = canvasElement.querySelector("[class*='container']");
    expect(container).not.toBeNull();

    // Only applies above the sm breakpoint, which is where the max width lives.
    if (window.innerWidth >= 640) {
      expect(getComputedStyle(container as HTMLElement).maxWidth).toBe("400px");
    }
  },
};
