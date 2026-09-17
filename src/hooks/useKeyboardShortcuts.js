import { useEffect } from "react";

const isTypingElement = (element) => {
    if (!(element instanceof HTMLElement)) {
        return false;
    }

    return (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement ||
        element.isContentEditable
    );
};

const useKeyboardShortcuts = ({
    enabled = true,
    hasModel = false,
    hasAnimations = false,
    onResetCamera,
    onFitModel,
    onToggleGrid,
    onToggleAxes,
    onToggleWireframe,
    onScreenshot,
    onTogglePlayback,
}) => {
    useEffect(() => {
        if (!enabled) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (isTypingElement(event.target)) {
                return;
            }

            const key = event.key.toLowerCase();

            if (event.ctrlKey || event.metaKey || event.altKey) {
                return;
            }

            if (event.code === "Space") {
                if (!hasAnimations || !onTogglePlayback) {
                    return;
                }

                event.preventDefault();

                if (!event.repeat) {
                    onTogglePlayback();
                }

                return;
            }

            if (event.repeat) {
                return;
            }

            switch (key) {
                case "r":
                    if (hasModel) {
                        onResetCamera?.();
                    }

                    break;

                case "f":
                    if (hasModel) {
                        onFitModel?.();
                    }

                    break;

                case "g":
                    onToggleGrid?.();
                    break;

                case "a":
                    onToggleAxes?.();
                    break;

                case "w":
                    if (hasModel) {
                        onToggleWireframe?.();
                    }

                    break;

                case "p":
                    if (hasModel) {
                        onScreenshot?.();
                    }

                    break;

                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        enabled,
        hasAnimations,
        hasModel,
        onFitModel,
        onResetCamera,
        onScreenshot,
        onToggleAxes,
        onToggleGrid,
        onTogglePlayback,
        onToggleWireframe,
    ]);
};

export default useKeyboardShortcuts;
