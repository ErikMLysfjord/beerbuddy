import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import LoginFormDesktop from "./LoginFormDesktop";
import { axe } from "jest-axe";

const showMessage = vi.fn();
const onFinishFailed = vi.fn();
const saveUser = vi.fn();

describe("LoginFormDesktop", () => {
  it("is accessible", async () => {
    const { container } = render(
      <LoginFormDesktop
        showMessage={(string: { username: string }) =>
          showMessage(string.username)
        }
        onFinishFailed={onFinishFailed}
        saveUser={(string: { username: string }) => saveUser(string.username)}
      />
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders without crashing", () => {
    const { container } = render(
      <LoginFormDesktop
        showMessage={(string: { username: string }) =>
          showMessage(string.username)
        }
        onFinishFailed={onFinishFailed}
        saveUser={(string: { username: string }) => saveUser(string.username)}
      />
    );
    expect(container).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <LoginFormDesktop
        showMessage={(string: { username: string }) =>
          showMessage(string.username)
        }
        onFinishFailed={onFinishFailed}
        saveUser={(string: { username: string }) => saveUser(string.username)}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
