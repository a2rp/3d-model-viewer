import {
    FiCamera,
    FiCrosshair,
    FiGrid,
    FiMaximize2,
    FiMinimize2,
    FiRefreshCcw,
    FiRotateCw,
} from "react-icons/fi";
import { TbAxisX, TbPolygon } from "react-icons/tb";
import styles from "./styles.module.css";

const ViewerToolbar = ({
    hasModel,
    showGrid,
    showAxes,
    wireframe,
    autoRotate,
    isFullscreen,
    onResetCamera,
    onFitModel,
    onToggleGrid,
    onToggleAxes,
    onToggleWireframe,
    onToggleAutoRotate,
    onScreenshot,
    onFullscreen,
}) => {
    const buttonClass = (active) =>
        `${styles.button} ${active ? styles.active : ""}`;

    return (
        <div className={styles.wrapper}>
            <div className={styles.group}>
                <button
                    type="button"
                    className={styles.button}
                    disabled={!hasModel}
                    onClick={onResetCamera}
                    title="Reset camera - R"
                >
                    <FiRefreshCcw />
                    <span>Reset</span>
                </button>

                <button
                    type="button"
                    className={styles.button}
                    disabled={!hasModel}
                    onClick={onFitModel}
                    title="Fit model - F"
                >
                    <FiCrosshair />
                    <span>Fit</span>
                </button>
            </div>

            <div className={styles.group}>
                <button
                    type="button"
                    className={buttonClass(showGrid)}
                    onClick={onToggleGrid}
                    title="Toggle grid - G"
                >
                    <FiGrid />
                    <span>Grid</span>
                </button>

                <button
                    type="button"
                    className={buttonClass(showAxes)}
                    onClick={onToggleAxes}
                    title="Toggle axes - A"
                >
                    <TbAxisX />
                    <span>Axes</span>
                </button>

                <button
                    type="button"
                    className={buttonClass(wireframe)}
                    disabled={!hasModel}
                    onClick={onToggleWireframe}
                    title="Toggle wireframe - W"
                >
                    <TbPolygon />
                    <span>Wire</span>
                </button>

                <button
                    type="button"
                    className={buttonClass(autoRotate)}
                    disabled={!hasModel}
                    onClick={onToggleAutoRotate}
                    title="Auto rotate"
                >
                    <FiRotateCw />
                    <span>Rotate</span>
                </button>
            </div>

            <div className={styles.group}>
                <button
                    type="button"
                    className={styles.button}
                    disabled={!hasModel}
                    onClick={onScreenshot}
                    title="Save screenshot - P"
                >
                    <FiCamera />
                    <span>Capture</span>
                </button>

                <button
                    type="button"
                    className={styles.button}
                    onClick={onFullscreen}
                    title="Fullscreen"
                >
                    {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}

                    <span>{isFullscreen ? "Exit" : "Full"}</span>
                </button>
            </div>
        </div>
    );
};

export default ViewerToolbar;
