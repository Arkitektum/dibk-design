import type { Meta, StoryObj } from "@storybook/react-vite";

import Step from "../components/Step";

const meta: Meta<typeof Step> = {
    title: "Primitives/WizardNavigationStep",
    component: Step,
    argTypes: {
        direction: { control: "radio", options: ["vertical", "horizontal"] },
        index: { control: "number" }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

// Step renders an <li>, so it needs a list around it to be valid markup. In an
// application it is normally rendered by WizardNavigation rather than directly.
const render: Story["render"] = (args) => (
    <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        <Step {...args} />
    </ol>
);

export const Active: Story = {
    args: {
        step: { id: "NextProcessCategory", name: "Velg søknadstype" },
        index: 3,
        activeStepId: "NextProcessCategory"
    },
    render
};

export const NotStarted: Story = {
    args: {
        step: { id: "Receipt", name: "Velg søknadssystem" },
        index: 4,
        activeStepId: "NextProcessCategory"
    },
    render
};

export const Finished: Story = {
    args: {
        step: { id: "SignIn", name: "Start", finished: true },
        index: 0,
        activeStepId: "NextProcessCategory"
    },
    render
};

export const HasErrors: Story = {
    args: {
        step: { id: "Import", name: "Importer fil fra ByggSøk", hasErrors: true },
        index: 2,
        activeStepId: "NextProcessCategory"
    },
    render
};

export const Horizontal: Story = {
    args: {
        step: { id: "SignIn", name: "Start", finished: true },
        index: 0,
        activeStepId: "NextProcessCategory",
        direction: "horizontal"
    },
    render
};

// With a `link` the step content is a router link instead of a plain span.
export const WithLink: Story = {
    args: {
        step: {
            id: "AvailableReportees",
            name: "Velg hvem du representerer",
            finished: true,
            link: { pathname: "/AvailableReportees", search: "" }
        },
        index: 1,
        activeStepId: "NextProcessCategory"
    },
    render
};
