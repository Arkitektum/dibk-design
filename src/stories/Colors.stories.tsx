import type { Meta, StoryObj } from "@storybook/react-vite";
import customThemes from "../data/customTheme";
import styles from "./Colors.module.scss";

const theme = customThemes.dibk;

const prettyName = (name: string) => {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
};

const colorGroups = [
  {
    title: "Backgrounds",
    colors: ["bodyBackground", "defaultBackground", "secondaryBackground"],
  },
  {
    title: "Text & Forms",
    colors: ["defaultText", "headingText", "primaryText", "formElement"],
  },
  {
    title: "Brand",
    colors: [
      "primary",
      "primaryLight",
      "primaryXLight",
      "primaryContrast",
      "secondary",
      "secondaryLight",
      "secondaryXLight",
      "secondaryContrast",
      "border",
      "focus",
    ],
  },
  {
    title: "Status",

    colors: [
      "success",
      "successLight",
      "successXLight",
      "warning",
      "warningLight",
      "warningXLight",
      "error",
      "errorLight",
      "errorXLight",
    ],
  },
];

const meta: Meta = {
  title: "Preset/Colors",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className={styles.page}>
      {colorGroups.map((group) => (
        <section key={group.title} className={styles.group}>
          <h2 className={styles.groupTitle}>{group.title}</h2>
          <div className={styles.grid}>
            {group.colors.map((colorKey) => {
              const colors = theme.colors ?? {};
              const value = colors[colorKey as keyof typeof colors];
              if (!value) return null;
              return (
                <div key={colorKey} className={styles.card}>
                  <div
                    className={styles.swatch}
                    style={{ backgroundColor: value }}
                  />
                  <div className={styles.label}>{prettyName(colorKey)}</div>
                  <div className={styles.value}>{value}</div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  ),
};
