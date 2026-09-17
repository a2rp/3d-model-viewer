import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";

const ColladaModel = ({ url, wireframe, shadows, onReady }) => {
    const collada = useLoader(ColladaLoader, url);

    const object = useMemo(() => {
        const clonedScene = collada.scene.clone(true);

        clonedScene.traverse((child) => {
            if (!child.isMesh) {
                return;
            }

            child.castShadow = shadows;
            child.receiveShadow = shadows;

            if (Array.isArray(child.material)) {
                child.material = child.material.map((material) =>
                    material.clone(),
                );
            } else if (child.material) {
                child.material = child.material.clone();
            }
        });

        return clonedScene;
    }, [collada.scene, shadows]);

    useEffect(() => {
        object.traverse((child) => {
            if (!child.isMesh) {
                return;
            }

            const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];

            materials.filter(Boolean).forEach((material) => {
                if ("wireframe" in material) {
                    material.wireframe = wireframe;
                    material.needsUpdate = true;
                }
            });
        });
    }, [object, wireframe]);

    useEffect(() => {
        const animationNames =
            collada.animations?.map((animation) => animation.name) || [];

        onReady?.(object, animationNames);
    }, [collada.animations, object, onReady]);

    return <primitive object={object} />;
};

export default ColladaModel;
