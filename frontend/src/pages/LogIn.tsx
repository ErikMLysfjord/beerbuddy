import { App } from "antd";
import useWindowDimensions from "../utils/useWindowDimensions";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import LoginFormMobile from "../components/login-forms/LoginFormMobile";
import LoginFormDesktop from "../components/login-forms/LoginFormDesktop";
import { v4 } from "uuid";
import { useEffect, useState } from "react";

/**
 * Callback for when the form fails to validate.
 * @param errorInfo - the error info from the form
 */
const onFinishFailed = (
  errorInfo: ValidateErrorEntity<{ username: string }>
) => {
  console.error("Failed:", errorInfo);
};

/**
 * Fetches the login id from the backend.
 * @param username - the username to login with
 * @param uuid - the user id to login with
 * @param setIsNewUser - function to set isNewUser
 * @param isNewUser - the isNewUser state
 */
const fetchLoginId = async (
  username: string,
  uuid: string,
  setIsNewUser: React.Dispatch<React.SetStateAction<string>>,
  isNewUser: string
) => {
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
    localStorage.setItem("userIdBeerBuddy", res.data.loginOrSignUp.id);
  }

  if (!isNewUser) {
    setIsNewUser(res.data.loginOrSignUp.isNewUser);
  }

  await setTimeout(() => {
    window.location.replace("/project2");
  }, 2000);
};

/**
 * LogInPage component that displays the login form.
 * @returns a LogInPage component
 */
const LogInPage = () => {
  const { message } = App.useApp();
  const { width } = useWindowDimensions();
  const username = localStorage.getItem("userNameBeerBuddy");
  const [isNewUser, setIsNewUser] = useState("");

  if (username) {
    fetchLoginId(username, v4(), setIsNewUser, isNewUser);
  }

  useEffect(() => {
    if (isNewUser) {
      message.success(
        isNewUser === "no"
          ? "Welcome back " + username + "!"
          : "Created new user " + username + "!"
      );
    }
  }, [isNewUser, message, username]);

  const saveUser = (string: { username: string }) => {
    if (!localStorage.getItem("userIdBeerBuddy")) {
      fetchLoginId(string.username, v4(), setIsNewUser, isNewUser);
    }
    localStorage.setItem("userNameBeerBuddy", string.username);
  };

  if (width < 768) {
    return (
      <LoginFormMobile onFinishFailed={onFinishFailed} saveUser={saveUser} />
    );
  }
  return (
    <LoginFormDesktop onFinishFailed={onFinishFailed} saveUser={saveUser} />
  );
};

export default LogInPage;
