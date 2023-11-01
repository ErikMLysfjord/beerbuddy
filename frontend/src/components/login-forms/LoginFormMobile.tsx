import { Card, theme } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import styles from "./LoginFormMobile.module.css";
import LoginFormMobileContainer from "./LoginFormMobileContainer";
import RegisterFormMobileContainer from "./RegisterFormMobileContainer";
import Logo from "../logo/Logo";

const { useToken } = theme;

const login = true; //change to real logic later

interface LoginFormMobileProps {
  showMessage: (string: { username: string }) => void;
  onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
  saveUser: (string: { username: string }) => void;
}

const LoginFormMobile = ({
  showMessage,
  onFinishFailed,
  saveUser,
}: LoginFormMobileProps) => {
  const { token } = useToken();
  return (
    <main className={styles.mobileContainer}>
      <header className={styles.logoSection}>
        <Logo />
      </header>

      <Card
        style={{
          backgroundColor: token.colorPrimaryBg,
        }}
        className={styles.mobileCard}
      >
        {login ? (
          <LoginFormMobileContainer
            showMessage={showMessage}
            onFinishFailed={onFinishFailed}
            saveUser={saveUser}
          />
        ) : (
          <RegisterFormMobileContainer
            showMessage={showMessage}
            onFinishFailed={onFinishFailed}
          />
        )}
        <a
          style={{ color: token.colorPrimary }}
          className={styles.loginLink}
          href={"/project2/" + (login ? "signup" : "login")}
          tabIndex={0}
        >
          {login ? "Not a user? Sign up here" : "Already a user? Log in here"}
        </a>
      </Card>
    </main>
  );
};

export default LoginFormMobile;
