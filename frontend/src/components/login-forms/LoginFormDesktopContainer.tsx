import styles from "./LoginFormDesktop.module.css";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { Card, Form, Input, Button, theme } from "antd";

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
    <main className={styles.loginFormContainer}>
      <Card
        style={{
          height: "100%",
          backgroundColor: token.colorPrimaryBg,
        }}
        bodyStyle={{ padding: "20", height: "100%" }}>
        <h1>Log in</h1>
        <Form
          name="basic"
          className={styles.loginForm}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={showMessage}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}>
            <Input.Password className={styles.loginFormPasswordContainer} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </main>
  );
};

export default LoginFormDesktop;
