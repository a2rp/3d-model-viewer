import { FiPause, FiPlay, FiRepeat, FiSquare } from "react-icons/fi";
import styles from "./styles.module.css";

const AnimationControls = ({
    animationNames,
    activeAnimation,
    isPlaying,
    loop,
    playbackSpeed,
    onAnimationChange,
    onPlayPause,
    onStop,
    onLoopChange,
    onSpeedChange,
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <span className={styles.label}>ANIMATION</span>

                <select
                    className={styles.select}
                    value={activeAnimation}
                    onChange={(event) => onAnimationChange(event.target.value)}
                >
                    {animationNames.map((name) => (
                        <option key={name} value={name}>
                            {name || "Unnamed animation"}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.controls}>
                <button
                    type="button"
                    className={styles.button}
                    onClick={onPlayPause}
                    title={isPlaying ? "Pause animation" : "Play animation"}
                >
                    {isPlaying ? <FiPause /> : <FiPlay />}
                </button>

                <button
                    type="button"
                    className={styles.button}
                    onClick={onStop}
                    title="Stop animation"
                >
                    <FiSquare />
                </button>

                <button
                    type="button"
                    className={`${styles.button} ${loop ? styles.active : ""}`}
                    onClick={() => onLoopChange(!loop)}
                    title="Loop animation"
                >
                    <FiRepeat />
                </button>

                <label className={styles.speed}>
                    <span>{playbackSpeed.toFixed(1)}x</span>

                    <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={playbackSpeed}
                        onChange={(event) =>
                            onSpeedChange(Number(event.target.value))
                        }
                    />
                </label>
            </div>
        </div>
    );
};

export default AnimationControls;
