import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig(({ command }) => ({
    // GitHub Pages serves this project from a subpath; local Vite serves it from the root.
    base: command === "build" ? "/3d-model-viewer/" : "/",

    plugins: [
        react(),

        federation({
            name: "threeDModelViewer",
            filename: "remoteEntry.js",

            exposes: {
                "./mount": "./src/remote/mount.jsx",
            },

            dts: false,
        }),
    ],

    build: {
        target: "esnext",
        sourcemap: false,
    },
}));
