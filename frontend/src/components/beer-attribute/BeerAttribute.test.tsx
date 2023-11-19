import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import BeerAttribute from "./BeerAttribute";
import { axe } from "jest-axe";

const Template = () => (
  <BeerAttribute
    icon={""}
    altText={"Alternative text"}
    attribute={"Test"}
    value={5}
  />
);

describe("BeerAttribute", () => {
  it("is accessible", async () => {
    const { container } = render(<Template />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders correctly", () => {
    const { container } = render(<Template />);
    expect(container).toMatchSnapshot();
  });
});
