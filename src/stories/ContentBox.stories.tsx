import type { Meta, StoryObj } from "@storybook/react-vite";
import ContentBox from "../components/ContentBox";

const meta: Meta<typeof ContentBox> = {
    title: "Primitives/ContentBox",
    component: ContentBox,
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "secondary", "warning", "error", "info", "success"]
        },
        spacing: { control: "radio", options: ["tight", "spacious"] },
        href: { control: "text" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => (
    <ContentBox {...args}>
        <p>Box with content</p>
    </ContentBox>
);

export const DefaultWithoutTitle: Story = {
    args: {
        variant: "secondary"
    },
    render
};

export const Default: Story = {
    args: {
        variant: "secondary",
        title: "Box title"
    },
    render
};

export const Warning: Story = {
    args: {
        variant: "warning",
        title: "Box title"
    },
    render
};

export const ErrorBox: Story = {
    args: {
        variant: "error",
        title: "Box title"
    },
    render
};

export const Info: Story = {
    args: {
        variant: "info",
        title: "Box title"
    },
    render
};

export const Success: Story = {
    args: {
        variant: "success",
        title: "Box title"
    },
    render
};

// `spacing` is `tight` by default; `spacious` gives the box more padding.
export const Spacious: Story = {
    args: {
        variant: "secondary",
        title: "Box title",
        spacing: "spacious"
    },
    render
};

// With `href` the whole box becomes a link and gets an arrow to say so.
export const AsLink: Story = {
    args: {
        variant: "secondary",
        title: "Søk om tillatelse",
        href: "https://dibk.no"
    },
    render
};

// `content` is the string form of `children`, and wins when both are given.
export const WithContentProp: Story = {
    args: {
        variant: "info",
        title: "Box title",
        content: "Body text passed as the content prop"
    },
    render: (args) => <ContentBox {...args} />
};
