import { useCallback, useEffect, useState } from "react";

const useFullscreen = (elementRef) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fullscreenError, setFullscreenError] = useState("");

    const enterFullscreen = useCallback(async () => {
        const element = elementRef?.current;

        if (!element) {
            setFullscreenError("Fullscreen target is unavailable.");

            return false;
        }

        try {
            await element.requestFullscreen();

            setFullscreenError("");

            return true;
        } catch {
            setFullscreenError("Fullscreen mode could not be activated.");

            return false;
        }
    }, [elementRef]);

    const exitFullscreen = useCallback(async () => {
        if (!document.fullscreenElement) {
            return true;
        }

        try {
            await document.exitFullscreen();

            setFullscreenError("");

            return true;
        } catch {
            setFullscreenError("Fullscreen mode could not be closed.");

            return false;
        }
    }, []);

    const toggleFullscreen = useCallback(async () => {
        if (document.fullscreenElement) {
            return exitFullscreen();
        }

        return enterFullscreen();
    }, [enterFullscreen, exitFullscreen]);

    const clearFullscreenError = useCallback(() => {
        setFullscreenError("");
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement === elementRef?.current);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange,
            );
        };
    }, [elementRef]);

    return {
        isFullscreen,
        fullscreenError,
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen,
        clearFullscreenError,
    };
};

export default useFullscreen;
