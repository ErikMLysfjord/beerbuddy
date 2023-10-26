import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import BeerCard from "./BeerCard";

describe("BeerCard", () => {
  it("renders correctly", () => {
    const { container } = render(
      <BeerCard name={"Example brewery"} brewery={"Example brewery"} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with correct names", () => {
    const { getByText } = render(
      <BeerCard name={"Example beer"} brewery={"Example brewery"} />
    );
    expect(getByText("Example beer")).toBeInTheDocument();
    expect(getByText("Example beer")).toBeInstanceOf(HTMLHeadingElement);
    expect(getByText("Example brewery")).toBeInTheDocument();
  });

  it("renders with correct link", () => {
    /* This test will fail once we set up beercard to work correctly */
    const { getByRole } = render(
      <BeerCard name={"Example beer"} brewery={"Example brewery"} />
    );
    expect(getByRole("link")).toHaveAttribute("href", "./project2/beer/2");
  });
});
