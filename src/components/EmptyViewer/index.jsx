import { TbCube3dSphere } from "react-icons/tb";
import styles from "./styles.module.css";

const EmptyViewer = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.iconWrapper}>
                <TbCube3dSphere />
            </div>

            <span className={styles.label}>3D WORKSPACE</span>

            <h2 className={styles.title}>Your model will appear here</h2>

            <p className={styles.text}>
                Load a model from the control panel to inspect it with orbit
                controls, lighting, wireframe mode, animations, model
                statistics, screenshots, and more.
            </p>

            <div className={styles.formats}>
                <span>GLB</span>
                <span>GLTF</span>
                <span>OBJ</span>
                <span>STL</span>
            </div>

            <div className={styles.shortcuts}>
                <span>R - Reset</span>
                <span>F - Fit</span>
                <span>G - Grid</span>
                <span>W - Wireframe</span>
                <span>P - Screenshot</span>
            </div>
        </div>
    );
};

export default EmptyViewer;
