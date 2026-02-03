import style from "./ContentBox.module.scss";
import Header from "./Header";
import type { InfoBoxVariant } from "./InfoBox";

export interface ContentBoxProps {
  title?: string | React.ReactNode;
  content?: string;
  children?: React.ReactNode;
  variant?: InfoBoxVariant;
  spacing?: "tight" | "spacious";
  href?: string | null;
}

const ContentBox = ({
  title = "",
  content = "",
  children,
  variant = "secondary",
  spacing = "tight",
  href = null,
}: ContentBoxProps) => {
  const colorClass = style[variant] || "";
  const spacingClass = style[spacing] || "";
  const linkClass = href ? style.link : "";
  const className =
    `${style.contentBox} ${colorClass} ${spacingClass} ${linkClass}`.trim();
  const bodyContent = content?.length ? content : children;

  const Inner = (
    <>
      {title ? (
        typeof title === "string" ? (
          <Header size={2} content={title} />
        ) : (
          title
        )
      ) : null}
      <div className={style.content}>{bodyContent}</div>
    </>
  );

  return href ? (
    <a href={href} className={className}>
      {Inner}
    </a>
  ) : (
    <div className={className}>{Inner}</div>
  );
};

export default ContentBox;
