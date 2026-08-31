// stories/Label.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";

import Label from "../components/Label";

const meta: Meta<typeof Label> = {
    title: "Primitives/Label",
    component: Label,
    argTypes: {},
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => <Label {...args} />;

export const Default: Story = {
    args: {
        children: "Label"
    },
    render
};

export const Inline: Story = {
    args: {
        children: "Inline label",
        inline: true
    },
    render
};

export const LabelStyledSpan: Story = {
    args: {
        children: "Label styled span",
        htmlTag: "span"
    },
    render
};

export const WithSubLabel: Story = {
    args: {
        children: "Label",
        subLabel: "Støtter PDF, PNG og JPG. Maks 15MB."
    },
    render
};

// `htmlFor` is the usual way in: the label names the control it points at, so
// clicking it moves focus there.
export const WithHtmlFor: Story = {
    args: {
        children: "Fødselsnummer",
        htmlFor: "label-story-input"
    },
    render: (args) => (
        <>
            <Label {...args} />
            <input id="label-story-input" type="text" />
        </>
    )
};

// `srOnly` keeps the label in the accessibility tree but takes it off screen —
// for controls whose purpose is already clear visually.
export const ScreenReaderOnly: Story = {
    args: {
        children: "Label only available to screen readers",
        srOnly: true,
        htmlFor: "label-story-sronly-input"
    },
    render: (args) => (
        <>
            <Label {...args} />
            <input id="label-story-sronly-input" type="search" placeholder="Søk" />
        </>
    )
};

// `normalCursor` drops the pointer cursor, for a label that is not clickable.
export const NormalCursor: Story = {
    args: {
        children: "Label with a normal cursor",
        normalCursor: true
    },
    render
};
