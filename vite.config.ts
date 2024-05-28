import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
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
