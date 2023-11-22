import { axe } from "jest-axe";
import { render } from "@testing-library/react";
import SortingButton from "./SortingButton";

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

const items = [
  { key: "top", label: "Most popular" },
  { key: "low", label: "Least popular" },
  { key: "atoz", label: "A-Z" },
  { key: "ztoa", label: "Z-A" },
];

describe("SortingButton", () => {
  it("is accessible", async () => {
    const { container } = render(<SortingButton items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders correctly", () => {
    const { container } = render(<SortingButton items={items} />);
    expect(container).toMatchSnapshot();
  });
});
