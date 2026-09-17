import { createRoot } from "react-dom/client";
import RemoteApp from "./RemoteApp";

const mountedApps = new WeakMap();

const getRemoteBaseUrl = () => {
    const moduleUrl = new URL(import.meta.url);

    moduleUrl.pathname = moduleUrl.pathname.replace(/\/assets\/[^/]+$/, "/");

    moduleUrl.search = "";
    moduleUrl.hash = "";

    return moduleUrl.href;
};

export const mount = (element) => {
    if (!(element instanceof HTMLElement)) {
        throw new Error(
            "3D Model Viewer requires a valid HTML element to mount.",
        );
    }

    const existingUnmount = mountedApps.get(element);

    if (existingUnmount) {
        return existingUnmount;
    }

    const root = createRoot(element);

    root.render(<RemoteApp assetBaseUrl={getRemoteBaseUrl()} />);

    const unmount = () => {
        root.unmount();
        mountedApps.delete(element);
    };

    mountedApps.set(element, unmount);

    return unmount;
};
