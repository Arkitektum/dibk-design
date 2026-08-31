import type { Meta, StoryObj } from "@storybook/react-vite";
import Paragraph from "../components/Paragraph";

const meta: Meta<typeof Paragraph> = {
    title: "Primitives/Paragraph",
    component: Paragraph,
    argTypes: {
        variant: {
            control: "select",
            options: ["lead", "large", "small"]
        },
        htmlTag: {
            control: "select",
            options: ["p", "div", "span", "blockquote"]
        }
    },
    args: {
        htmlTag: "p"
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;
const render: Story["render"] = (args) => <Paragraph {...args} />;

export const Lead: Story = {
    args: {
        variant: "lead",
        children: "Lead text"
    },
    render
};

export const BodyLarge: Story = {
    args: {
        variant: "large",
        children: "Body Large"
    },
    render
};

export const BodySmall: Story = {
    args: {
        variant: "small",
        children: "Body Small"
    },
    render
};

// `small` is also what you get without a `variant`.
export const NoMargin: Story = {
    args: {
        noMargin: true,
        children: "Paragraph without the trailing margin"
    },
    render
};

// `htmlTag` changes the element without changing the typography — useful inside
// a <p>, where a nested <p> would be invalid markup.
export const AsSpan: Story = {
    args: {
        htmlTag: "span",
        variant: "large",
        children: "Paragraph styling on a span"
    },
    render
};

export const AllVariants: Story = {
    render: () => (
        <>
            <Paragraph variant="lead">Lead text</Paragraph>
            <Paragraph variant="large">Body Large</Paragraph>
            <Paragraph variant="small">Body Small</Paragraph>
        </>
    )
};
