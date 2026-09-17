import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useAnimations, useFBX } from "@react-three/drei";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

const FbxModel = ({
    url,
    wireframe,
    shadows,
    activeAnimation,
    isPlaying,
    animationLoop,
    playbackSpeed,
    animationResetSignal,
    onReady,
}) => {
    const groupRef = useRef(null);

    const loadedObject = useFBX(url);

    const object = useMemo(() => {
        const clonedObject = clone(loadedObject);

        clonedObject.traverse((child) => {
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

        return clonedObject;
    }, [loadedObject, shadows]);

    const animations = useMemo(() => {
        return (loadedObject.animations || []).map((clip, index) => {
            const clonedClip = clip.clone();

            if (!clonedClip.name) {
                clonedClip.name = `Animation ${index + 1}`;
            }

            return clonedClip;
        });
    }, [loadedObject]);

    const { actions } = useAnimations(animations, groupRef);

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
        const animationNames = animations.map((animation) => animation.name);

        onReady?.(object, animationNames);
    }, [animations, object, onReady]);

    useEffect(() => {
        Object.values(actions)
            .filter(Boolean)
            .forEach((action) => {
                action.stop();
            });

        if (!activeAnimation) {
            return;
        }

        const action = actions[activeAnimation];

        if (!action) {
            return;
        }

        action.reset();

        action.setLoop(
            animationLoop ? THREE.LoopRepeat : THREE.LoopOnce,
            animationLoop ? Infinity : 1,
        );

        action.setEffectiveTimeScale(isPlaying ? playbackSpeed : 0);

        action.play();

        return () => {
            action.stop();
        };
    }, [actions, activeAnimation, animationLoop, isPlaying, playbackSpeed]);

    useEffect(() => {
        const action = actions[activeAnimation];

        if (!action) {
            return;
        }

        action.setEffectiveTimeScale(isPlaying ? playbackSpeed : 0);
    }, [actions, activeAnimation, isPlaying, playbackSpeed]);

    useEffect(() => {
        const action = actions[activeAnimation];

        if (!action) {
            return;
        }

        action.setLoop(
            animationLoop ? THREE.LoopRepeat : THREE.LoopOnce,
            animationLoop ? Infinity : 1,
        );
    }, [actions, activeAnimation, animationLoop]);

    useEffect(() => {
        if (!animationResetSignal) {
            return;
        }

        const action = actions[activeAnimation];

        if (!action) {
            return;
        }

        action.stop();
        action.reset();
    }, [actions, activeAnimation, animationResetSignal]);

    return (
        <group ref={groupRef}>
            <primitive object={object} />
        </group>
    );
};

export default FbxModel;
