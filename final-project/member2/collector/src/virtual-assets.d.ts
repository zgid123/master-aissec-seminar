declare module "virtual:assets" {
  export const html: string;
  export const assets: Record<string, { body: string; contentType: string }>;
}
