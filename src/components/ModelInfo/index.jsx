import { FiInfo } from "react-icons/fi";
import styles from "./styles.module.css";

const formatFileSize = (bytes) => {
    if (bytes === null || bytes === undefined) {
        return "Sample asset";
    }

    if (bytes === 0) {
        return "0 B";
    }

    const units = ["B", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    const value = bytes / 1024 ** index;

    return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
};

const formatNumber = (value) => {
    if (value === undefined || value === null) {
        return "-";
    }

    return new Intl.NumberFormat().format(value);
};

const formatDimension = (value) => {
    if (!Number.isFinite(value)) {
        return "-";
    }

    return value.toFixed(3);
};

const ModelInfo = ({ model, stats }) => {
    const rows = [
        {
            label: "File",
            value: model?.name || "-",
        },
        {
            label: "Format",
            value: model?.type ? model.type.toUpperCase() : "-",
        },
        {
            label: "Size",
            value: model ? formatFileSize(model.size) : "-",
        },
        {
            label: "Meshes",
            value: formatNumber(stats?.meshes),
        },
        {
            label: "Vertices",
            value: formatNumber(stats?.vertices),
        },
        {
            label: "Triangles",
            value: formatNumber(stats?.triangles),
        },
        {
            label: "Materials",
            value: formatNumber(stats?.materials),
        },
        {
            label: "Animations",
            value: formatNumber(stats?.animations),
        },
    ];

    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <div>
                    <span className={styles.label}>INSPECTOR</span>

                    <h2 className={styles.title}>Model information</h2>
                </div>

                <FiInfo />
            </div>

            <div className={styles.rows}>
                {rows.map((row) => (
                    <div key={row.label} className={styles.row}>
                        <span>{row.label}</span>

                        <strong>{row.value}</strong>
                    </div>
                ))}
            </div>

            <div className={styles.dimensions}>
                <span className={styles.dimensionTitle}>Dimensions</span>

                <div className={styles.dimensionGrid}>
                    <div>
                        <span>X</span>
                        <strong>{formatDimension(stats?.dimensions?.x)}</strong>
                    </div>

                    <div>
                        <span>Y</span>
                        <strong>{formatDimension(stats?.dimensions?.y)}</strong>
                    </div>

                    <div>
                        <span>Z</span>
                        <strong>{formatDimension(stats?.dimensions?.z)}</strong>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModelInfo;
