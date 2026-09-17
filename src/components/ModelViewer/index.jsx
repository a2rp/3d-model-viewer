import {
    Component,
    Suspense,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
    ContactShadows,
    Environment,
    OrbitControls,
    PerspectiveCamera,
    useProgress,
} from "@react-three/drei";
import ModelRenderer from "../ModelRenderer";
import LoadingOverlay from "../LoadingOverlay";
import styles from "./styles.module.css";

const CameraController = ({
    object,
    controlsRef,
    resetCameraSignal,
    fitModelSignal,
}) => {
    const cameraRef = useRef(null);

    useEffect(() => {
        const camera = cameraRef.current;
        const controls = controlsRef.current;

        if (!camera) {
            return;
        }

        camera.position.set(4, 3, 6);
        camera.near = 0.01;
        camera.far = 10000;
        camera.updateProjectionMatrix();

        if (controls) {
            controls.target.set(0, 0, 0);
            controls.update();
        }
    }, [controlsRef, resetCameraSignal]);

    useEffect(() => {
        const camera = cameraRef.current;
        const controls = controlsRef.current;

        if (!camera || !object) {
            return;
        }

        object.updateMatrixWorld(true);

        const box = new THREE.Box3().setFromObject(object);

        if (box.isEmpty()) {
            return;
        }

        const size = new THREE.Vector3();
        const center = new THREE.Vector3();

        box.getSize(size);
        box.getCenter(center);

        const maxDimension = Math.max(size.x, size.y, size.z);

        if (!Number.isFinite(maxDimension) || maxDimension <= 0) {
            return;
        }

        const verticalFov = (camera.fov * Math.PI) / 180;

        const fitHeightDistance =
            maxDimension / (2 * Math.tan(verticalFov / 2));

        const fitWidthDistance = fitHeightDistance / camera.aspect;

        const distance = Math.max(fitHeightDistance, fitWidthDistance) * 1.65;

        const direction = new THREE.Vector3(1, 0.75, 1).normalize();

        camera.position.copy(
            center.clone().add(direction.multiplyScalar(distance)),
        );

        camera.near = Math.max(distance / 1000, 0.001);

        camera.far = Math.max(distance * 100, 1000);

        camera.updateProjectionMatrix();

        if (controls) {
            controls.target.copy(center);
            controls.update();
        }
    }, [controlsRef, fitModelSignal, object]);

    return (
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[4, 3, 6]}
            fov={45}
            near={0.01}
            far={10000}
        />
    );
};

const ScreenshotController = ({ signal, modelName }) => {
    const { gl } = useThree();

    useEffect(() => {
        if (!signal) {
            return;
        }

        requestAnimationFrame(() => {
            gl.domElement.toBlob(
                (blob) => {
                    if (!blob) {
                        return;
                    }

                    const safeName = (modelName || "3d-model")
                        .replace(/\.[^.]+$/, "")
                        .replace(/[^a-z0-9-_]+/gi, "-");

                    const url = URL.createObjectURL(blob);

                    const anchor = document.createElement("a");

                    anchor.href = url;
                    anchor.download = `${safeName}-screenshot.png`;

                    document.body.appendChild(anchor);

                    anchor.click();
                    anchor.remove();

                    URL.revokeObjectURL(url);
                },
                "image/png",
                1,
            );
        });
    }, [gl, modelName, signal]);

    return null;
};

class CanvasErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error) {
        this.props.onError?.(
            error?.message || "The model could not be loaded.",
        );
    }

    componentDidUpdate(previousProps) {
        if (
            previousProps.resetKey !== this.props.resetKey &&
            this.state.hasError
        ) {
            this.setState({
                hasError: false,
            });
        }
    }

    render() {
        if (this.state.hasError) {
            return null;
        }

        return this.props.children;
    }
}

const ModelViewer = ({
    modelUrl,
    modelType,
    modelName,
    viewerState,
    resetCameraSignal,
    fitModelSignal,
    screenshotSignal,
    activeAnimation,
    isPlaying,
    animationLoop,
    playbackSpeed,
    animationResetSignal,
    onModelInfo,
    onAnimationsChange,
    onError,
}) => {
    const controlsRef = useRef(null);

    const [modelObject, setModelObject] = useState(null);

    const { active, progress } = useProgress();

    const handleReady = useCallback(
        ({ object, animationNames, stats }) => {
            setModelObject((current) =>
                current === object ? current : object,
            );

            onModelInfo?.(stats);

            onAnimationsChange?.(animationNames);
        },
        [onAnimationsChange, onModelInfo],
    );

    return (
        <div className={styles.wrapper}>
            <CanvasErrorBoundary resetKey={modelUrl} onError={onError}>
                <Canvas
                    shadows={viewerState.shadows ? "basic" : false}
                    dpr={[1, 2]}
                    gl={{
                        antialias: true,
                        alpha: false,
                        preserveDrawingBuffer: true,
                        powerPreference: "high-performance",
                    }}
                >
                    <CameraController
                        object={modelObject}
                        controlsRef={controlsRef}
                        resetCameraSignal={resetCameraSignal}
                        fitModelSignal={fitModelSignal}
                    />

                    <color
                        attach="background"
                        args={[viewerState.background]}
                    />

                    <ambientLight
                        intensity={viewerState.lightIntensity * 0.45}
                    />

                    <directionalLight
                        position={[5, 8, 5]}
                        intensity={viewerState.lightIntensity}
                        castShadow={viewerState.shadows}
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                    />

                    <directionalLight
                        position={[-4, 3, -5]}
                        intensity={viewerState.lightIntensity * 0.35}
                    />

                    {viewerState.environment !== "none" && (
                        <Environment preset={viewerState.environment} />
                    )}

                    {viewerState.showGrid && (
                        <gridHelper args={[20, 20, "#3a3a3a", "#202020"]} />
                    )}

                    {viewerState.showAxes && <axesHelper args={[3]} />}

                    <Suspense fallback={null}>
                        <ModelRenderer
                            key={modelUrl}
                            modelUrl={modelUrl}
                            modelType={modelType}
                            wireframe={viewerState.wireframe}
                            shadows={viewerState.shadows}
                            activeAnimation={activeAnimation}
                            isPlaying={isPlaying}
                            animationLoop={animationLoop}
                            playbackSpeed={playbackSpeed}
                            animationResetSignal={animationResetSignal}
                            onReady={handleReady}
                        />

                        {viewerState.shadows && (
                            <ContactShadows
                                position={[0, -1.5, 0]}
                                opacity={0.35}
                                scale={18}
                                blur={2.5}
                                far={12}
                            />
                        )}
                    </Suspense>

                    <OrbitControls
                        ref={controlsRef}
                        makeDefault
                        enableDamping
                        dampingFactor={0.08}
                        enablePan
                        enableRotate
                        enableZoom
                        screenSpacePanning
                        autoRotate={viewerState.autoRotate}
                        autoRotateSpeed={1.5}
                    />

                    <ScreenshotController
                        signal={screenshotSignal}
                        modelName={modelName}
                    />
                </Canvas>
            </CanvasErrorBoundary>

            {active && <LoadingOverlay progress={progress} />}
        </div>
    );
};

export default ModelViewer;
