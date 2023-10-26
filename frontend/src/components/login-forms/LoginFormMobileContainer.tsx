import { Form, Input, Button } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import styles from "./LoginFormMobile.module.css";

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
  return (
    <main>
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
    </main>
  );
};

export default LoginFormMobile;
