import style from "./ContentBox.module.scss";

export interface ContentBoxProps {
  title?: string;
  titleSize?: "regular" | "large";
  content?: string;
  children?: React.ReactNode;
  color?: "default" | "secondary";
  href?: string | null;
}

const ContentBox = ({
  title = "",
  titleSize = "regular",
  content = "",
  children,
  color = "default",
  href = null,
}: ContentBoxProps) => {
  const renderTitle = () => {
    if (!title) return null;
    const className = `${style.title} ${style[titleSize]}`;
    return <h2 className={className}>{title}</h2>;
  };

  const colorClass = style[color] || "";
  const linkClass = href ? style.link : "";
  const className = `${style.contentBox} ${colorClass} ${linkClass}`.trim();
  const bodyContent = content?.length ? content : children;

  const Inner = (
    <>
      {renderTitle()}
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
