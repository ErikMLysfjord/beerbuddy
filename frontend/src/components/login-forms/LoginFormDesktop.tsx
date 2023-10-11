import styles from "./LoginFormDesktop.module.css";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { theme } from "antd";
import Logo from "../logo/Logo";
import LoginFormDesktopContainer from "./LoginFormDesktopContainer.tsx";
import RegisterFormDesktopContainer from "./RegisterFormDesktopContainer.tsx";

const { useToken } = theme;

interface LoginFormDesktopProps {
  showMessage: (string: { username: string; password: string }) => void;
  onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
}

//chose last index of pathname to determine if login or signup
const login = window.location.pathname.split("/")[2] === "login";

const LoginFormDesktop = ({
  showMessage,
  onFinishFailed,
}: LoginFormDesktopProps) => {
  const { token } = useToken();
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
          <a
            style={{ color: token.colorPrimary }}
            className={styles.loginLink}
            href={"/project2/" + (login ? "signup" : "login")}
            tabIndex={0}>
            {login ? "Not a user? Sign up here" : "Already a user? Log in here"}
          </a>
        </div>
        {login ? (
          <LoginFormDesktopContainer
            showMessage={showMessage}
            onFinishFailed={onFinishFailed}
          />
        ) : (
          <RegisterFormDesktopContainer
            showMessage={showMessage}
            onFinishFailed={onFinishFailed}
          />
        )}
      </div>
    </main>
  );
};

export default LoginFormDesktop;
