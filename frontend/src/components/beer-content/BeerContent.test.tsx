import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import BeerContent from "./BeerContent";

describe("BeerContent", () => {
  it("renders correctly", () => {
    const { container } = render(<BeerContent />);
    expect(container).toMatchSnapshot();
  });
});
