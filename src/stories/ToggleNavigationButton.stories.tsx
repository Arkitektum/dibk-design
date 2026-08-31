// stories/ToggleNavigationButton.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import ToggleNavigationButton from "../components/ToggleNavigationButton";

const meta: Meta<typeof ToggleNavigationButton> = {
    title: "Primitives/ToggleNavigationButton",
    component: ToggleNavigationButton,
    argTypes: {
        htmlTag: { control: "select", options: ["button", "a", "div"] },
        isOpen: { control: "boolean" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        showText: "Show",
        hideText: "Hide",
        isOpen: false,
        buttonProps: {
            onClick: fn()
        }
    }
};

// The component is stateless: `isOpen` picks which of the two texts is shown,
// and the surrounding navigation owns the state.
export const Open: Story = {
    args: {
        ...Default.args,
        isOpen: true
    }
};

export const Interactive: Story = {
    args: {
        showText: "Vis meny",
        hideText: "Skjul meny"
    },
    render: function Render(args) {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <ToggleNavigationButton
                {...args}
                isOpen={isOpen}
                buttonProps={{
                    "aria-expanded": isOpen,
                    onClick: () => setIsOpen((open) => !open)
                }}
            />
        );
    }
};
