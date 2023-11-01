import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Voter from "./Voter";

console.log = vi.fn();

describe("Voter", () => {
  it("should render", () => {
    const { container } = render(<Voter votes={10} />);
    expect(container).toMatchSnapshot();
  });

  it("should log upvote", async () => {
    const { getAllByRole } = render(<Voter votes={10} />);
    getAllByRole("button")[0].click();
    expect(console.log).toHaveBeenCalledWith("upvote");
  });

  it("should log downvote", async () => {
    const { getAllByRole } = render(<Voter votes={10} />);
    getAllByRole("button")[1].click();
    expect(console.log).toHaveBeenCalledWith("downvote");
  });

  it("should display correct amount of upvotes", () => {
    render(<Voter votes={10} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
