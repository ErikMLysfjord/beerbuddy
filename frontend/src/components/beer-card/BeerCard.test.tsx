import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import BeerCard from "./BeerCard";
import { axe } from "jest-axe";

describe("BeerCard", () => {
  it("is accessible", async () => {
    const { container } = render(
      <BeerCard
        name={"Example beer"}
        brewery={"Example brewery"}
        beer_id={10}
        votes={10}
        reaction="unreact"
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders correctly", () => {
    const { container } = render(
      <BeerCard
        beer_id={2}
        name={"Example beer"}
        brewery={"Example brewery"}
        votes={10}
        reaction="unreact"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with correct names", () => {
    const { getByText } = render(
      <BeerCard
        beer_id={2}
        name={"Example beer"}
        brewery={"Example brewery"}
        votes={10}
        reaction="unreact"
      />
    );
    expect(getByText("Example beer")).toBeInTheDocument();
    expect(getByText("Example beer")).toBeInstanceOf(HTMLHeadingElement);
    expect(getByText("Example brewery")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
  });

  it("renders with correct link", () => {
    /* This test will fail once we set up beercard to work correctly */
    const { getByRole } = render(
      <BeerCard
        beer_id={2}
        name={"Example beer"}
        brewery={"Example brewery"}
        votes={10}
        reaction="unreact"
      />
    );
    expect(getByRole("link")).toHaveAttribute("href", "./project2/beer/2");
  });
});
