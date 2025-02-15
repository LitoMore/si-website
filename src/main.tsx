import "./index.css";
// @deno-types="@types/react"
import { StrictMode } from "react";
// @deno-types="@types/react-dom/client"
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
