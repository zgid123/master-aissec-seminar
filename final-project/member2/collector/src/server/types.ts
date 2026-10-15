export interface EmbeddedAsset {
  body: string;
  contentType: string;
}
export interface ServerAssets {
  html: string;
  assets: Record<string, EmbeddedAsset>;
}
export interface CollectorServer {
  fetch: (request: Request) => Response | Promise<Response>;
}
