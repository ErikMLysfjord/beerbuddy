import { Button } from "antd";
import styles from "./FallbackPage.module.css";

const FallbackPage = () => {
    return (
        <main className={styles.outerWrapper}>
            <div className={styles.innerWrapper}>
                <div>

                </div>
                <img
                    src="/project2/teku.svg"
                    alt="BeerBuddy logo"
                    className={styles.logo}
                />
                <h1>The page you were looking was not found!</h1>
                <Button
                    type="primary"
                    href="/project2"
                >
                    Return to dashboard
                </Button>
            </div>
        </main>
    );
};

export default FallbackPage;
