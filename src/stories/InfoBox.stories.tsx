import type { Meta, StoryObj } from "@storybook/react-vite";
import InfoBox from "../components/InfoBox";
import { HelpIcon } from "../icons";

const meta: Meta<typeof InfoBox> = {
    title: "Primitives/InfoBox",
    component: InfoBox,
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "secondary", "warning", "error", "info", "success"]
        },
        fullScreen: { control: "boolean" },

        hideIcon: { control: "boolean" },
        noBorder: { control: "boolean" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;
const render: Story["render"] = (args) => (
    <InfoBox {...args}>
        <ul>
            <li>Du må krysse av for at foretaket erklærer ansvar i henhold til plan- og bygningsloven.</li>
            <li>Du må fylle ut mobil- eller telefonnummeret til kontaktpersonen.</li>
        </ul>
    </InfoBox>
);

export const Default: Story = {
    args: {
        variant: "default",
        title: "Du kan ikke signere erklæringen før alle opplysningene er fylt ut:"
    },
    render
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        title: "Du kan ikke signere erklæringen før alle opplysningene er fylt ut:"
    },
    render
};

export const Warning: Story = {
    args: {
        variant: "warning",
        title: "Vennligst kontroller skjemaet",
        children: "Prøv en annen adresse, undersøk om det er skrivefeil eller søk på noe annet."
    },
    render
};

export const ErrorVariant: Story = {
    name: "Error",
    args: {
        variant: "error",
        title: "Det oppstod en feil",
        children: "Vi klarte ikke å sende inn skjemaet. Prøv igjen om litt."
    },
    render
};

export const Info: Story = {
    args: {
        variant: "info",
        title: "Tips",
        children: "Du kan lagre utkastet og fortsette senere."
    },
    render
};

export const Success: Story = {
    args: {
        variant: "success",
        title: "Alt er klart",
        children: "Søknaden ble sendt inn uten feil."
    },
    render
};

export const NoBorder: Story = {
    args: {
        variant: "secondary",
        noBorder: true,
        title: "Ingen kantlinje",
        children: "Denne info-boksen vises uten kantlinje."
    },
    render
};

// Each variant brings its own icon; `hideIcon` drops it.
export const HideIcon: Story = {
    args: {
        variant: "info",
        hideIcon: true,
        title: "Uten ikon",
        children: "Denne info-boksen vises uten ikon."
    },
    render
};

// `icon` replaces the variant's icon with any node.
export const CustomIcon: Story = {
    args: {
        variant: "info",
        icon: <HelpIcon aria-hidden="true" />,
        title: "Egendefinert ikon",
        children: "Denne info-boksen bruker et annet ikon."
    },
    render
};

// The box animates in by default; `noAnimation` is for boxes that are already
// on screen at first paint, where the animation would just be noise.
export const NoAnimation: Story = {
    args: {
        variant: "warning",
        noAnimation: true,
        title: "Uten animasjon",
        children: "Denne info-boksen vises uten inn-animasjon."
    },
    render
};

// `fullScreen` stretches the box across the viewport, for a page-level message.
export const FullScreen: Story = {
    args: {
        variant: "error",
        fullScreen: true,
        title: "Tjenesten er utilgjengelig",
        children: "Prøv igjen om litt."
    },
    render
};
