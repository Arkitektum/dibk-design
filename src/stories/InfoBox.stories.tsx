import type { Meta, StoryObj } from "@storybook/react-vite";
import InfoBox from "../components/InfoBox";

const meta: Meta<typeof InfoBox> = {
  title: "Primitives/InfoBox",
  component: InfoBox,
  argTypes: {
    variant: {
      control: "select",
      options: ["secondary", "warning", "error", "info", "success"],
    },
    fullScreen: { control: "boolean" },

    hideIcon: { control: "boolean" },
    noBorder: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;
const render: Story["render"] = (args) => (
  <InfoBox {...args}>
    <ul>
      <li>
        Du må krysse av for at foretaket erklærer ansvar i henhold til plan- og
        bygningsloven.
      </li>
      <li>Du må fylle ut mobil- eller telefonnummeret til kontaktpersonen.</li>
    </ul>
  </InfoBox>
);

export const Default: Story = {
  args: {
    variant: "secondary",
    title: "Du kan ikke signere erklæringen før alle opplysningene er fylt ut:",
  },
  render,
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Vennligst kontroller skjemaet",
    children:
      "Prøv en annen adresse, undersøk om det er skrivefeil eller søk på noe annet.",
  },
  render,
};

export const ErrorBox: Story = {
  args: {
    variant: "error",
    title: "Det oppstod en feil",
    children: "Vi klarte ikke å sende inn skjemaet. Prøv igjen om litt.",
  },
  render,
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Tips",
    children: "Du kan lagre utkastet og fortsette senere.",
  },
  render,
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Alt er klart",
    children: "Søknaden ble sendt inn uten feil.",
  },
  render,
};

export const NoBorder: Story = {
  args: {
    variant: "secondary",
    noBorder: true,
    title: "Ingen kantlinje",
    children: "Denne info-boksen vises uten kantlinje.",
  },
  render,
};
