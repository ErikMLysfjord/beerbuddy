import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import CommentItem from "./CommentItem";

describe("CommentItem", () => {
  it("matches snapshot", () => {
    const { container } = render(<CommentItem />);
    expect(container).toMatchSnapshot();
  });

  it("renders a comment", () => {
    const { getByText } = render(<CommentItem />);
    expect(getByText("Martin Hansa-Borg")).toBeInTheDocument();
    expect(getByText("5 days ago")).toBeInTheDocument();
  });
});
