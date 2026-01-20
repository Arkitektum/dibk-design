import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Primitives/Dialog",
  component: Dialog,
  tags: ["autodocs"], // <- add this
  argTypes: {
    attachTo: {
      control: "select",
      options: ["None", "Left", "Right"],
      mapping: { None: null, Left: "left", Right: "right" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    title: "Dialog title",

    modal: true,
    onClickOutside: () => {},
  },
  render: function Render(args) {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    return (
      <>
        <Button onClick={() => setShowDialog(true)}>Show dialog</Button>
        <Dialog
          {...args}
          hidden={!showDialog}
          onClickOutside={() => {
            setShowDialog(false);
            (args.onClickOutside as () => void)();
          }}
        >
          <p>Dialog paragraph</p>
        </Dialog>
      </>
    );
  },
};
