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
