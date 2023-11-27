import styles from "./LoginFormDesktop.module.css";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { Card, Form, Input, Button, theme } from "antd";

const { useToken } = theme;

interface LoginFormDesktopProps {
  onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
  saveUser: (string: { username: string }) => void;
}

/**
 * Desktop version of the login form component.
 * Contains the actual form that is rendered in LoginFormDesktop.tsx.
 * @param onFinishFailed - function that is called when the form is submitted and fails validation
 * @param saveUser - function that is called when the form is submitted and passes validation
 * @returns
 */
const LoginFormDesktop = ({
  onFinishFailed,
  saveUser,
}: LoginFormDesktopProps) => {
  const { token } = useToken();
  return (
    <section className={styles.loginFormContainer} aria-label="Login form">
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
          onFinish={(values) => {
            saveUser({ username: values.username });
          }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
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
    </section>
  );
};

export default LoginFormDesktop;
