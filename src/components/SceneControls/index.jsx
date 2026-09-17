import { FiSliders } from "react-icons/fi";
import styles from "./styles.module.css";

const environments = [
    "studio",
    "city",
    "apartment",
    "warehouse",
    "forest",
    "sunset",
    "dawn",
    "night",
    "park",
    "lobby",
    "none",
];

const SceneControls = ({ viewerState, onChange }) => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <div>
                    <span className={styles.label}>SCENE</span>

                    <h2 className={styles.title}>Viewer controls</h2>
                </div>

                <FiSliders />
            </div>

            <div className={styles.control}>
                <div className={styles.controlHeader}>
                    <span>Background</span>

                    <span className={styles.value}>
                        {viewerState.background}
                    </span>
                </div>

                <input
                    className={styles.colorInput}
                    type="color"
                    value={viewerState.background}
                    onChange={(event) =>
                        onChange("background", event.target.value)
                    }
                />
            </div>

            <label className={styles.control}>
                <span>Environment</span>

                <select
                    className={styles.select}
                    value={viewerState.environment}
                    onChange={(event) =>
                        onChange("environment", event.target.value)
                    }
                >
                    {environments.map((environment) => (
                        <option key={environment} value={environment}>
                            {environment}
                        </option>
                    ))}
                </select>
            </label>

            <div className={styles.control}>
                <div className={styles.controlHeader}>
                    <span>Light intensity</span>

                    <span className={styles.value}>
                        {viewerState.lightIntensity.toFixed(1)}
                    </span>
                </div>

                <input
                    className={styles.range}
                    type="range"
                    min="0"
                    max="4"
                    step="0.1"
                    value={viewerState.lightIntensity}
                    onChange={(event) =>
                        onChange("lightIntensity", Number(event.target.value))
                    }
                />
            </div>

            <div className={styles.switches}>
                <label className={styles.switchRow}>
                    <span>Grid</span>

                    <input
                        type="checkbox"
                        checked={viewerState.showGrid}
                        onChange={(event) =>
                            onChange("showGrid", event.target.checked)
                        }
                    />
                </label>

                <label className={styles.switchRow}>
                    <span>Axes</span>

                    <input
                        type="checkbox"
                        checked={viewerState.showAxes}
                        onChange={(event) =>
                            onChange("showAxes", event.target.checked)
                        }
                    />
                </label>

                <label className={styles.switchRow}>
                    <span>Wireframe</span>

                    <input
                        type="checkbox"
                        checked={viewerState.wireframe}
                        onChange={(event) =>
                            onChange("wireframe", event.target.checked)
                        }
                    />
                </label>

                <label className={styles.switchRow}>
                    <span>Auto rotate</span>

                    <input
                        type="checkbox"
                        checked={viewerState.autoRotate}
                        onChange={(event) =>
                            onChange("autoRotate", event.target.checked)
                        }
                    />
                </label>

                <label className={styles.switchRow}>
                    <span>Shadows</span>

                    <input
                        type="checkbox"
                        checked={viewerState.shadows}
                        onChange={(event) =>
                            onChange("shadows", event.target.checked)
                        }
                    />
                </label>
            </div>
        </section>
    );
};

export default SceneControls;
