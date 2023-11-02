import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserIntro from "./UserIntro";
import { act } from "react-dom/test-utils";
import { axe } from "jest-axe";

// Mock localStorage so it returns "Erik".
global.localStorage = {
  ...global.localStorage,
  getItem: () => "Erik",
};

describe("UserIntro", () => {
  it("is accessible", async () => {
    const { container } = render(<UserIntro />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders correctly", () => {
    const { container } = render(<UserIntro />);
    expect(container).toMatchSnapshot();
  });

  it("renders with correct heading", () => {
    const { getByRole } = render(<UserIntro />);
    expect(getByRole("heading")).toBeInTheDocument();
    expect(getByRole("heading")).toHaveTextContent("Welcome");

    expect(getByRole("heading")).toHaveTextContent("Erik");
  });

  it("renders with correct emoji", () => {
    const { getByAltText } = render(<UserIntro />);
    expect(getByAltText("Beer clinking Emoji")).toBeInTheDocument();
  });

  it("renders with correct separator", () => {
    const { getByRole } = render(<UserIntro />);
    expect(getByRole("separator")).toBeInTheDocument();
  });

  it("renders with no name", () => {
    // Mock localStorage so it returns an empty string.
    global.localStorage = {
      ...global.localStorage,
      getItem: () => "",
    };
    render(<UserIntro />);

    expect(screen.queryByText("Welcome")).toBeInTheDocument();
    expect(screen.queryByText("Erik")).not.toBeInTheDocument();
  });

  it("renders with correct text", () => {
    render(<UserIntro />);

    // Mock the window width to be 500px.
    // This is done to ensure the correct text is rendered.
    global.innerWidth = 500;
    act(() => {
      global.dispatchEvent(new Event("resize"));
    });

    expect(screen.queryByText("Welcome")).not.toBeInTheDocument();
  });
});
