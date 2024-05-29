/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./setupTests.ts"],
        css: true
    },
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "https://gps.autotracker.group/api/",
                rewrite: (path) => path.replace(/^\/api/, ""),
                changeOrigin: true
            }
        }
    }
});
