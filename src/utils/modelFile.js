export const SUPPORTED_MODEL_EXTENSIONS = [
    "glb",
    "gltf",
    "obj",
    "stl",
    "fbx",
    "ply",
    "3mf",
    "dae",
    "3ds",
    "usdz",
    "wrl",
    "vrml",
];

export const MODEL_ACCEPT_STRING =
    ".glb,.gltf,.obj,.stl,.fbx,.ply,.3mf,.dae,.3ds,.usdz,.wrl,.vrml";

export const getModelFileType = (fileName = "") => {
    const parts = fileName.trim().split(".");

    if (parts.length < 2) {
        return "";
    }

    return parts.pop().toLowerCase();
};

export const isSupportedModelType = (type = "") => {
    return SUPPORTED_MODEL_EXTENSIONS.includes(type.toLowerCase());
};

export const isSupportedModelFile = (file) => {
    if (!file?.name) {
        return false;
    }

    return isSupportedModelType(getModelFileType(file.name));
};

export const validateModelFile = (file) => {
    if (!file) {
        return {
            valid: false,
            error: "No model file was selected.",
        };
    }

    const type = getModelFileType(file.name);

    if (!type) {
        return {
            valid: false,
            error: "The selected file does not have a valid extension.",
        };
    }

    if (!isSupportedModelType(type)) {
        return {
            valid: false,
            error: "Unsupported model format. Please open the File Guide to view supported formats.",
        };
    }

    if (file.size === 0) {
        return {
            valid: false,
            error: "The selected model file is empty.",
        };
    }

    return {
        valid: true,
        type,
        error: "",
    };
};

export const createUploadedModel = (file, url) => {
    return {
        url,
        type: getModelFileType(file.name),
        name: file.name,
        size: file.size,
        source: "upload",
    };
};

export const createSampleModel = ({ url, name = "sample.glb", type }) => {
    const resolvedType = type?.toLowerCase() || getModelFileType(name);

    return {
        url,
        type: resolvedType,
        name,
        size: null,
        source: "sample",
    };
};
