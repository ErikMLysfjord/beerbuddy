import { App } from "antd";
import useWindowDimensions from "../utils/useWindowDimensions";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import LoginFormMobile from "../components/login-forms/LoginFormMobile";
import LoginFormDesktop from "../components/login-forms/LoginFormDesktop";
import { v4 } from "uuid";

const onFinishFailed = (
  errorInfo: ValidateErrorEntity<{ username: string }>
) => {
  console.log("Failed:", errorInfo);
};

const LogInPage = () => {
  const { message } = App.useApp();
  const { width } = useWindowDimensions();

  if (localStorage.getItem("userNameBeerBuddy")) {
    if (!localStorage.getItem("userIdBeerBuddy")) {
      localStorage.setItem("userIdBeerBuddy", v4());
    }
    window.location.replace("/");
  }

  const showMessage = (string: { username: string }) => {
    message.success("Welcome " + string.username + "!");
  };

  const saveUser = (string: { username: string }) => {
    if (!localStorage.getItem("userIdBeerBuddy")) {
      localStorage.setItem("userIdBeerBuddy", v4());
    }

    localStorage.setItem("userNameBeerBuddy", string.username);
    window.location.replace("/");
  };

  if (width < 768) {
    return (
      <LoginFormMobile
        showMessage={showMessage}
        onFinishFailed={onFinishFailed}
        saveUser={saveUser}
      />
    );
  }
  return (
    <LoginFormDesktop
      showMessage={showMessage}
      onFinishFailed={onFinishFailed}
      saveUser={saveUser}
    />
  );
};

export default LogInPage;
