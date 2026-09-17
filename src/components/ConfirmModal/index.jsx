import { useEffect } from "react";
import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const ConfirmModal = ({
    open,
    title = "Confirm action",
    message = "Are you sure you want to continue?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    danger = false,
    onConfirm,
    onCancel,
}) => {
    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onCancel?.();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onCancel]);

    if (!open) {
        return null;
    }

    return (
        <div
            className={styles.overlay}
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onCancel?.();
                }
            }}
        >
            <div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-modal-title"
                aria-describedby="confirm-modal-message"
            >
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={onCancel}
                    aria-label="Close confirmation"
                >
                    <FiX />
                </button>

                <div
                    className={`${styles.icon} ${
                        danger ? styles.dangerIcon : ""
                    }`}
                >
                    {danger ? <FiTrash2 /> : <FiAlertTriangle />}
                </div>

                <span className={styles.label}>CONFIRM ACTION</span>

                <h2 id="confirm-modal-title" className={styles.title}>
                    {title}
                </h2>

                <p id="confirm-modal-message" className={styles.message}>
                    {message}
                </p>

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        className={`${styles.confirmButton} ${
                            danger ? styles.dangerButton : ""
                        }`}
                        onClick={onConfirm}
                    >
                        {danger && <FiTrash2 />}
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
