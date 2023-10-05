import { Form, Input, Button, Card, theme } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import HopsUpLogo from "../../assets/hopsup.svg";
import styles from "./LoginFormMobile.module.css";

const { useToken } = theme;

type FieldType = {
  username?: string;
  password?: string;
};

interface LoginFormMobileProps {
  showMessage: (string: { username: string; password: string }) => void;
  onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
}

const LoginFormMobile = ({
  showMessage,
  onFinishFailed,
}: LoginFormMobileProps) => {
  const { token } = useToken();
  return (
    <div className={styles.mobileContainer}>
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
        <h1 className={styles.loginFormHeaderMobile}>Log in</h1>
        <Form
          name="basic"
          className={styles.loginFormMobile}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={showMessage}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            className={styles.loginFormUsername}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className={styles.loginFormPasswordContainer} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <a
          style={{ color: token.colorPrimary }}
          className={styles.loginLink}
          href="/"
        >
          {"Not a user? Sign up here"}
        </a>
      </Card>
    </div>
  );
};

export default LoginFormMobile;
