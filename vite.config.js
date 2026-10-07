import { defineConfig } from "vite";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

// Web multipágina: cada .html de la raíz es una página de entrada.
const paginas = Object.fromEntries(
  readdirSync(import.meta.dirname)
    .filter((f) => f.endsWith(".html"))
    .map((f) => [f.replace(/\.html$/, ""), resolve(import.meta.dirname, f)])
);

export default defineConfig({
  // En GitHub Pages la web vive en /<repositorio>/: la acción de despliegue define BASE_PATH.
  base: process.env.BASE_PATH || "/",
  server: { port: 5173, open: true, host: true },
  preview: { port: 4173, open: true, host: true },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: { input: paginas }
  }
});
