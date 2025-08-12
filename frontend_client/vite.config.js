import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: {
      key: fs.readFileSync(resolve(__dirname, "certs/key.pem")),
      cert: fs.readFileSync(resolve(__dirname, "certs/cert.pem")),
    },
    port: 5173,
  },
});
