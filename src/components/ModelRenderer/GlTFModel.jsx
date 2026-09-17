import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useAnimations } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

const GlTFModel = ({
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

    const gltf = useLoader(GLTFLoader, url);

    const scene = useMemo(() => {
        const clonedScene = clone(gltf.scene);

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
    }, [gltf.scene, shadows]);

    const { actions } = useAnimations(gltf.animations, groupRef);

    useEffect(() => {
        scene.traverse((child) => {
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
    }, [scene, wireframe]);

    useEffect(() => {
        const animationNames = gltf.animations.map(
            (animation) => animation.name,
        );

        onReady?.(scene, animationNames);
    }, [gltf.animations, onReady, scene]);

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
            <primitive object={scene} />
        </group>
    );
};

export default GlTFModel;
