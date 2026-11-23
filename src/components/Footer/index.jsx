import {
    FaCodepen,
    FaGithub,
    FaGlobe,
    FaHandHoldingHeart,
    FaLinkedinIn,
} from "react-icons/fa6";
import styles from "./styles.module.css";

const links = [
    {
        label: "Portfolio",
        url: "https://www.ashishranjan.net",
        Icon: FaGlobe,
    },
    {
        label: "GitHub",
        url: "https://github.com/a2rp",
        Icon: FaGithub,
    },
    {
        label: "CodePen",
        url: "https://codepen.io/ash1198",
        Icon: FaCodepen,
    },
    {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/aashishranjan",
        Icon: FaLinkedinIn,
    },
    {
        label: "Support",
        url: "https://a2rp-donation-page.netlify.app/",
        Icon: FaHandHoldingHeart,
    },
];

const Footer = () => {
    return (
        <footer className={styles.wrapper}>
            <div className={styles.inner}>
                <p className={styles.text}>
                    &copy; {new Date().getFullYear()} Developed by{" "}
                    <a
                        href="https://www.ashishranjan.net"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Ashish Ranjan
                    </a>
                </p>

                <nav className={styles.links} aria-label="Footer links">
                    {links.map(({ label, url, Icon }) => (
                        <a
                            key={label}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Icon aria-hidden="true" />
                            <span>{label}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
