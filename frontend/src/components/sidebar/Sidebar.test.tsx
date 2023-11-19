import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "./Sidebar";
import { axe } from "jest-axe";
import useFetchMoreBeers from "../../utils/useFetchMoreBeers";

const Template = () => (
  <Sidebar>
    <p>Test</p>
  </Sidebar>
);

describe("Sidebar", () => {
  vi.mock("../../utils/useFetchMoreBeers", () => {
    const mockFetchMore = vi.fn(
      async () => await Promise.resolve({ json: () => Promise.resolve({}) })
    );
    return {
      __esModule: true,
      default: () => ({
        beers: [],
        fetchMore: mockFetchMore,
      }),
    };
  });

  it("is accessible", async () => {
    const { container } = render(<Template />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders correctly", () => {
    const { container } = render(<Template />);
    expect(container).toMatchSnapshot();
  });

  it("renders with correct children", () => {
    const { getByText } = render(<Template />);
    expect(getByText("Test")).toBeInTheDocument();
  });

  it("renders with correct button", () => {
    const { getByRole } = render(<Template />);
    expect(getByRole("button")).toBeInTheDocument();
    expect(getByRole("button")).toHaveTextContent("Apply Filters");
  });

  it("calls fetchMore when button is clicked", () => {
    const { getByRole } = render(<Template />);
    getByRole("button").click();
    expect(useFetchMoreBeers().fetchMore).toHaveBeenCalledTimes(1);
  });
});
