import type { StorybookConfig } from "@storybook/react-vite";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
	stories: ["../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-onboarding",
		"@storybook/addon-docs",
		"@storybook/addon-a11y",
		"@storybook/addon-links",
		"@storybook/addon-vitest",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},

	viteFinal: async (config) => {
		// vite-plugin-dts (inherited from vite.config.ts) is only for the library
		// build — it fails the Storybook build when dist/ doesn't exist (e.g. CI).
		const plugins = (config.plugins ?? [])
			.flat(Infinity)
			.filter(
				(plugin) =>
					!(
						plugin &&
						typeof plugin === "object" &&
						"name" in plugin &&
						plugin.name.includes("dts")
					),
			);
		config.plugins = [
			...plugins,
			svgr({ svgrOptions: { exportType: "default" } }),
		];
		return config;
	},

	staticDirs: ["static"],
	typescript: { reactDocgen: "react-docgen-typescript" },
};

export default config;
