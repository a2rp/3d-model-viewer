import styles from "./styles.module.css";

const LoadingOverlay = ({ progress = 0 }) => {
    const safeProgress = Math.min(100, Math.max(0, progress));

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.spinner} />

                <span className={styles.label}>LOADING MODEL</span>

                <strong className={styles.progress}>
                    {Math.round(safeProgress)}%
                </strong>

                <div className={styles.track}>
                    <div
                        className={styles.bar}
                        style={{
                            width: `${safeProgress}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
