import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Logo from "./Logo";

describe("Logo", () => {
  it("renders correctly", () => {
    const { container } = render(<Logo />);
    expect(container).toMatchSnapshot();
  });

  it("renders with correct logo", () => {
    const { getByRole } = render(<Logo />);
    expect(getByRole("img")).toBeInTheDocument();
    expect(getByRole("img")).toHaveAttribute("alt", "logo");
  });

  it("renders with correct link", () => {
    const { getByRole } = render(<Logo />);
    expect(getByRole("link")).toBeInTheDocument();
    expect(getByRole("link")).toHaveAttribute("href", "/");
  });

  it("renders with correct style", () => {
    const { getByRole } = render(<Logo style={{ color: "red" }} />);
    expect(getByRole("link")).toHaveStyle("color: rgb(255, 0, 0)");
  });
});
