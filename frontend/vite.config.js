import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST", "PUT", "DELETE"],
			allowedHeaders: ["Content-Type", "Authorization"],
		},
	},
});
