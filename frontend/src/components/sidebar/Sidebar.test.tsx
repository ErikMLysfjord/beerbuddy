import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Sidebar>
        <p>Test</p>
      </Sidebar>
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with correct children", () => {
    const { getByText } = render(
      <Sidebar>
        <p>Test</p>
      </Sidebar>
    );
    expect(getByText("Test")).toBeInTheDocument();
  });

  it("renders with correct button", () => {
    const { getByRole } = render(
      <Sidebar>
        <p>Test</p>
      </Sidebar>
    );
    expect(getByRole("button")).toBeInTheDocument();
    expect(getByRole("button")).toHaveTextContent("Apply Filters");
  });
});
