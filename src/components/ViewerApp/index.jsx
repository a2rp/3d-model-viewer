import { useCallback, useEffect, useRef, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import ModelUploader from "../ModelUploader";
import EmptyViewer from "../EmptyViewer";
import ModelViewer from "../ModelViewer";
import ViewerToolbar from "../ViewerToolbar";
import SceneControls from "../SceneControls";
import AnimationControls from "../AnimationControls";
import ModelInfo from "../ModelInfo";
import ErrorState from "../ErrorState";
import styles from "./styles.module.css";
import ConfirmModal from "../ConfirmModal";
import SupportedFormatsModal from "../SupportedFormatsModal";
import {
    SUPPORTED_MODEL_EXTENSIONS,
    getModelFileType,
} from "../../utils/modelFile";

const DEFAULT_VIEWER_STATE = {
    background: "#0b0b0c",
    environment: "studio",
    lightIntensity: 1.2,
    showGrid: true,
    showAxes: false,
    wireframe: false,
    autoRotate: false,
    shadows: true,
};

const ViewerApp = () => {
    const viewerContainerRef = useRef(null);
    const objectUrlRef = useRef(null);

    const [model, setModel] = useState(null);
    const [modelStats, setModelStats] = useState(null);
    const [error, setError] = useState("");

    const [viewerState, setViewerState] = useState(DEFAULT_VIEWER_STATE);

    const [resetCameraSignal, setResetCameraSignal] = useState(0);

    const [fitModelSignal, setFitModelSignal] = useState(0);

    const [screenshotSignal, setScreenshotSignal] = useState(0);

    const [isFullscreen, setIsFullscreen] = useState(false);

    const [animationNames, setAnimationNames] = useState([]);
    const [activeAnimation, setActiveAnimation] = useState("");
    const [isPlaying, setIsPlaying] = useState(true);
    const [animationLoop, setAnimationLoop] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    const [animationResetSignal, setAnimationResetSignal] = useState(0);

    const [confirmClearOpen, setConfirmClearOpen] = useState(false);

    const [formatsOpen, setFormatsOpen] = useState(false);

    const releaseObjectUrl = useCallback(() => {
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
        }
    }, []);

    const resetAnimationState = useCallback(() => {
        setAnimationNames([]);
        setActiveAnimation("");
        setIsPlaying(true);
        setAnimationLoop(true);
        setPlaybackSpeed(1);
        setAnimationResetSignal((value) => value + 1);
    }, []);

    const handleFileSelect = useCallback(
        (file) => {
            if (!file) {
                return;
            }

            const type = getModelFileType(file.name);

            if (!SUPPORTED_MODEL_EXTENSIONS.includes(type)) {
                setError(
                    "Unsupported model format. Please choose a GLB, GLTF, OBJ, or STL file.",
                );
                return;
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

            setModelStats(null);
            setError("");
            resetAnimationState();

            setFitModelSignal((value) => value + 1);
        },
        [releaseObjectUrl, resetAnimationState],
    );

    const handleLoadSample = useCallback(() => {
        releaseObjectUrl();

        setModel({
            url: `${import.meta.env.BASE_URL}models/sample.glb`,
            type: "glb",
            name: "sample.glb",
            size: null,
            source: "sample",
        });

        setModelStats(null);
        setError("");
        resetAnimationState();

        setFitModelSignal((value) => value + 1);
    }, [releaseObjectUrl, resetAnimationState]);

    const handleClearModel = useCallback(() => {
        releaseObjectUrl();

        setModel(null);
        setModelStats(null);
        setError("");
        resetAnimationState();
    }, [releaseObjectUrl, resetAnimationState]);

    const requestClearModel = useCallback(() => {
        if (!model) {
            return;
        }

        setConfirmClearOpen(true);
    }, [model]);

    const confirmClearModel = useCallback(() => {
        handleClearModel();
        setConfirmClearOpen(false);
    }, [handleClearModel]);

    const cancelClearModel = useCallback(() => {
        setConfirmClearOpen(false);
    }, []);

    const updateViewerOption = useCallback((name, value) => {
        setViewerState((current) => ({
            ...current,
            [name]: value,
        }));
    }, []);

    const handleAnimationsChange = useCallback((names) => {
        setAnimationNames(names);

        if (names.length > 0) {
            setActiveAnimation((current) =>
                names.includes(current) ? current : names[0],
            );
        } else {
            setActiveAnimation("");
        }
    }, []);

    const toggleFullscreen = useCallback(async () => {
        const element = viewerContainerRef.current;

        if (!element) {
            return;
        }

        try {
            if (!document.fullscreenElement) {
                await element.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch {
            setError("Fullscreen mode could not be activated.");
        }
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(
                document.fullscreenElement === viewerContainerRef.current,
            );
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange,
            );
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const element = event.target;

            if (
                element instanceof HTMLInputElement ||
                element instanceof HTMLSelectElement ||
                element instanceof HTMLTextAreaElement
            ) {
                return;
            }

            const key = event.key.toLowerCase();

            if (key === "r" && model) {
                setResetCameraSignal((value) => value + 1);
            }

            if (key === "f" && model) {
                setFitModelSignal((value) => value + 1);
            }

            if (key === "g") {
                updateViewerOption("showGrid", !viewerState.showGrid);
            }

            if (key === "a") {
                updateViewerOption("showAxes", !viewerState.showAxes);
            }

            if (key === "w" && model) {
                updateViewerOption("wireframe", !viewerState.wireframe);
            }

            if (key === "p" && model) {
                setScreenshotSignal((value) => value + 1);
            }

            if (event.code === "Space" && animationNames.length) {
                event.preventDefault();
                setIsPlaying((value) => !value);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        animationNames.length,
        model,
        updateViewerOption,
        viewerState.showAxes,
        viewerState.showGrid,
        viewerState.wireframe,
    ]);

    useEffect(() => {
        return () => {
            releaseObjectUrl();
        };
    }, [releaseObjectUrl]);

    return (
        <div className={styles.wrapper}>
            <Header />

            <main className={styles.main}>
                <section className={styles.workspace}>
                    <div
                        ref={viewerContainerRef}
                        className={styles.viewerPanel}
                    >
                        <ViewerToolbar
                            hasModel={Boolean(model)}
                            showGrid={viewerState.showGrid}
                            showAxes={viewerState.showAxes}
                            wireframe={viewerState.wireframe}
                            autoRotate={viewerState.autoRotate}
                            isFullscreen={isFullscreen}
                            onResetCamera={() =>
                                setResetCameraSignal((value) => value + 1)
                            }
                            onFitModel={() =>
                                setFitModelSignal((value) => value + 1)
                            }
                            onToggleGrid={() =>
                                updateViewerOption(
                                    "showGrid",
                                    !viewerState.showGrid,
                                )
                            }
                            onToggleAxes={() =>
                                updateViewerOption(
                                    "showAxes",
                                    !viewerState.showAxes,
                                )
                            }
                            onToggleWireframe={() =>
                                updateViewerOption(
                                    "wireframe",
                                    !viewerState.wireframe,
                                )
                            }
                            onToggleAutoRotate={() =>
                                updateViewerOption(
                                    "autoRotate",
                                    !viewerState.autoRotate,
                                )
                            }
                            onScreenshot={() =>
                                setScreenshotSignal((value) => value + 1)
                            }
                            onFullscreen={toggleFullscreen}
                        />

                        <div className={styles.stage}>
                            {model ? (
                                <ModelViewer
                                    modelUrl={model.url}
                                    modelType={model.type}
                                    modelName={model.name}
                                    viewerState={viewerState}
                                    resetCameraSignal={resetCameraSignal}
                                    fitModelSignal={fitModelSignal}
                                    screenshotSignal={screenshotSignal}
                                    activeAnimation={activeAnimation}
                                    isPlaying={isPlaying}
                                    animationLoop={animationLoop}
                                    playbackSpeed={playbackSpeed}
                                    animationResetSignal={animationResetSignal}
                                    onModelInfo={setModelStats}
                                    onAnimationsChange={handleAnimationsChange}
                                    onError={(message) => setError(message)}
                                />
                            ) : (
                                <EmptyViewer />
                            )}

                            {error && (
                                <ErrorState
                                    message={error}
                                    onDismiss={() => setError("")}
                                    onClear={
                                        model ? requestClearModel : undefined
                                    }
                                />
                            )}
                        </div>

                        {animationNames.length > 0 && (
                            <AnimationControls
                                animationNames={animationNames}
                                activeAnimation={activeAnimation}
                                isPlaying={isPlaying}
                                loop={animationLoop}
                                playbackSpeed={playbackSpeed}
                                onAnimationChange={setActiveAnimation}
                                onPlayPause={() =>
                                    setIsPlaying((value) => !value)
                                }
                                onStop={() => {
                                    setIsPlaying(false);
                                    setAnimationResetSignal(
                                        (value) => value + 1,
                                    );
                                }}
                                onLoopChange={setAnimationLoop}
                                onSpeedChange={setPlaybackSpeed}
                            />
                        )}
                    </div>

                    <aside className={styles.sidebar}>
                        <ModelUploader
                            hasModel={Boolean(model)}
                            modelName={model?.name}
                            onFileSelect={handleFileSelect}
                            onLoadSample={handleLoadSample}
                            onClear={requestClearModel}
                            onOpenGuide={() => setFormatsOpen(true)}
                        />

                        <SceneControls
                            viewerState={viewerState}
                            onChange={updateViewerOption}
                        />

                        <ModelInfo model={model} stats={modelStats} />
                    </aside>
                </section>
            </main>

            <ConfirmModal
                open={confirmClearOpen}
                title="Remove current model?"
                message="The currently loaded model will be removed from the viewer. You can load it again later if needed."
                confirmText="Remove model"
                cancelText="Keep model"
                danger
                onConfirm={confirmClearModel}
                onCancel={cancelClearModel}
            />

            <SupportedFormatsModal
                open={formatsOpen}
                onClose={() => setFormatsOpen(false)}
            />

            <Footer />
        </div>
    );
};

export default ViewerApp;
