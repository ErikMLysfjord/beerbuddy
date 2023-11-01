import { describe, it, expect, vi, afterEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BeerList from "./BeerList";

describe("BeerList", () => {
  const mockData = {
    data: {
      beers: [
        {
          beer_name: "21st Amendment Bitter American",
          brewery_name: "21st Amendment Brewery Cafe",
          vote_sum: "0",
        },
        {
          beer_name: "Borg Citra",
          brewery_name: "Borg Brugghús",
          vote_sum: "0",
        },
        {
          beer_name: "Sierra Nevada Pale Ale",
          brewery_name: "Sierra Nevada Brewing Company",
          vote_sum: "0",
        },
        {
          beer_name: "Mono Stereo Mosaic",
          brewery_name: "Mono Brewing Co.",
          vote_sum: "0",
        },
      ],
    },
  };

  global.fetch = vi.fn(() =>
    Promise.resolve(new Response(JSON.stringify(mockData)))
  );

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    const { container } = render(<BeerList />);
    expect(container).toMatchSnapshot();
  });

  it("renders with correct number of beers", async () => {
    const { getByText, getAllByRole } = render(<BeerList />);
    expect(getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(getAllByRole("listitem")).toHaveLength(4);
    });
  });

  it("renders with correct names", async () => {
    const { getByText } = render(<BeerList />);
    expect(getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText("21st Amendment Bitter American")).toBeInTheDocument();
      expect(getByText("21st Amendment Bitter American")).toBeInstanceOf(
        HTMLHeadingElement
      );
      expect(getByText("Borg Citra")).toBeInTheDocument();
      expect(getByText("Sierra Nevada Pale Ale")).toBeInTheDocument();
      expect(getByText("Mono Stereo Mosaic")).toBeInTheDocument();
    });
  });
});
