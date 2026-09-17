import styles from "./styles.module.css";

const links = [
    {
        label: "Portfolio",
        url: "https://www.ashishranjan.net",
    },
    {
        label: "GitHub",
        url: "https://github.com/a2rp",
    },
    {
        label: "CodePen",
        url: "https://codepen.io/ash1198",
    },
    {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/aashishranjan",
    },
    {
        label: "Support",
        url: "https://a2rp-donation-page.netlify.app/",
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
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
