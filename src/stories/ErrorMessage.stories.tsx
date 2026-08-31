import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import ErrorMessage from "../components/ErrorMessage";

const meta: Meta<typeof ErrorMessage> = {
    title: "Primitives/ErrorMessage",
    component: ErrorMessage,
    argTypes: {
        content: { control: "text" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        content: "Du må fylle ut dette feltet"
    }
};

export const WithId: Story = {
    args: {
        id: "errorMessage-1",
        content: "Feltet må fylles ut. Bruk id-en sammen med aria-describedby."
    }
};

export const LongContent: Story = {
    args: {
        content:
            "Du må krysse av for at foretaket erklærer ansvar i henhold til plan- og bygningsloven, og du må fylle ut mobil- eller telefonnummeret til kontaktpersonen."
    }
};

export const RichContent: Story = {
    args: {
        content: (
            <span>
                Fødselsnummeret er ugyldig. Se <a href="https://dibk.no">veiledningen om fødselsnummer</a>.
            </span>
        )
    }
};

// With no content there is no icon and no text — but the aria-live region
// itself stays in the DOM, empty and taking up no space.
//
// Regression: it used to return null, so the region was inserted at the same
// moment as its own text. Screen readers announce *changes inside* a region
// they are already watching, so an error appearing while focus was elsewhere
// — after a failed submit, typically — was never announced.
export const EmptyContent: Story = {
    args: {
        content: ""
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        const region = canvasElement.querySelector("[aria-live]");

        expect(region).not.toBeNull();
        expect(region?.textContent).toBe("");
        expect((region as HTMLElement).getBoundingClientRect().height).toBe(0);
    }
};

// Regression: the icon used to be an <img src>, which loads the file as its own
// document — so its fill="currentColor" resolved to black and the icon stayed
// black however `--color-error` was themed. Inlined, it follows the text.
export const IconFollowsTheErrorColor: Story = {
    args: {
        content: "Feilmelding med overstyrt farge"
    },
    render: (args) => (
        <div style={{ ["--color-error" as string]: "rgb(0, 0, 255)" }}>
            <ErrorMessage {...args} />
        </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        const icon = canvasElement.querySelector("svg");
        expect(icon).not.toBeNull();
        expect(getComputedStyle(icon as SVGSVGElement).color).toBe("rgb(0, 0, 255)");
    }
};
