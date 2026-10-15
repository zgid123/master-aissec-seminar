import { createApp } from "./app.ts";
import { html, assets } from "virtual:assets";

const app = createApp({ html, assets });
export default { fetch: app.fetch };
