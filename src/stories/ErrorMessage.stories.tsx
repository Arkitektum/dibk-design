import type { Meta, StoryObj } from "@storybook/react-vite";

import ErrorMessage from "../components/ErrorMessage";

const meta: Meta<typeof ErrorMessage> = {
  title: "Primitives/ErrorMessage",
  component: ErrorMessage,
  argTypes: {
    content: { control: "text" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "Du må fylle ut dette feltet",
  },
};

export const WithId: Story = {
  args: {
    id: "errorMessage-1",
    content: "Feltet må fylles ut. Bruk id-en sammen med aria-describedby.",
  },
};

export const LongContent: Story = {
  args: {
    content:
      "Du må krysse av for at foretaket erklærer ansvar i henhold til plan- og bygningsloven, og du må fylle ut mobil- eller telefonnummeret til kontaktpersonen.",
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <span>
        Fødselsnummeret er ugyldig. Se{" "}
        <a href="https://dibk.no">veiledningen om fødselsnummer</a>.
      </span>
    ),
  },
};

// Nothing is rendered when the content is empty — the component returns null
// rather than an empty element with an error icon.
export const EmptyContent: Story = {
  args: {
    content: "",
  },
};
