import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import Select, { type MultipleSelectProps, type SingleSelectProps } from "../components/Select";

type SelectArgs = SingleSelectProps | MultipleSelectProps;

const meta: Meta<SelectArgs> = {
    title: "Primitives/Select",
    component: Select,
    tags: ["autodocs"],
    decorators: [
        (Story, context) => {
            const isMultiple = Boolean((context.args as SelectArgs).multiple);
            const singleArgs = context.args as SingleSelectProps;
            const multiArgs = context.args as MultipleSelectProps;

            const [singleValue, setSingleValue] = useState<string | number | undefined>(singleArgs.value ?? singleArgs.defaultValue);
            const [multiValue, setMultiValue] = useState<(string | number)[] | undefined>(multiArgs.value ?? multiArgs.defaultValue);

            if (isMultiple) {
                return (
                    <Story
                        {...context}
                        args={{
                            ...multiArgs,
                            value: multiValue,
                            onChange: setMultiValue as (value: (string | number)[]) => void
                        }}
                    />
                );
            }
            return (
                <Story
                    {...context}
                    args={{
                        ...singleArgs,
                        value: singleValue,
                        onChange: setSingleValue as (value: string | number) => void
                    }}
                />
            );
        }
    ]
};

export default meta;

// Not StoryObj<typeof meta>: SelectArgs is a discriminated union, and resolving
// it against the meta collapses every story's args to never.
type Story = StoryObj<SelectArgs>;

const options = ["Option 1", "Option 2", { key: "Option 3", value: "value 3" }];

export const Default: Story = {
    args: {
        id: "select1",
        options
    }
};
export const WithLabel: Story = {
    args: {
        id: "select2",
        label: "Select with label",
        options
    }
};
export const WithSelectedValue: Story = {
    args: {
        id: "select3",
        label: "Select with label and selected value",
        value: "value 3",
        options
    }
};
export const WithDefaultValue: Story = {
    args: {
        id: "select4",
        label: "Select with label and default value",
        defaultValue: "value 3",
        options
    }
};
export const WithError: Story = {
    args: {
        id: "select5",
        label: "Select with error",
        value: "value 3",
        hasErrors: true,
        errorMessage: "Wrong value selected",
        options
    }
};
export const WithLinkInLabel: Story = {
    args: {
        id: "select6",
        label: [
            "Select with ",
            <a key="link" href="#select6">
                a documentation link
            </a>,
            " in label"
        ],
        value: "value 3",
        options
    }
};
export const Disabled: Story = {
    args: {
        id: "select7",
        disabled: true,
        label: "Disabled select",
        value: "value 3",
        options
    }
};
export const Required: Story = {
    args: {
        id: "select8",
        required: true,
        label: "Required select",
        options
    }
};

export const RequirementIndicators: Story = {
    render: () => (
        <div className="flex flex-col gap-4 max-w-md">
            <Select
                id="select-indicator-required"
                label="Required mode (required=true)"
                required
                requirementIndicatorMode="required"
                options={options}
                onChange={() => {}}
            />
            <Select
                id="select-indicator-optional"
                label="Optional mode (required=false)"
                required={false}
                requirementIndicatorMode="optional"
                options={options}
                onChange={() => {}}
            />
            <Select
                id="select-indicator-none"
                label="None mode (required=true)"
                required
                requirementIndicatorMode="none"
                options={options}
                onChange={() => {}}
            />
        </div>
    )
};
export const WithPlaceholder: Story = {
    args: {
        id: "select9",
        label: "With placeholder",
        placeholder: "Select from list",
        placeholderValue: "notSelected",
        value: "notSelected",
        options
    }
};
export const WithCustomWidth: Story = {
    args: {
        id: "select13",
        label: "Custom width",
        width: "250px",
        options
    }
};
export const Multiple: Story = {
    args: {
        id: "select15",
        label: "Multiple select",
        multiple: true,
        options
    }
};
export const MultipleWithSelectedValue: Story = {
    args: {
        id: "select16",
        label: "Multiple selected",
        multiple: true,
        value: ["option 1", "value 3"],
        options
    }
};
export const MultipleWithDefaultValue: Story = {
    args: {
        id: "select17",
        label: "Multiple default",
        multiple: true,
        defaultValue: ["option 1", "value 3"],
        options
    }
};

export const WithCustomBackgroundColor: Story = {
    args: {
        id: "select18",
        label: "Custom background color",
        backgroundColor: "chartreuse",
        options
    }
};

export const WithActionButton: Story = {
    args: {
        id: "select19",
        label: "Select with action button",
        options,
        actionButtonContent: "Apply",
        actionButtonOnClick: fn()
    }
};

export const Clearable: Story = {
    args: {
        id: "select24",
        label: "Clearable with placeholder value",
        placeholder: "Select from list",
        placeholderValue: "notSelected",
        isClearable: true,
        value: "value 3",
        options
    }
};

