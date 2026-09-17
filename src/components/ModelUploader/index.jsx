import { useRef, useState } from "react";
import {
    FiBox,
    FiFolderPlus,
    FiInfo,
    FiTrash2,
    FiUploadCloud,
} from "react-icons/fi";
import {
    MODEL_ACCEPT_STRING,
    SUPPORTED_MODEL_EXTENSIONS,
} from "../../utils/modelFile";
import styles from "./styles.module.css";

const ModelUploader = ({
    hasModel,
    modelName,
    onFileSelect,
    onLoadSample,
    onClear,
    onOpenGuide,
}) => {
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    const handleFiles = (files) => {
        const file = files?.[0];

        if (file) {
            onFileSelect(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        handleFiles(event.dataTransfer.files);
    };

    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <div>
                    <span className={styles.label}>MODEL SOURCE</span>

                    <h2 className={styles.title}>Load a model</h2>
                </div>

                <FiBox />
            </div>

            <div
                className={`${styles.dropzone} ${
                    dragging ? styles.dragging : ""
                }`}
                onDragEnter={(event) => {
                    event.preventDefault();
                    setDragging(true);
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
            >
                <FiUploadCloud className={styles.uploadIcon} />

                <p className={styles.dropTitle}>Drop your model here</p>

                <p className={styles.dropText}>Best choice: GLB</p>

                <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={() => inputRef.current?.click()}
                >
                    <FiFolderPlus />
                    Choose model
                </button>

                <input
                    ref={inputRef}
                    className={styles.input}
                    type="file"
                    accept={MODEL_ACCEPT_STRING}
                    onChange={(event) => {
                        handleFiles(event.target.files);
                        event.target.value = "";
                    }}
                />
            </div>

            <div className={styles.formatSummary}>
                <span>
                    {SUPPORTED_MODEL_EXTENSIONS.map((type) =>
                        type.toUpperCase(),
                    ).join(" · ")}
                </span>

                <button
                    type="button"
                    className={styles.guideButton}
                    onClick={onOpenGuide}
                >
                    <FiInfo />
                    File guide
                </button>
            </div>

            {hasModel && (
                <div className={styles.currentModel}>
                    <span className={styles.modelName}>{modelName}</span>

                    <button
                        type="button"
                        className={styles.removeButton}
                        onClick={onClear}
                        title="Remove model"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            )}

            <button
                type="button"
                className={styles.sampleButton}
                onClick={onLoadSample}
            >
                Load sample model
            </button>

            <p className={styles.note}>
                Models are processed locally in your browser. GLB is recommended
                for the most reliable single-file experience. Formats that
                reference separate textures, materials or binary files may load
                without those external resources.
            </p>
        </section>
    );
};

export default ModelUploader;
