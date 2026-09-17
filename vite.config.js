import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
    base: "/3d-model-viewer/",

    plugins: [
        react(),

        federation({
            name: "threeDModelViewer",
            filename: "remoteEntry.js",

            exposes: {
                "./App": "./src/remote/RemoteApp.jsx",
            },

            shared: {
                react: {
                    singleton: true,
                },

                "react-dom": {
                    singleton: true,
                },
            },

            dts: false,
        }),
    ],

    build: {
        target: "esnext",
        sourcemap: false,
    },
});
