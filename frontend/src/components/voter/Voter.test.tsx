import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Voter from "./Voter";

console.log = vi.fn();

describe("Voter", () => {
  it("should render", () => {
    const { container } = render(<Voter />);
    expect(container).toMatchSnapshot();
  });

  it("should log upvote", () => {
    const { getAllByRole } = render(<Voter />);
    getAllByRole("button")[0].click();
    expect(console.log).toHaveBeenCalledWith("upvote");
  });

  it("should log downvote", () => {
    const { getAllByRole } = render(<Voter />);
    getAllByRole("button")[1].click();
    expect(console.log).toHaveBeenCalledWith("downvote");
  });

  it("should display correct amount of upvotes", () => {
    render(<Voter />);
    expect(screen.getByText("321")).toBeInTheDocument();
  });
});
