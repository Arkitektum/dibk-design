// stories/LoadingAnimation.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";

import LoadingAnimation from "../components/LoadingAnimation";

const meta: Meta<typeof LoadingAnimation> = {
    title: "Primitives/LoadingAnimation",
    component: LoadingAnimation,
    argTypes: {
        ariaLabel: { control: "text" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

// The animation is exposed as role="img", so `ariaLabel` is the only thing a
// screen reader announces — say what is loading when the default is too vague.
export const WithCustomAriaLabel: Story = {
    args: {
        ariaLabel: "Laster inn søknader"
    }
};
