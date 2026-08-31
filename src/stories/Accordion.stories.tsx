import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import Accordion from "../components/Accordion";
import Paragraph from "../components/Paragraph";

const meta: Meta<typeof Accordion> = {
    title: "Primitives/Accordion",
    component: Accordion,
    tags: ["autodocs"],
    argTypes: {
        color: { control: "text" },
        bodyColor: { control: "text" },
        expanded: { control: "boolean" },
        noMargin: { control: "boolean" }
    }
};

export default meta;

type Story = StoryObj<typeof meta>;
const render: Story["render"] = (args) => (
    <Accordion {...args}>
        <Paragraph>Accordion content</Paragraph>
    </Accordion>
);
export const Default: Story = {
    args: {
        title: "Accordion title",
        noMargin: false,
        color: "primary"
    },
    render
};

export const Primary: Story = {
    args: {
        color: "primary",
        title: "Accordion title",
        noMargin: false
    },
    render
};

export const Neutral: Story = {
    args: {
        color: "neutral",
        title: "Accordion title",
        noMargin: false
    },
    render
};

export const Secondary: Story = {
    args: {
        color: "secondary",
        title: "Accordion title",
        noMargin: false
    },
    render
};
export const Info: Story = {
    args: {
        color: "info",
        title: "Accordion title",
        noMargin: false
    },
    render
};

export const Success: Story = {
    args: {
        color: "success",
        title: "Accordion title",
        noMargin: false
    },
    render
};

export const CustomHexColor: Story = {
    args: {
        color: "#e8f4f8",
        title: "Accordion with hex color",
        noMargin: false
    },
    render
};

export const DifferentBodyColor: Story = {
    args: {
        color: "primary",
        bodyColor: "neutral",
        title: "Primary title, neutral body",
        noMargin: false
    },
    render
};

export const HexBodyColor: Story = {
    args: {
        color: "primary",
        bodyColor: "#fff3cd",
        title: "Primary title, hex body color",
        noMargin: false
    },
    render
};

// `expanded` sets the open state, and keeps setting it: a later change to the
// prop overrides whatever the reader clicked.
export const Expanded: Story = {
    args: {
        title: "Accordion that starts expanded",
        expanded: true
    },
    render
};

export const NoMargin: Story = {
    args: {
        title: "Accordion without margin",
        noMargin: true
    },
    render
};

// The panel is a plain button, so `buttonProps` is where its attributes go.
export const WithButtonProps: Story = {
    args: {
        title: "Accordion with extra button attributes",
        buttonProps: { "aria-describedby": "accordion-story-hint" }
    },
    render: (args) => (
        <>
            <Accordion {...args}>
                <Paragraph>Accordion content</Paragraph>
            </Accordion>
            <Paragraph id="accordion-story-hint">Description referenced by the panel button</Paragraph>
        </>
    )
};

// Driving `expanded` from the outside — `onToggleExpand` reports the click, and
// the parent decides what the new state is. Here only one panel stays open.
export const Controlled: Story = {
    render: function Render() {
        const [openIndex, setOpenIndex] = useState<number | null>(0);

        return (
            <>
                {["Første", "Andre", "Tredje"].map((title, index) => (
                    <Accordion
                        key={title}
                        title={title}
                        expanded={openIndex === index}
                        onToggleExpand={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        <Paragraph>Content for {title.toLowerCase()}</Paragraph>
                    </Accordion>
                ))}
            </>
        );
    }
};
