import { FiBox, FiExternalLink, FiGithub } from "react-icons/fi";
import styles from "./styles.module.css";

const Header = () => {
    return (
        <header className={styles.wrapper}>
            <div className={styles.inner}>
                <a
                    className={styles.brand}
                    href="https://www.ashishranjan.net"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        className={styles.logo}
                        src={`${import.meta.env.BASE_URL}logo.png`}
                        alt="Ashish Ranjan"
                    />

                    <div>
                        <span className={styles.title}>3D Model Viewer</span>

                        <span className={styles.subtitle}>
                            Interactive browser-based model inspector
                        </span>
                    </div>
                </a>

                <div className={styles.actions}>
                    <span className={styles.badge}>
                        <FiBox />
                        12 Supported Formats
                    </span>

                    <a
                        className={styles.button}
                        href="https://github.com/a2rp/3d-model-viewer"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FiGithub />
                        GitHub
                        <FiExternalLink />
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
