import { Card, theme } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import styles from "./LoginFormMobile.module.css";
import LoginFormMobileContainer from "./LoginFormMobileContainer";
import Logo from "../logo/Logo";

/**
 * Ant Design theme token used for custom styling of antd components.
 */
const { useToken } = theme;

interface LoginFormMobileProps {
  onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
  saveUser: (string: { username: string }) => void;
}

/**
 * Mobile version of the login form component.
 * Contains a sales pitch and the login form.
 * @param onFinishFailed - function that is called when the form is submitted and fails validation
 * @param saveUser - function that is called when the form is submitted and passes validation
 * @returns - the mobile login form component
 */
const LoginFormMobile = ({
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
          onFinishFailed={onFinishFailed}
          saveUser={saveUser}
        />
      </Card>
    </main>
  );
};

export default LoginFormMobile;
