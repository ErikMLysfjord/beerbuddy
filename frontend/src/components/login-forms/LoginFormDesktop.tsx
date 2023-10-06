import styles from "./LoginFormDesktop.module.css";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { Card, Form, Input, Button, theme } from "antd";
import Logo from "../logo/Logo";

const { useToken } = theme;

type FieldType = {
  username?: string;
  password?: string;
};

interface LoginFormDesktopProps {
  showMessage: (string: { username: string; password: string }) => void;
  onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
}

const LoginFormDesktop = ({
  showMessage,
  onFinishFailed,
}: LoginFormDesktopProps) => {
  const { token } = useToken();
  return (
    <div className={styles.container}>
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
            href="/"
          >
            {"Not a user? Sign up here"}
          </a>
        </div>
        <div className={styles.loginFormContainer}>
          <Card
            style={{
              height: "100%",
              backgroundColor: token.colorPrimaryBg,
            }}
            bodyStyle={{ padding: "20", height: "100%" }}
          >
            <h1>Log in</h1>
            <Form
              name="basic"
              className={styles.loginForm}
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={showMessage}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginFormDesktop;
