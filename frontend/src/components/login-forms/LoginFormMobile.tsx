import { Card, theme } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import HopsUpLogo from "../../assets/hopsup.svg";
import styles from "./LoginFormMobile.module.css";
import LoginFormMobileContainer from "./LoginFormMobileContainer";
import RegisterFormMobileContainer from "./RegisterFormMobileContainer";

const { useToken } = theme;

interface LoginFormMobileProps {
  showMessage: (string: { username: string; password: string }) => void;
  onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
}

//chose last index of pathname to determine if login or signup
const login = window.location.pathname.split("/")[2] === "login";

const LoginFormMobile = ({
  showMessage,
  onFinishFailed,
}: LoginFormMobileProps) => {
  const { token } = useToken();
  return (
    <main className={styles.mobileContainer}>
      <a className={styles.logo} href="/" aria-label="HopsUp">
        <img src={HopsUpLogo} alt="HopsUp-logo" />
        <span>HopsUp</span>
      </a>

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
