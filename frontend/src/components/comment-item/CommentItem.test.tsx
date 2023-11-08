import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CommentItem from "./CommentItem";
import { axe } from "jest-axe";

const Template = () => {
  /* Create a timestamp that is 5 days old */
  const date = new Date();
  date.setDate(date.getDate() - 5);
  return (
    <CommentItem
      username={"Martin Hansa-Borg"}
      commentText={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus sem diam, eget consectetur quam interdum eu. Aliquam ornare lectus vel sapien blandit eleifend. Aenean ac vestibulum metus. Nam auctor sed dui dapibus pharetra."
      }
      timestamp={String(date)}
    />
  );
};

describe("CommentItem", () => {
  it("is accessible", async () => {
    const { container } = render(<Template />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("matches snapshot", () => {
    const { container } = render(<Template />);
    expect(container).toMatchSnapshot();
  });

  it("renders a comment", () => {
    const { getByText } = render(<Template />);
    expect(getByText("Martin Hansa-Borg")).toBeInTheDocument();
    expect(getByText("5 days ago")).toBeInTheDocument();
  });
});
