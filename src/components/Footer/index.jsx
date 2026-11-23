import styles from "./styles.module.css";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.wrapper}>
            <div className={styles.inner}>
                <p className={styles.text}>
                    &copy; {year} All rights reserved.
                </p>

                <p className={styles.credit}>
                    Developed by{" "}
                    <a
                        href="https://www.ashishranjan.net"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Ashish Ranjan
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
