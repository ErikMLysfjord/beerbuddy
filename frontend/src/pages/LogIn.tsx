import { App } from "antd";
import useWindowDimensions from "../utils/useWindowDimensions";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import LoginFormMobile from "../components/login-forms/LoginFormMobile";
import LoginFormDesktop from "../components/login-forms/LoginFormDesktop";

const onFinishFailed = (
  errorInfo: ValidateErrorEntity<{ username: string; password: string }>
) => {
  console.log("Failed:", errorInfo);
};

const LogInPage = () => {
  const { message } = App.useApp();
  const { width } = useWindowDimensions();

  const showMessage = (string: {
    username: string;
    password: string;
    repeatPassword?: string;
    email?: string;
  }) => {
    message.success(
      string.username +
        " " +
        string.password +
        " " +
        (string.repeatPassword ? string.repeatPassword + " " : " ") +
        (string.email ? string.email : "")
    );
  };

  if (width < 768) {
    return (
      <LoginFormMobile
        showMessage={showMessage}
        onFinishFailed={onFinishFailed}
      />
    );
  }
  return (
    <LoginFormDesktop
      showMessage={showMessage}
      onFinishFailed={onFinishFailed}
    />
  );
};

export default LogInPage;
