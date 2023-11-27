import { describe, it, expect, vi, Mock } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Voter from "./Voter";
import { axe } from "jest-axe";

const mockData = {
  data: {
    react: {
      vote_sum: 10,
      reaction: "unreact",
    },
  },
};

global.window.location = {
  ...global.window.location,
  replace: vi.fn(() => {}),
};

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
) as Mock;

describe("Voter", () => {
  it("is accessible", async () => {
    const { container } = render(
      <Voter votes={10} reaction={"unreact"} beerId={753} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("should render", () => {
    const { container } = render(
      <Voter votes={10} reaction={"unreact"} beerId={753} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should log upvote", async () => {
    const { getAllByRole } = render(
      <Voter votes={10} reaction={"unreact"} beerId={753} />
    );
    await act(async () => {
      getAllByRole("button")[0].click();
    });
  });

  it("should log downvote", async () => {
    const { getAllByRole } = render(
      <Voter votes={10} reaction={"unreact"} beerId={753} />
    );
    await act(async () => {
      getAllByRole("button")[1].click();
    });
  });

  it("should display correct amount of upvotes", () => {
    render(<Voter votes={10} reaction={"unreact"} beerId={753} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
