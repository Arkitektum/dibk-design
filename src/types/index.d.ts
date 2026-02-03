declare module "*.scss" {
  const content: { [key: string]: string };
  export default content;
}
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.svg?url" {
  const src: string;
  export default src;
}

declare module "*.svg?react" {
  import type * as React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
