import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CommentList from "./CommentList";

describe("CommentList", () => {
  it("matches snapshot", () => {
    const { container } = render(<CommentList />);
    expect(container).toMatchSnapshot();
  });

  it("renders correct amount of comments", () => {
    const { getAllByRole } = render(<CommentList />);
    expect(getAllByRole("listitem").length).toBe(6);
  });
});
