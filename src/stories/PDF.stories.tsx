import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import dibkLogoUrl from "../assets/svg/dibk-logo.svg";
import PDF, { type PDFProps } from "../components/PDF";

const meta: Meta<typeof PDF> = {
  title: "Example/PDF",
  component: PDF,
  argTypes: {
    signedDocument: { control: "boolean" },
    orientation: { control: "radio", options: ["portrait", "landscape"] },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const render = (args: PDFProps) => {
  const scalingStyles: CSSProperties = args.signedDocument
    ? {
        scale: "0.90251",
        position: "relative",
        top: "-17px",
        marginBottom: "-147px",
      }
    : {
        position: "relative",
        top: "43px",
        marginBottom: "60px",
      };

  return (
    <PDF {...args}>
      <div
        className={[
          "page",
          args.signedDocument ? "signed-document" : "",
          args.orientation === "landscape" ? "landscape" : "",
        ].join(" ")}
      >
        <div className="content-container" style={scalingStyles}>
          {args.children}
        </div>
      </div>
    </PDF>
  );
};

// Shared components omitted for brevity — assume all example content from your post remains the same...

const logoExample = (
  <img
    src={dibkLogoUrl}
    alt="Direktoratet for byggkvalitet"
    className="heading-logo"
  />
);

const h1Example = (
  <h1>
    Heading level 1 example <small>small text example</small>
  </h1>
);

const h2Example = (
  <h2>
    Heading level 2 example <small>small text example</small>
  </h2>
);

const h3Example = <h3>Heading level 3 example</h3>;
const h4Example = <h4>Heading level 4 example</h4>;
const h5Example = <h5>Heading level 5 example</h5>;

const captionExample = <caption>Caption with default size example</caption>;
const captionH1Example = (
  <caption style={{ "--size": 1 } as CSSProperties}>
    Caption with size 1 example
  </caption>
);
const captionH2Example = (
  <caption style={{ "--size": 2 } as CSSProperties}>
    Caption with size 2 example
  </caption>
);
const captionH3Example = (
  <caption style={{ "--size": 3 } as CSSProperties}>
    Caption with size 3 example
  </caption>
);
const captionH4Example = (
  <caption style={{ "--size": 4 } as CSSProperties}>
    Caption with size 4 example
  </caption>
);
const captionH5Example = (
  <caption style={{ "--size": 5 } as CSSProperties}>
    Caption with size 5 example
  </caption>
);

const textParagraphsExample = (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
    <br />
    <span>Text without class</span>{" "}
    <span className="text-bold">Text with class .text-bold</span>{" "}
    <span className="text-italic">Text with class .text-italic</span>{" "}
    <span className="text-red">Text with class .text-red</span>{" "}
    <span className="text-muted">Text with class .text-muted</span>{" "}
    <div>
      <span className="block text-left">.block .text-left</span>
      <span className="block text-center">.block .text-center</span>
      <span className="block text-right">.block .text-right</span>
    </div>
  </p>
);

const textListExample = (
  <>
    <div>
      <b>List item title: </b> List item content
    </div>
    <div>
      <b>List item title: </b> List item content
    </div>
    <div>
      <b>List item title: </b> List item content
    </div>
  </>
);

const descriptionListExample = (
  <>
    <dl style={{ "--title-width": "120px" } as CSSProperties}>
      <dt>List item title:</dt>
      <dd>List item content</dd>
      <dt>List item title:</dt>
      <dd>List item content</dd>
      <dt>List item title:</dt>
      <dd>
        <ul>
          <li>Nested list item 1</li>
          <li>Nested list item 2</li>
        </ul>
      </dd>
    </dl>
  </>
);

const tableExampleContent = (
  <>
    <thead>
      <tr>
        <th style={{ "--width": "200px" } as CSSProperties}>Funksjon</th>
        <th>Table header</th>
        <th>
          Table-
          <br />
          header
        </th>
        <th>Table header</th>
        <th>Table header</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Table data</td>
        <td>Table data</td>
        <td>Table data</td>
        <td className="whitespace-nowrap">
          <div>Table data</div>
        </td>
        <td>-</td>
      </tr>
      {/* More rows... */}
    </tbody>
  </>
);

const tableExample = (
  <table>
    {captionExample}
    {tableExampleContent}
  </table>
);
const tableWithoutBordersExample = (
  <table className="no-border">{tableExampleContent}</table>
);

const gridExample = (
  <div className="grid" style={{ "--columns": "2" } as CSSProperties}>
    <dl style={{ "--display-type": "stacked" } as CSSProperties}>
      <dt>List item title:</dt>
      <dd>List item content</dd>
    </dl>
  </div>
);

const blockquoteExample = <blockquote>Blockquote text</blockquote>;

const checkedCheckboxExample = (
  <div className="checkbox-container">
    <span className="checkbox">X</span>
    <span>Checked checkbox</span>
  </div>
);

const uncheckedCheckboxExample = (
  <div className="checkbox-container">
    <span className="checkbox"></span>
    <span>Unchecked checkbox</span>
  </div>
);

export const Default: Story = {
  args: {
    signedDocument: false,
    orientation: "portrait",
    children: (
      <>
        {logoExample}
        {h1Example}
        {textParagraphsExample}
        {textListExample}
        <section>
          {h2Example}
          {tableExample}
        </section>
        <section>
          {h2Example}
          {gridExample}
        </section>
        <section>
          {h3Example}
          {uncheckedCheckboxExample}
          {checkedCheckboxExample}
        </section>
      </>
    ),
  },
  render,
};

export const Logo: Story = {
  args: { signedDocument: false, children: logoExample },
  render,
};
export const Headings: Story = {
  args: {
    signedDocument: false,
    children: (
      <>
        {h1Example}
        {h2Example}
        {h3Example}
        {h4Example}
        {h5Example}
      </>
    ),
  },
  render,
};
export const Text: Story = {
  args: { signedDocument: false, children: textParagraphsExample },
  render,
};
export const DescriptionList: Story = {
  args: { signedDocument: false, children: descriptionListExample },
  render,
};
export const Grid: Story = {
  args: { signedDocument: false, children: gridExample },
  render,
};
export const Table: Story = {
  args: { signedDocument: false, children: tableExample },
  render,
};
export const TableWithoutBorders: Story = {
  args: { signedDocument: false, children: tableWithoutBordersExample },
  render,
};
export const Caption: Story = {
  args: {
    signedDocument: false,
    children: (
      <>
        <table>
          {captionExample}
          {tableExampleContent}
        </table>
        <table>
          {captionH1Example}
          {tableExampleContent}
        </table>
        <table>
          {captionH2Example}
          {tableExampleContent}
        </table>
        <table>
          {captionH3Example}
          {tableExampleContent}
        </table>
        <table>
          {captionH4Example}
          {tableExampleContent}
        </table>
        <table>
          {captionH5Example}
          {tableExampleContent}
        </table>
      </>
    ),
  },
  render,
};
export const Blockquote: Story = {
  args: { signedDocument: false, children: blockquoteExample },
  render,
};
export const Checkbox: Story = {
  args: {
    signedDocument: false,
    children: (
      <>
        {uncheckedCheckboxExample}
        {checkedCheckboxExample}
      </>
    ),
  },
  render,
};
