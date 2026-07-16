declare module "*.svg" {
  const svg: string;
  export default svg;
}

// CSS
declare module "*.css" {}
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
