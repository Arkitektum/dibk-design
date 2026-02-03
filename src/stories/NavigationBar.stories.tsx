import type { Meta, StoryObj } from "@storybook/react-vite";

import NavigationBar from "../components/NavigationBar";

const meta: Meta<typeof NavigationBar> = {
	title: "Primitives/NavigationBar",
	component: NavigationBar,
	argTypes: {
		theme: {
			control: "select",
			options: ["dibk", "arbeidstilsynet"],
			defaultValue: "dibk",
		},
		color: {
			control: "radio",
			options: ["secondary", "neutral"],
			defaultValue: "neutral",
		},
	},
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		theme: "dibk",
		color: "neutral",
	},
};

export const WithLinks: Story = {
	args: {
		theme: "dibk",
		color: "neutral",
		links: [
			{ name: "Oversikt", href: "/oversikt" },
			{ name: "Administrasjon", href: "/administrasjon" },
		],
	},
};

export const WithSecondaryColor: Story = {
	args: {
		theme: "dibk",
		color: "secondary",
		links: [
			{ name: "Oversikt", href: "/oversikt" },
			{ name: "Administrasjon", href: "/administrasjon" },
		],
	},
};
