import { describe, it, vi, expect } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import LoginFormMobile from "./LoginFormMobile";
import { axe } from "jest-axe";

const onFinishFailed = vi.fn();
const saveUser = vi.fn();

describe("LoginFormMobile", () => {
  it("is accessible", async () => {
    const { container } = render(
      <LoginFormMobile onFinishFailed={onFinishFailed} saveUser={saveUser} />
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it("matches snapshot", async () => {
    const { container } = render(
      <LoginFormMobile onFinishFailed={onFinishFailed} saveUser={saveUser} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    const { container } = render(
      <LoginFormMobile onFinishFailed={onFinishFailed} saveUser={saveUser} />
    );
    expect(container).toBeTruthy();
  });

  it("handles submit", async () => {
    render(
      <LoginFormMobile
        onFinishFailed={onFinishFailed}
        saveUser={(string: { username: string }) => saveUser(string.username)}
      />
    );

    act(() => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "test" },
      });
      screen.getByRole("button").click();
    });

    await waitFor(() => {
      expect(saveUser).toHaveBeenCalledTimes(1);
      expect(saveUser).toHaveBeenCalledWith("test");
    });
  });
});
