import styles from "./LoginFormDesktop.module.css";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import Logo from "../logo/Logo";
import LoginFormDesktopContainer from "./LoginFormDesktopContainer.tsx";

interface LoginFormDesktopProps {
  onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
  saveUser: (string: { username: string }) => void;
}

/**
 * Desktop version of the login form component.
 * Contains a sales pitch and the login form.
 * @param onFinishFailed - function that is called when the form is submitted and fails validation
 * @param saveUser - function that is called when the form is submitted and passes validation
 * @returns
 */
const LoginFormDesktop = ({
  onFinishFailed,
  saveUser,
}: LoginFormDesktopProps) => {
  return (
    <main className={styles.container}>
      <header className={styles.logoContainer}>
        <Logo />
      </header>
      <div className={styles.loginContainer}>
        <section className={styles.loginText}>
          <h2>
            {"Taste, Rate, Repeat -"}
            <br /> {"The craft beer journey"}
          </h2>
          <p>
            {"Join the RateMyBrew community to unlock exclusive"}
            <br />
            {"features and be part of a global craft beer conversation."}
          </p>
        </section>
        <LoginFormDesktopContainer
          onFinishFailed={onFinishFailed}
          saveUser={saveUser}
        />
      </div>
    </main>
  );
};

export default LoginFormDesktop;
