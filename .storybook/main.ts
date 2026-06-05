import type { StorybookConfig } from "@storybook/react-vite";
import type { PluginOption } from "vite";
import svgr from "vite-plugin-svgr";

// vite-plugin-dts (inherited from vite.config.ts) is only for the library
// build — it fails the Storybook build when dist/ doesn't exist (e.g. CI).
const isDtsPlugin = (plugin: PluginOption) =>
	!!plugin &&
	typeof plugin === "object" &&
	"name" in plugin &&
	plugin.name.includes("dts");

const withoutDtsPlugin = (plugins: PluginOption[]): PluginOption[] =>
	plugins.flatMap((plugin) =>
		Array.isArray(plugin)
			? withoutDtsPlugin(plugin)
			: isDtsPlugin(plugin)
				? []
				: [plugin],
	);

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
		config.plugins = [
			...withoutDtsPlugin(config.plugins ?? []),
			svgr({ svgrOptions: { exportType: "default" } }),
		];
		return config;
	},

	staticDirs: ["static"],
	typescript: {
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			// "**/*.stories.tsx" is the plugin default; ".storybook/**" skips
			// docgen for preview.tsx — it has no components, and the plugin's
			// file globs can't match dot-directories, so it would otherwise warn
			// about the file not being in the active TypeScript project.
			exclude: ["**/*.stories.tsx", ".storybook/**"],
		},
	},
};

export default config;
