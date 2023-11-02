import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import BeerContent from "./BeerContent";
import { axe } from "jest-axe";

describe("BeerContent", () => {
  it("is accessible", async () => {
    const { container } = render(<BeerContent />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders correctly", () => {
    const { container } = render(<BeerContent />);
    expect(container).toMatchSnapshot();
  });
});
