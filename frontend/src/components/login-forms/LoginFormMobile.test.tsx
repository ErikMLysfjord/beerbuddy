import { describe, it, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import LoginFormMobile from "./LoginFormMobile";
import { axe } from "jest-axe";

const showMessage = vi.fn();
const onFinishFailed = vi.fn();
const saveUser = vi.fn();

describe("LoginFormMobile", () => {
  it("is accessible", async () => {
    const { container } = render(
      <LoginFormMobile
        showMessage={showMessage}
        onFinishFailed={onFinishFailed}
        saveUser={saveUser}
      />
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it("matches snapshot", async () => {
    const { container } = render(
      <LoginFormMobile
        showMessage={showMessage}
        onFinishFailed={onFinishFailed}
        saveUser={saveUser}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
