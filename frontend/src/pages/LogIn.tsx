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

const fetchLoginId = async (username: string, uuid: string) => {
  const res = await fetch("http://localhost:4000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `{ loginOrSignUp(username: "${username}" uuid: "${uuid}") }`,
    }),
  }).then((r) => r.json());

  if (!localStorage.getItem("userIdBeerBuddy")) {
    localStorage.setItem("userIdBeerBuddy", res.data.loginOrSignUp);
  }
  window.location.replace("/");
};

const LogInPage = () => {
  const { message } = App.useApp();
  const { width } = useWindowDimensions();
  const username = localStorage.getItem("userNameBeerBuddy");

  if (username) {
    fetchLoginId(username, v4());
  }

  const showMessage = (string: { username: string }) => {
    message.success("Welcome " + string.username + "!");
  };

  const saveUser = (string: { username: string }) => {
    if (!localStorage.getItem("userIdBeerBuddy")) {
      fetchLoginId(string.username, v4());
    }
    localStorage.setItem("userNameBeerBuddy", string.username);
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
