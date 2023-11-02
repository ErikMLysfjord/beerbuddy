import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CommentList from "./CommentList";
import { axe } from "jest-axe";

describe("CommentList", () => {
  it("is accessible", async () => {
    const { container } = render(<CommentList />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("matches snapshot", () => {
    const { container } = render(<CommentList />);
    expect(container).toMatchSnapshot();
  });

  it("renders correct amount of comments", () => {
    const { getAllByRole } = render(<CommentList />);
    expect(getAllByRole("listitem").length).toBe(6);
  });
});
