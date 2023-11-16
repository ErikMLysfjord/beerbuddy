import { Form, Input, Button } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import styles from "./LoginFormMobile.module.css";

//? What is this
type FieldType = {
  username?: string;
  password?: string;
};

interface LoginFormMobileProps {
  onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
  saveUser: (string: { username: string }) => void;
}

/**
 * Mobile version of the login form component.
 * Contains the actual form that is rendered in LoginFormMobile.tsx.
 * @param onFinishFailed - function that is called when the form is submitted and fails validation
 * @param saveUser - function that is called when the form is submitted and passes validation
 * @returns
 */
const LoginFormMobile = ({
  onFinishFailed,
  saveUser,
}: LoginFormMobileProps) => {
  return (
    <section>
      <h1 className={styles.loginFormHeaderMobile}>Log in</h1>
      <Form
        name="basic"
        className={styles.loginFormMobile}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={(values) => {
          saveUser({ username: values.username });
        }}
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
    </section>
  );
};

export default LoginFormMobile;
