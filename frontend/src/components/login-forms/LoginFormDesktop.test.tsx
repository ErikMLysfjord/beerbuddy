import { describe, it, expect, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import LoginFormDesktop from "./LoginFormDesktop";
import { axe } from "jest-axe";

const onFinishFailed = vi.fn();
const saveUser = vi.fn();

describe("LoginFormDesktop", () => {
  it("is accessible", async () => {
    const { container } = render(
      <LoginFormDesktop
        onFinishFailed={onFinishFailed}
        saveUser={(string: { username: string }) => saveUser(string.username)}
      />
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders without crashing", () => {
    const { container } = render(
      <LoginFormDesktop
        onFinishFailed={onFinishFailed}
        saveUser={(string: { username: string }) => saveUser(string.username)}
      />
    );
    expect(container).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <LoginFormDesktop
        onFinishFailed={onFinishFailed}
        saveUser={(string: { username: string }) => saveUser(string.username)}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("handles submit", async () => {
    render(
      <LoginFormDesktop
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
