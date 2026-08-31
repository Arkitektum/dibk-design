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

// The skip link's visible text, for an application that is not in Norwegian or
// wants different wording.
export const WithCustomSkipLinkText: Story = {
    args: {
        themeId: "dibk",
        mainContentId: "main-content",
        mainContentLinkText: "Skip to main content"
    },
    render: (args) => (
        <>
            <NavigationBar {...args} />
            <main id="main-content">Main content</main>
        </>
    )
};

// The logo links to dibk.no by default. `logoLinkTitle` names that link, and
// with a title the logo image is marked decorative so it is not announced twice.
export const WithCustomLogoLink: Story = {
    args: {
        themeId: "dibk",
        logoLink: "/",
        logoLinkTitle: "Til forsiden",
        openLogoLinkInNewTab: false
    }
};

export const WithLogoLinkInNewTab: Story = {
    args: {
        themeId: "dibk",
        logoLink: "https://www.dibk.no/",
        logoLinkTitle: "dibk.no (åpnes i ny fane)",
        openLogoLinkInNewTab: true
    }
};

// `children` are placed after the links, for whatever the application needs on
// the right-hand side — a user menu, a log-out button, a language switch.
export const WithChildren: Story = {
    args: {
        themeId: "dibk",
        links: [
            { name: "Oversikt", href: "/oversikt" },
            { name: "Administrasjon", href: "/administrasjon" }
        ],
        children: <span>Innlogget som Ola Nordmann</span>
    }
};

export const Arbeidstilsynet: Story = {
    args: {
        themeId: "arbeidstilsynet",
        color: "neutral",
        links: [
            { name: "Oversikt", href: "/oversikt" },
            { name: "Administrasjon", href: "/administrasjon" }
        ]
    }
};
