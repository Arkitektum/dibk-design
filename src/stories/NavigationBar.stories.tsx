import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import NavigationBar from "../components/NavigationBar";

const meta: Meta<typeof NavigationBar> = {
    title: "Primitives/NavigationBar",
    component: NavigationBar,
    argTypes: {
        themeId: {
            control: "select",
            options: ["dibk", "arbeidstilsynet"]
        }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        themeId: "dibk"
    }
};

export const WithLinks: Story = {
    args: {
        themeId: "dibk",
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
        links: [
            { name: "Oversikt", href: "/oversikt" },
            { name: "Administrasjon", href: "/administrasjon" }
        ]
    }
};

const submenuLinks = [
    { name: "Oversikt", href: "/oversikt" },
    {
        name: "Administrasjon",
        href: "/administrasjon",
        listItems: [
            { name: "Brukere", href: "/administrasjon/brukere" },
            { name: "Roller", href: "/administrasjon/roller" },
            { name: "Tilganger", href: "/administrasjon/tilganger" }
        ]
    },
    {
        name: "Rapporter",
        href: "",
        listItems: [
            { name: "Månedsrapport", href: "/rapporter/maned" },
            {
                name: "Arkiv",
                href: "",
                listItems: [
                    { name: "2025", href: "/rapporter/arkiv/2025" },
                    { name: "2024", href: "/rapporter/arkiv/2024" }
                ]
            }
        ]
    }
];

// An item with `listItems` gets a button that discloses them. "Administrasjon"
// keeps its own link and puts the toggle beside it; "Rapporter" has no href of
// its own, so the toggle is the item. Deeper levels are listed inside the open
// panel rather than flying out sideways.
export const WithSubmenus: Story = {
    args: {
        themeId: "dibk",
        links: submenuLinks
    }
};

// Interaction test: the submenu was accepted by the type and never rendered, so
// this pins both that it opens and that it can be dismissed without a mouse.
export const SubmenuOpensAndClosesOnEscape: Story = {
    args: {
        themeId: "dibk",
        links: submenuLinks
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: "Vis undermeny for Administrasjon" });

        // Closed to begin with: display:none keeps the panel out of the
        // accessibility tree, so its links cannot be found by role.
        expect(trigger.getAttribute("aria-expanded")).toBe("false");
        expect(canvas.queryByRole("link", { name: "Brukere" })).toBeNull();

        await userEvent.click(trigger);

        expect(trigger.getAttribute("aria-expanded")).toBe("true");
        expect(canvas.getByRole("link", { name: "Brukere" })).toBeVisible();

        // Escape closes it and puts focus back on the control that opened it,
        // rather than dropping focus on <body>.
        await userEvent.keyboard("{Escape}");

        expect(trigger.getAttribute("aria-expanded")).toBe("false");
        expect(document.activeElement).toBe(trigger);
    }
};

// Only one panel is open at a time, so opening the second closes the first.
export const OpeningOneSubmenuClosesTheOther: Story = {
    args: {
        themeId: "dibk",
        links: submenuLinks
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const first = canvas.getByRole("button", { name: "Vis undermeny for Administrasjon" });
        const second = canvas.getByRole("button", { name: "Rapporter" });

        await userEvent.click(first);
        expect(first.getAttribute("aria-expanded")).toBe("true");

        await userEvent.click(second);

        expect(second.getAttribute("aria-expanded")).toBe("true");
        expect(first.getAttribute("aria-expanded")).toBe("false");
    }
};
