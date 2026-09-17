import { useCallback, useState } from "react";

const sanitizeFileName = (fileName = "3d-model") => {
    const withoutExtension = fileName.replace(/\.[^.]+$/, "");

    const sanitized = withoutExtension
        .trim()
        .replace(/[^a-z0-9-_]+/gi, "-")
        .replace(/^-+|-+$/g, "");

    return sanitized || "3d-model";
};

const canvasToBlob = (canvas) => {
    return new Promise((resolve) => {
        canvas.toBlob(
            (blob) => {
                resolve(blob);
            },
            "image/png",
            1,
        );
    });
};

const useScreenshot = () => {
    const [isCapturing, setIsCapturing] = useState(false);

    const [screenshotError, setScreenshotError] = useState("");

    const captureScreenshot = useCallback(
        async (canvas, modelName = "3d-model") => {
            if (!(canvas instanceof HTMLCanvasElement)) {
                setScreenshotError("3D viewer canvas is unavailable.");

                return false;
            }

            setIsCapturing(true);
            setScreenshotError("");

            try {
                const blob = await canvasToBlob(canvas);

                if (!blob) {
                    throw new Error("Screenshot could not be created.");
                }

                const url = URL.createObjectURL(blob);

                const anchor = document.createElement("a");

                anchor.href = url;
                anchor.download = `${sanitizeFileName(
                    modelName,
                )}-screenshot.png`;

                document.body.appendChild(anchor);

                anchor.click();
                anchor.remove();

                URL.revokeObjectURL(url);

                return true;
            } catch {
                setScreenshotError("Screenshot could not be saved.");

                return false;
            } finally {
                setIsCapturing(false);
            }
        },
        [],
    );

    const clearScreenshotError = useCallback(() => {
        setScreenshotError("");
    }, []);

    return {
        isCapturing,
        screenshotError,
        captureScreenshot,
        clearScreenshotError,
    };
};

export default useScreenshot;
