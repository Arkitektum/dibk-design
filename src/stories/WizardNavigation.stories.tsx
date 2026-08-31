import type { Meta, StoryObj } from "@storybook/react-vite";
import type { WizardNavigationProps } from "../components/WizardNavigation";
import WizardNavigation from "../components/WizardNavigation";

const meta: Meta<typeof WizardNavigation> = {
    title: "Primitives/WizardNavigation",
    component: WizardNavigation,
    argTypes: {
        activeStepId: {
            control: "select",
            options: ["SignIn", "AvailableReportees", "Import", "NextProcessCategory", "Receipt"]
        },
        direction: { control: "radio", options: ["vertical", "horizontal"] }
    },
    tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        steps: {
            SignIn: { id: "SignIn", name: "Start", finished: true, hasErrors: false },
            AvailableReportees: {
                id: "AvailableReportees",
                name: "Velg hvem du representerer",
                finished: true,
                hasErrors: false
            },
            Import: {
                id: "Import",
                name: "Importer fil fra ByggSøk",
                finished: false,
                hasErrors: true
            },
            NextProcessCategory: {
                id: "NextProcessCategory",
                name: "Velg søknadstype",
                finished: false,
                hasErrors: false
            },
            Receipt: {
                id: "Receipt",
                name: "Velg søknadssystem",
                finished: false,
                hasErrors: false
            }
        },
        activeStepId: "NextProcessCategory"
    }
};

// Horizontal steps drop the checkmark and lay the numbers out in a row, for a
// wizard that sits above the form rather than beside it.
export const Horizontal: Story = {
    args: {
        ...Default.args,
        direction: "horizontal"
    }
};

// The <nav> is named from the number of steps unless `aria-label` says
// otherwise — worth setting when a page has more than one navigation landmark.
export const WithCustomAriaLabel: Story = {
    args: {
        ...Default.args,
        "aria-label": "Steg i søknaden"
    }
};

export const WithLinks: Story = {
    args: {
        steps: Object.fromEntries(
            ["SignIn", "AvailableReportees", "Import", "NextProcessCategory", "Receipt"].map((id) => [
                id,
                {
                    id,
                    name: `Step: ${id}`,
                    finished: id === "SignIn" || id === "AvailableReportees",
                    hasErrors: id === "Import",
                    link: { pathname: id, search: window.location.search }
                }
            ])
        ) as WizardNavigationProps["steps"],
        activeStepId: "NextProcessCategory"
    }
};
