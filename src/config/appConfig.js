const appConfig = {
    name: "3D Model Viewer",
    shortName: "3D Viewer",

    description:
        "A modern browser-based 3D model viewer for loading, inspecting, and interacting with popular 3D model formats.",

    developer: {
        name: "Ashish Ranjan",
        portfolio: "https://www.ashishranjan.net",
    },

    repository: "https://github.com/a2rp/3d-model-viewer",

    deployment: "https://a2rp.github.io/3d-model-viewer/",

    recommendedFormat: "GLB",

    supportedFormats: [
        {
            extension: "glb",
            label: "GLB",
            name: "Binary glTF",
            use: "Web 3D, games, AR, VR and easy model sharing",
            contains:
                "Geometry, materials, textures, animations and scene data",
            note: "Recommended format. Assets can be packaged into one portable file.",
            level: "Recommended",
        },
        {
            extension: "gltf",
            label: "GLTF",
            name: "glTF",
            use: "Web 3D and real-time applications",
            contains:
                "Geometry, materials, textures, animations and scene data",
            note: "May reference separate BIN and texture files. Standalone GLB is usually easier for browser viewing.",
            level: "Supported",
        },
        {
            extension: "obj",
            label: "OBJ",
            name: "Wavefront OBJ",
            use: "General 3D geometry exchange",
            contains: "Mesh geometry, UV coordinates and normals",
            note: "Materials and textures may depend on separate MTL and image files.",
            level: "Supported",
        },
        {
            extension: "stl",
            label: "STL",
            name: "Stereolithography",
            use: "3D printing and CAD mesh exports",
            contains: "Triangle mesh geometry",
            note: "Usually does not include textures, rich materials, rigging or animation.",
            level: "Supported",
        },
        {
            extension: "fbx",
            label: "FBX",
            name: "Autodesk FBX",
            use: "Games, animation and digital content creation",
            contains: "Meshes, materials, skeletons and animations",
            note: "External textures may not be included in every FBX file.",
            level: "Supported",
        },
        {
            extension: "ply",
            label: "PLY",
            name: "Polygon File Format",
            use: "3D scanning, research and point or mesh data",
            contains: "Geometry and optional vertex colors",
            note: "Common for scanned objects and reconstructed geometry.",
            level: "Supported",
        },
        {
            extension: "3mf",
            label: "3MF",
            name: "3D Manufacturing Format",
            use: "Modern 3D printing workflows",
            contains: "Meshes, colors, materials and manufacturing metadata",
            note: "Designed as a richer alternative to STL for manufacturing.",
            level: "Supported",
        },
        {
            extension: "dae",
            label: "DAE",
            name: "COLLADA",
            use: "3D asset interchange and legacy pipelines",
            contains: "Geometry, materials, scenes and optional animations",
            note: "Older interchange format. Compatibility can vary depending on exporter.",
            level: "Supported",
        },
        {
            extension: "3ds",
            label: "3DS",
            name: "3D Studio",
            use: "Legacy 3D Studio assets",
            contains: "Meshes and basic material information",
            note: "Legacy format with technical limits compared with modern formats.",
            level: "Supported",
        },
        {
            extension: "usdz",
            label: "USDZ",
            name: "Universal Scene Description ZIP",
            use: "Apple AR and spatial content",
            contains: "Scenes, geometry, materials and packaged assets",
            note: "Common in iPhone and iPad augmented reality workflows.",
            level: "Supported",
        },
        {
            extension: "wrl",
            label: "WRL",
            name: "VRML",
            use: "Legacy web and scientific 3D content",
            contains: "Scene geometry, materials and basic scene information",
            note: "Older format. The .wrl and .vrml extensions use the same viewer loader.",
            level: "Supported",
        },
        {
            extension: "vrml",
            label: "VRML",
            name: "Virtual Reality Modeling Language",
            use: "Legacy web and scientific visualization",
            contains: "Scene geometry, materials and basic scene information",
            note: "Older format maintained mainly for compatibility with existing assets.",
            level: "Supported",
        },
    ],

    viewerInformation: {
        processing: {
            title: "Local model processing",
            text: "Selected model files are processed inside your browser. The viewer does not upload the selected model file to an application server.",
        },

        environment: {
            title: "Environment assets",
            text: "Lighting environment presets can load additional environment assets over the network. Your selected local model file remains local.",
        },

        recommendation: {
            title: "Best format",
            text: "GLB is recommended for the most reliable browser experience because geometry, materials, textures and animations can be packaged into one file.",
        },

        companionFiles: {
            title: "External companion files",
            text: "This version accepts one main model file at a time. External BIN, MTL, texture and other companion files are not automatically collected from your computer.",
        },

        compatibility: {
            title: "Compatibility",
            text: "3D formats can vary between exporters and software versions. A supported extension does not guarantee that every file produced by every application will contain compatible data.",
        },

        largeFiles: {
            title: "Large models",
            text: "There is no fixed application file-size limit, but very large or highly detailed models can exceed browser memory, GPU memory or device performance limits.",
        },

        animations: {
            title: "Animations",
            text: "GLB and GLTF animation playback is supported. FBX animation support is available but compatibility can vary by exporter and animation structure. Other formats are primarily treated as static models.",
        },

        materials: {
            title: "Materials and textures",
            text: "Embedded materials and textures are preserved when supported by the format and loader. Models that depend on separate texture or material files may appear incomplete.",
        },

        statistics: {
            title: "Model statistics",
            text: "Mesh, vertex, triangle, material and dimension values are calculated from the loaded scene and are intended as viewer inspection information.",
        },
    },

    unsupportedFormats: [
        {
            formats: "BLEND",
            reason: "Blender project files require Blender or conversion before browser viewing.",
        },
        {
            formats: "MAX",
            reason: "3ds Max project files require 3ds Max or an export step.",
        },
        {
            formats: "MA / MB",
            reason: "Maya project files require Maya or conversion.",
        },
        {
            formats: "STEP / STP",
            reason: "CAD exchange formats require a specialized CAD parser or conversion pipeline.",
        },
        {
            formats: "IGES / IGS",
            reason: "CAD geometry requires a specialized CAD parser or conversion.",
        },
        {
            formats: "SLDPRT",
            reason: "SolidWorks native project files are proprietary CAD documents.",
        },
        {
            formats: "C4D",
            reason: "Cinema 4D project files require Cinema 4D or conversion.",
        },
    ],

    sampleModel: {
        name: "sample.glb",
        type: "glb",
        path: `${import.meta.env.BASE_URL}models/sample.glb`,
    },

    defaultViewerState: {
        background: "#0b0b0c",
        environment: "studio",
        lightIntensity: 1.2,
        showGrid: true,
        showAxes: false,
        wireframe: false,
        autoRotate: false,
        shadows: true,
    },

    keyboardShortcuts: [
        {
            key: "R",
            action: "Reset camera",
        },
        {
            key: "F",
            action: "Fit model",
        },
        {
            key: "G",
            action: "Toggle grid",
        },
        {
            key: "A",
            action: "Toggle axes",
        },
        {
            key: "W",
            action: "Toggle wireframe",
        },
        {
            key: "P",
            action: "Save screenshot",
        },
        {
            key: "Space",
            action: "Play or pause animation",
        },
    ],

    links: {
        portfolio: "https://www.ashishranjan.net",
        github: "https://github.com/a2rp",
        codepen: "https://codepen.io/ash1198",
        linkedin: "https://www.linkedin.com/in/aashishranjan",
        facebook: "https://www.facebook.com/aashishranjan",
        youtube: "https://www.youtube.com/@a2rp",
        email: "mailto:ashish@ashishranjan.net",
        support: "https://a2rp-donation-page.netlify.app/",
    },
};

export default appConfig;
