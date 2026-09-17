import { useEffect } from "react";
import { FiCheckCircle, FiInfo, FiX } from "react-icons/fi";
import appConfig from "../../config/appConfig";
import styles from "./styles.module.css";

const SupportedFormatsModal = ({ open, onClose }) => {
    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, open]);

    if (!open) {
        return null;
    }

    return (
        <div
            className={styles.overlay}
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose?.();
                }
            }}
        >
            <section
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="formats-title"
            >
                <header className={styles.header}>
                    <div>
                        <span className={styles.label}>FILE GUIDE</span>

                        <h2 id="formats-title" className={styles.title}>
                            Supported 3D formats
                        </h2>

                        <p className={styles.intro}>
                            Choose the format that best matches your model
                            source and workflow.
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close file guide"
                    >
                        <FiX />
                    </button>
                </header>

                <div className={styles.recommendation}>
                    <FiCheckCircle />

                    <div>
                        <strong>Recommended: GLB</strong>

                        <p>
                            GLB is the easiest and most reliable format for
                            browser viewing because geometry, materials,
                            textures and animations can be packaged into one
                            file.
                        </p>
                    </div>
                </div>

                <section className={styles.viewerInfo}>
                    <span className={styles.sectionLabel}>VIEWER BEHAVIOR</span>

                    <h3 className={styles.viewerInfoTitle}>
                        What this viewer does
                    </h3>

                    <div className={styles.infoGrid}>
                        {Object.values(appConfig.viewerInformation).map(
                            (item) => (
                                <article
                                    key={item.title}
                                    className={styles.infoCard}
                                >
                                    <h4>{item.title}</h4>

                                    <p>{item.text}</p>
                                </article>
                            ),
                        )}
                    </div>
                </section>

                <div className={styles.formatGrid}>
                    {appConfig.supportedFormats.map((format) => (
                        <article
                            key={format.extension}
                            className={styles.formatCard}
                        >
                            <div className={styles.formatHeader}>
                                <div>
                                    <span className={styles.extension}>
                                        .{format.extension}
                                    </span>

                                    <h3>{format.label}</h3>
                                </div>

                                <span className={styles.status}>
                                    {format.level}
                                </span>
                            </div>

                            <p className={styles.formatName}>{format.name}</p>

                            <dl className={styles.details}>
                                <div>
                                    <dt>Typical use</dt>
                                    <dd>{format.use}</dd>
                                </div>

                                <div>
                                    <dt>Can contain</dt>
                                    <dd>{format.contains}</dd>
                                </div>

                                <div>
                                    <dt>Important</dt>
                                    <dd>{format.note}</dd>
                                </div>
                            </dl>
                        </article>
                    ))}
                </div>

                <section className={styles.unsupported}>
                    <div className={styles.sectionHeading}>
                        <FiInfo />

                        <div>
                            <h3>Formats that require conversion</h3>

                            <p>
                                These project or CAD formats are not directly
                                loaded by this browser viewer.
                            </p>
                        </div>
                    </div>

                    <div className={styles.unsupportedGrid}>
                        {appConfig.unsupportedFormats.map((item) => (
                            <div
                                key={item.formats}
                                className={styles.unsupportedItem}
                            >
                                <strong>{item.formats}</strong>

                                <span>{item.reason}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className={styles.footer}>
                    <p>
                        For best portability, convert complex or proprietary
                        models to GLB before loading them into the viewer.
                    </p>

                    <button
                        type="button"
                        className={styles.doneButton}
                        onClick={onClose}
                    >
                        Done
                    </button>
                </footer>
            </section>
        </div>
    );
};

export default SupportedFormatsModal;
