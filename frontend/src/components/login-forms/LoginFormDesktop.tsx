import styles from "./LoginFormDesktop.module.css";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import Logo from "../logo/Logo";
import LoginFormDesktopContainer from "./LoginFormDesktopContainer.tsx";

interface LoginFormDesktopProps {
  showMessage: (string: { username: string }) => void;
  onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
  saveUser: (string: { username: string }) => void;
}

const LoginFormDesktop = ({
  showMessage,
  onFinishFailed,
  saveUser,
}: LoginFormDesktopProps) => {
  return (
    <main className={styles.container}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.loginText}>
          <h2>
            {"Taste, Rate, Repeat -"}
            <br /> {"The craft beer journey"}
          </h2>
          <p>
            {"Join the RateMyBrew community to unlock exclusive"}
            <br />
            {"features and be part of a global craft beer conversation."}
          </p>
        </div>
        <LoginFormDesktopContainer
          showMessage={showMessage}
          onFinishFailed={onFinishFailed}
          saveUser={saveUser}
        />
      </div>
    </main>
  );
};

export default LoginFormDesktop;