// Regression: placeholderValue was honoured inbound but never emitted, so a
// consumer using a sentinel had no way back to "nothing selected".
export const ClearingEmitsPlaceholderValue: Story = {
    render: function Render() {
        const [value, setValue] = useState<string | number>("value 3");
        const [emitted, setEmitted] = useState("(nothing yet)");

        return (
            <div>
                <Select
                    id="select-clear-emits"
                    label="Clearable"
                    placeholder="Select from list"
                    placeholderValue="notSelected"
                    isClearable
                    options={options}
                    value={value}
                    onChange={(next) => {
                        setValue(next);
                        setEmitted(String(next));
                    }}
                />
                <p data-testid="emitted">{emitted}</p>
            </div>
        );
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);

        await userEvent.click(canvas.getByLabelText("Clearable"));
        await userEvent.keyboard("{Backspace}");

        expect(canvas.getByTestId("emitted")).toHaveTextContent("notSelected");
        expect(canvas.getByText("Select from list")).toBeInTheDocument();
    }
};

// The arrow sits outside react-select's control, so the open state is carried by a
// class rather than by :has(.reactSelect__control--menu-is-open). A test is what
// stops that class silently coming unwired.
export const ArrowFlipsWhenTheMenuOpens: Story = {
    args: {
        id: "select-arrow-flip",
        label: "Arrow flips on open",
        options
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const arrow = canvasElement.querySelector("[class*='selectListArrow']");
        expect(arrow).not.toBeNull();

        const rotation = () => getComputedStyle(arrow as HTMLElement, "::after").transform;
        const closed = rotation();

        await userEvent.click(canvas.getByLabelText("Arrow flips on open"));

        await waitFor(() => {
            expect((arrow as HTMLElement).className).toContain("menuIsOpen");
        });
        await waitFor(() => {
            expect(rotation()).not.toBe(closed);
        });
    }
};

// A value matching no option falls back to rendering as its own label, which reads
// as a mangled option name rather than an error. The warning is the only signal, so
// it needs a test -- and it cannot be a Node one, because that suite renders with
// renderToStaticMarkup, which never runs effects.
//
// The value starts matched and is changed to an unmatched one from inside the play
// function. Spying from play is otherwise too late: the effect has already run by
// the time the story has mounted.
export const WarnsWhenAValueMatchesNoOption: Story = {
    render: function Render() {
        const [value, setValue] = useState<string | number>("Option 1");

        return (
            <div>
                <Select id="select-warn" label="Warns on an unmatched value" options={options} value={value} onChange={setValue} />
                <button type="button" data-testid="set-unmatched" onClick={() => setValue("no-such-option")}>
                    Set an unmatched value
                </button>
            </div>
        );
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const warnings: string[] = [];
        const originalWarn = console.warn;
        console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));

        try {
            expect(warnings).toEqual([]);

            await userEvent.click(canvas.getByTestId("set-unmatched"));

            await waitFor(() => {
                expect(warnings.some((warning) => warning.includes("matches no option"))).toBe(true);
            });
            expect(warnings.some((warning) => warning.includes("no-such-option"))).toBe(true);
        } finally {
            console.warn = originalWarn;
        }
    }
};

// The warning has to stay quiet while options load, or every asynchronously
// populated Select warns on its first render.
export const DoesNotWarnWhileOptionsAreEmpty: Story = {
    render: function Render() {
        const [loadedOptions, setLoadedOptions] = useState<typeof options>([]);

        return (
            <div>
                <Select id="select-loading" label="Options still loading" options={loadedOptions} value="Option 1" onChange={() => {}} />
                <button type="button" data-testid="load-options" onClick={() => setLoadedOptions(options)}>
                    Load the options
                </button>
            </div>
        );
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const warnings: string[] = [];
        const originalWarn = console.warn;
        console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));

        try {
            await userEvent.click(canvas.getByTestId("load-options"));

            await waitFor(() => {
                expect(canvas.getByText("Option 1")).toBeInTheDocument();
            });
            expect(warnings.filter((warning) => warning.includes("matches no option"))).toEqual([]);
        } finally {
            console.warn = originalWarn;
        }
    }
};

export const ContentOnly: Story = {
    args: {
        id: "select20",
        label: "Content only (raw value)",
        contentOnly: true,
        value: "value 3",
        options
    }
};

export const ContentOnlyWithKeyAsContent: Story = {
    args: {
        id: "select21",
        label: "Content only (option key)",
        contentOnly: true,
        keyAsContent: true,
        value: "value 3",
        options
    }
};

export const ContentOnlyWithDefaultContent: Story = {
    args: {
        id: "select22",
        label: "Content only (nothing selected)",
        contentOnly: true,
        defaultContent: "Ikke angitt",
        options
    }
};

export const ContentOnlyMultiple: Story = {
    args: {
        id: "select23",
        label: "Content only (multiple)",
        contentOnly: true,
        keyAsContent: true,
        multiple: true,
        value: ["Option 1", "value 3"],
        options
    }
};
