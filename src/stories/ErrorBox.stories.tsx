import type { Meta, StoryObj } from "@storybook/react-vite";

import ErrorBox from "../components/ErrorBox";

const meta: Meta<typeof ErrorBox> = {
    title: "Primitives/ErrorBox",
    component: ErrorBox,
    argTypes: {
        type: { control: "radio", options: ["warning", "error"] },
        fullScreen: { control: "boolean" },
        noBorder: { control: "boolean" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Warning: Story = {
    args: {
        type: "warning",
        title: "Vennligst kontroller skjemaet",
        children: "Prøv en annen adresse, undersøk om det er skrivefeil eller søk på noe annet."
    }
};

export const ErrorType: Story = {
    name: "Error",
    args: {
        type: "error",
        title: "Det oppstod en feil",
        children: "Vi klarte ikke å sende inn skjemaet. Prøv igjen om litt."
    }
};

export const WithList: Story = {
    args: {
        type: "error",
        title: "Du kan ikke signere erklæringen før alle opplysningene er fylt ut:",
        children: (
            <ul>
                <li>Du må krysse av for at foretaket erklærer ansvar i henhold til plan- og bygningsloven.</li>
                <li>Du må fylle ut mobil- eller telefonnummeret til kontaktpersonen.</li>
            </ul>
        )
    }
};

export const NoBorder: Story = {
    args: {
        type: "warning",
        noBorder: true,
        title: "Ingen kantlinje",
        children: "Denne feilboksen vises uten kantlinje."
    }
};
