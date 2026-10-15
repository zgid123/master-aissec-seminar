import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

const root = document.getElementById("root");
if (!root) throw new Error("Không tìm thấy phần tử root");
createRoot(root).render(<App />);
