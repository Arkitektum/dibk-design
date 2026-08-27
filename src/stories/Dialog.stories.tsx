import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
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

// Static filler for the overflow story. Built once with an id per paragraph, so the
// list is keyed by the item rather than by its position in the map.
const overflowParagraphs = Array.from({ length: 30 }, (_, index) => ({
  id: `overflow-paragraph-${index + 1}`,
  number: index + 1,
}));

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

export const WithFooterAndOverflowingContent: Story = {
  args: {
    title: "Dialog with footer and overflowing content",
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
          onClickOutside={() => setShowDialog(false)}
          footer={
            <>
              <Button color="neutral" onClick={() => setShowDialog(false)}>
                Avbryt
              </Button>
              <Button color="primary" onClick={() => setShowDialog(false)}>
                Lagre
              </Button>
            </>
          }
        >
          {overflowParagraphs.map((paragraph) => (
            <p key={paragraph.id}>
              Paragraph {paragraph.number} — content taller than the dialog
              scrolls within the body while the footer stays visible.
            </p>
          ))}
        </Dialog>
      </>
    );
  },
};
// Interaction test: setFocusToElement used to create a temporary button, focus
// it, then remove it — which hands focus straight back to <body>. Focus was
// never moved into the dialog and the trap never engaged.
export const MovesFocusIntoDialogAndBackOut: Story = {
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
        <Dialog {...args} hidden={!showDialog} onClickOutside={() => setShowDialog(false)}>
          <p>Dialog paragraph</p>
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Show dialog" });

    await userEvent.click(trigger);

    // The dialog is portaled out of the canvas, into #dibk-design-dialog-root.
    const dialog = await waitFor(() => {
      const found = document.querySelector('[role="dialog"]');
      if (!found) throw new Error("dialog did not open");
      return found as HTMLElement;
    });

    expect(dialog.contains(document.activeElement)).toBe(true);

    // The dialog must also be named, or screen readers announce only "dialog".
    const labelledBy = dialog.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy as string)?.textContent).toContain("Dialog title");

    await userEvent.click(within(dialog).getByLabelText("Lukk dialog"));

    await waitFor(() => {
      expect(document.querySelector('[role="dialog"]')).toBeNull();
    });
    expect(document.activeElement).toBe(trigger);
  },
};

// Interaction test: Tab must cycle inside the dialog rather than escaping to
// the page behind the backdrop.
export const TrapsTabInsideDialog: Story = {
  args: {
    title: "Dialog title",
    modal: true,
    onClickOutside: () => {},
  },
  render: function Render(args) {
    const [showDialog, setShowDialog] = useState<boolean>(true);

    return (
      <>
        <Button onClick={() => setShowDialog(true)}>Outside button</Button>
        <Dialog {...args} hidden={!showDialog} onClickOutside={() => setShowDialog(false)}>
          <Button onClick={() => {}}>First inside</Button>
          <Button onClick={() => {}}>Second inside</Button>
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const dialog = await waitFor(() => {
      const found = document.querySelector('[role="dialog"]');
      if (!found) throw new Error("dialog did not open");
      return found as HTMLElement;
    });

    const outside = within(canvasElement).getByRole("button", { name: "Outside button" });

    // Tab through more stops than the dialog contains; focus must never leave.
    for (let press = 0; press < 6; press++) {
      await userEvent.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
      expect(document.activeElement).not.toBe(outside);
    }

    // And the same going backwards.
    for (let press = 0; press < 6; press++) {
      await userEvent.tab({ shift: true });
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
  },
};
