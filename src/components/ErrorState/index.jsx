import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const ErrorState = ({ message, onDismiss, onClear }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.icon}>
                    <FiAlertTriangle />
                </div>

                <span className={styles.label}>MODEL ERROR</span>

                <h2 className={styles.title}>Unable to continue</h2>

                <p className={styles.text}>
                    {message || "The selected model could not be loaded."}
                </p>

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={onDismiss}
                    >
                        <FiX />
                        Dismiss
                    </button>

                    {onClear && (
                        <button
                            type="button"
                            className={`${styles.button} ${styles.danger}`}
                            onClick={onClear}
                        >
                            <FiTrash2 />
                            Remove model
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErrorState;
