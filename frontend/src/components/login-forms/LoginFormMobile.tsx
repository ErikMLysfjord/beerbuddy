import { Card, theme } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import styles from "./LoginFormMobile.module.css";
import LoginFormMobileContainer from "./LoginFormMobileContainer";
import Logo from "../logo/Logo";

const { useToken } = theme;

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
        <LoginFormMobileContainer
          showMessage={showMessage}
          onFinishFailed={onFinishFailed}
          saveUser={saveUser}
        />
      </Card>
    </main>
  );
};

export default LoginFormMobile;
