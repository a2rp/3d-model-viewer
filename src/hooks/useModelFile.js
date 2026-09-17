import { useCallback, useEffect, useRef, useState } from "react";

export const SUPPORTED_MODEL_TYPES = ["glb", "gltf", "obj", "stl"];

const getFileType = (fileName = "") => {
    return fileName.split(".").pop()?.toLowerCase() || "";
};

const useModelFile = () => {
    const objectUrlRef = useRef(null);

    const [model, setModel] = useState(null);
    const [error, setError] = useState("");

    const releaseObjectUrl = useCallback(() => {
        if (!objectUrlRef.current) {
            return;
        }

        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
    }, []);

    const loadFile = useCallback(
        (file) => {
            if (!file) {
                return false;
            }

            const type = getFileType(file.name);

            if (!SUPPORTED_MODEL_TYPES.includes(type)) {
                setError(
                    "Unsupported model format. Please choose a GLB, GLTF, OBJ, or STL file.",
                );

                return false;
            }

            releaseObjectUrl();

            const url = URL.createObjectURL(file);

            objectUrlRef.current = url;

            setModel({
                url,
                type,
                name: file.name,
                size: file.size,
                source: "upload",
            });

            setError("");

            return true;
        },
        [releaseObjectUrl],
    );

    const loadSample = useCallback(
        ({ url, name = "sample.glb", type } = {}) => {
            if (!url) {
                setError("Sample model URL is missing.");

                return false;
            }

            releaseObjectUrl();

            const resolvedType = type?.toLowerCase() || getFileType(name);

            if (!SUPPORTED_MODEL_TYPES.includes(resolvedType)) {
                setError("The sample model uses an unsupported format.");

                return false;
            }

            setModel({
                url,
                type: resolvedType,
                name,
                size: null,
                source: "sample",
            });

            setError("");

            return true;
        },
        [releaseObjectUrl],
    );

    const clearModel = useCallback(() => {
        releaseObjectUrl();

        setModel(null);
        setError("");
    }, [releaseObjectUrl]);

    const clearError = useCallback(() => {
        setError("");
    }, []);

    useEffect(() => {
        return () => {
            releaseObjectUrl();
        };
    }, [releaseObjectUrl]);

    return {
        model,
        error,
        supportedTypes: SUPPORTED_MODEL_TYPES,
        loadFile,
        loadSample,
        clearModel,
        clearError,
        setError,
    };
};

export default useModelFile;
