const sanitizeFileName = (fileName = "3d-model") => {
    const withoutExtension = fileName.replace(/\.[^.]+$/, "");

    const sanitized = withoutExtension
        .trim()
        .replace(/[^a-z0-9-_]+/gi, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");

    return sanitized || "3d-model";
};

const canvasToBlob = (canvas, type = "image/png", quality = 1) => {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error("Image could not be created."));

                    return;
                }

                resolve(blob);
            },
            type,
            quality,
        );
    });
};

export const downloadBlob = (blob, fileName) => {
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
};

export const downloadCanvasImage = async (canvas, modelName = "3d-model") => {
    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error("3D viewer canvas is unavailable.");
    }

    const blob = await canvasToBlob(canvas);

    const fileName = `${sanitizeFileName(modelName)}-screenshot.png`;

    downloadBlob(blob, fileName);

    return fileName;
};

export default downloadCanvasImage;
