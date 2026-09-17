const FILE_SIZE_UNITS = ["B", "KB", "MB", "GB", "TB"];

const formatFileSize = (bytes) => {
    if (bytes === null || bytes === undefined) {
        return "Sample asset";
    }

    if (!Number.isFinite(bytes) || bytes < 0) {
        return "-";
    }

    if (bytes === 0) {
        return "0 B";
    }

    const unitIndex = Math.min(
        Math.floor(Math.log(bytes) / Math.log(1024)),
        FILE_SIZE_UNITS.length - 1,
    );

    const value = bytes / 1024 ** unitIndex;

    const decimals =
        unitIndex === 0 ? 0 : value >= 100 ? 0 : value >= 10 ? 1 : 2;

    return `${value.toFixed(decimals)} ${FILE_SIZE_UNITS[unitIndex]}`;
};

export default formatFileSize;
