import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import BeerList from "./BeerList";

describe("BeerList", () => {
  it("renders correctly", () => {
    const { container } = render(<BeerList />);
    expect(container).toMatchSnapshot();
  });

  it("renders with correct number of beers", () => {
    const { getAllByRole } = render(<BeerList />);
    expect(getAllByRole("listitem")).toHaveLength(4);
  });

  it("renders with correct names", () => {
    const { getByText } = render(<BeerList />);
    expect(getByText("21st Amendment Bitter American")).toBeInTheDocument();
    expect(getByText("21st Amendment Bitter American")).toBeInstanceOf(
      HTMLHeadingElement
    );
    expect(getByText("Borg Citra")).toBeInTheDocument();
    expect(getByText("Sierra Nevada Pale Ale")).toBeInTheDocument();
    expect(getByText("Mono Stereo Mosaic")).toBeInTheDocument();
  });
});
