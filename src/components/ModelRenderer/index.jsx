import { useCallback } from "react";
import calculateModelStats from "../../utils/modelStats";
import GlTFModel from "./GlTFModel";
import ObjModel from "./ObjModel";
import StlModel from "./StlModel";
import FbxModel from "./FbxModel";
import PlyModel from "./PlyModel";
import ThreeMfModel from "./ThreeMfModel";
import ColladaModel from "./ColladaModel";
import TdsModel from "./TdsModel";
import UsdzModel from "./UsdzModel";
import VrmlModel from "./VrmlModel";

const ModelRenderer = ({
    modelUrl,
    modelType,
    wireframe,
    shadows,
    activeAnimation,
    isPlaying,
    animationLoop,
    playbackSpeed,
    animationResetSignal,
    onReady,
}) => {
    const handleReady = useCallback(
        (object, animationNames = []) => {
            onReady?.({
                object,
                animationNames,
                stats: calculateModelStats(object, animationNames),
            });
        },
        [onReady],
    );

    const commonProps = {
        url: modelUrl,
        wireframe,
        shadows,
        onReady: handleReady,
    };

    switch (modelType) {
        case "glb":
        case "gltf":
            return (
                <GlTFModel
                    {...commonProps}
                    activeAnimation={activeAnimation}
                    isPlaying={isPlaying}
                    animationLoop={animationLoop}
                    playbackSpeed={playbackSpeed}
                    animationResetSignal={animationResetSignal}
                />
            );

        case "obj":
            return <ObjModel {...commonProps} />;

        case "stl":
            return <StlModel {...commonProps} />;

        case "fbx":
            return (
                <FbxModel
                    {...commonProps}
                    activeAnimation={activeAnimation}
                    isPlaying={isPlaying}
                    animationLoop={animationLoop}
                    playbackSpeed={playbackSpeed}
                    animationResetSignal={animationResetSignal}
                />
            );

        case "ply":
            return <PlyModel {...commonProps} />;

        case "3mf":
            return <ThreeMfModel {...commonProps} />;

        case "dae":
            return <ColladaModel {...commonProps} />;

        case "3ds":
            return <TdsModel {...commonProps} />;

        case "usdz":
            return <UsdzModel {...commonProps} />;

        case "wrl":
        case "vrml":
            return <VrmlModel {...commonProps} />;

        default:
            return null;
    }
};

export default ModelRenderer;
