import InfoBox, { type InfoBoxProps } from "./InfoBox";

export interface ErrorBoxProps
  extends Omit<InfoBoxProps, "variant" | "hideIcon"> {
  type?: "warning" | "error";
}

const ErrorBox = ({
  type = "warning",
  children = "",
  ...rest
}: ErrorBoxProps) => {
  return <InfoBox variant={type} children={children} {...rest} />;
};

export default ErrorBox;
