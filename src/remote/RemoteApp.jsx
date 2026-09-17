import ViewerApp from "../components/ViewerApp";
import styles from "./RemoteApp.module.css";

const RemoteApp = ({ assetBaseUrl }) => {
    return (
        <div className={styles.root}>
            <ViewerApp assetBaseUrl={assetBaseUrl} />
        </div>
    );
};

export default RemoteApp;
