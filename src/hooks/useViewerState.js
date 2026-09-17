import { useCallback, useState } from "react";

export const DEFAULT_VIEWER_STATE = {
    background: "#0b0b0c",
    environment: "studio",
    lightIntensity: 1.2,
    showGrid: true,
    showAxes: false,
    wireframe: false,
    autoRotate: false,
    shadows: true,
};

const useViewerState = (initialState = DEFAULT_VIEWER_STATE) => {
    const [viewerState, setViewerState] = useState(() => ({
        ...DEFAULT_VIEWER_STATE,
        ...initialState,
    }));

    const updateViewerOption = useCallback((name, value) => {
        setViewerState((current) => ({
            ...current,
            [name]: value,
        }));
    }, []);

    const toggleViewerOption = useCallback((name) => {
        setViewerState((current) => ({
            ...current,
            [name]: !current[name],
        }));
    }, []);

    const resetViewerState = useCallback(() => {
        setViewerState({
            ...DEFAULT_VIEWER_STATE,
            ...initialState,
        });
    }, [initialState]);

    return {
        viewerState,
        setViewerState,
        updateViewerOption,
        toggleViewerOption,
        resetViewerState,
    };
};

export default useViewerState;
