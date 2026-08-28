import type { Meta, StoryObj } from "@storybook/react-vite";

import NavigationBar from "../components/NavigationBar";

const meta: Meta<typeof NavigationBar> = {
    title: "Primitives/NavigationBar",
    component: NavigationBar,
    argTypes: {
        themeId: {
            control: "select",
            options: ["dibk", "arbeidstilsynet"],
            defaultValue: "dibk"
        },
        color: {
            control: "radio",
            options: ["secondary", "neutral"],
            defaultValue: "neutral"
        }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        themeId: "dibk",
        color: "neutral"
    }
};

export const WithLinks: Story = {
    args: {
        themeId: "dibk",
        color: "neutral",
        links: [
            { name: "Oversikt", href: "/oversikt" },
            { name: "Administrasjon", href: "/administrasjon" }
        ]
    }
};

export const WithSecondaryColor: Story = {
    args: {
        themeId: "dibk",
        color: "secondary",
        links: [
            { name: "Oversikt", href: "/oversikt" },
            { name: "Administrasjon", href: "/administrasjon" }
        ]
    }
};

// The skip link is invisible until focused, so tab into the story to see it.
export const WithSkipLink: Story = {
    args: {
        themeId: "dibk",
        mainContentId: "main-content",
        links: [
            { name: "Oversikt", href: "/oversikt" },
            { name: "Administrasjon", href: "/administrasjon" }
        ]
    },
    render: (args) => (
        <>
            <NavigationBar {...args} />
            <main id="main-content">Hovedinnhold</main>
        </>
    )
};
