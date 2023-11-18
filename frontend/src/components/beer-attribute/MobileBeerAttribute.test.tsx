import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import MobileBeerAttribute from "./MobileBeerAttribute";
import { axe } from "jest-axe";
import { BeerAttributeProps } from "./BeerAttribute";

const attributeProps: BeerAttributeProps[] = [
  {
    attribute: "Testdata 1",
    altText: "alternative text",
    icon: "",
    value: 1,
  },
  {
    attribute: "Testdata 2",
    altText: "alternative text",
    icon: "",
    value: 2,
  },
  {
    attribute: "Testdata 3",
    altText: "alternative text",
    icon: "",
    value: 3,
  },
];

const Template = () => <MobileBeerAttribute attributeProps={attributeProps} />;

describe("MobileBeerAttribute", () => {
  it("is accessible", async () => {
    const { container } = render(<Template />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders correctly", () => {
    const { container } = render(<Template />);
    expect(container).toMatchSnapshot();
  });

  it("renders with correct values", () => {
    const { getByText, getAllByAltText } = render(<Template />);
    expect(getByText("Testdata 1")).toBeInTheDocument();
    expect(getByText("Testdata 2")).toBeInTheDocument();
    expect(getByText("Testdata 3")).toBeInTheDocument();
    expect(getAllByAltText("alternative text")).toHaveLength(3);
  });
});
