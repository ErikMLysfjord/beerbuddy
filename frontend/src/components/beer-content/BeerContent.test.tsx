import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import BeerContent from "./BeerContent";

describe("BeerContent", () => {
  it("renders correctly", () => {
    const { container } = render(<BeerContent />);
    expect(container).toMatchSnapshot();
  });
});
