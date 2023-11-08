import { describe, it, expect, vi, afterEach, Mock } from "vitest";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BeerList from "./BeerList";
import { axe } from "jest-axe";
import useFetchMoreBeers from "../../utils/useFetchMoreBeers";

describe("BeerList", () => {
  vi.mock("../../utils/useFetchMoreBeers", () => {
    const mockData = {
      data: {
        beers: [
          {
            beer_name: "21st Amendment Bitter American",
            brewery_name: "21st Amendment Brewery Cafe",
            vote_sum: "0",
            beer_id: 1,
            beer_count: 100,
          },
          {
            beer_name: "Borg Citra",
            brewery_name: "Borg Brugghús",
            vote_sum: "0",
            beer_id: 2,
            beer_count: 100,
          },
          {
            beer_name: "Sierra Nevada Pale Ale",
            brewery_name: "Sierra Nevada Brewing Company",
            vote_sum: "0",
            beer_id: 3,
            beer_count: 100,
          },
          {
            beer_name: "Mono Stereo Mosaic",
            brewery_name: "Mono Brewing Co.",
            vote_sum: "0",
            beer_id: 4,
            beer_count: 100,
          },
        ],
      },
    };

    return {
      __esModule: true,
      default: () => ({
        beers: mockData.data.beers,
        fetchMore: vi.fn(
          async () =>
            await Promise.resolve({
              json: () => Promise.resolve(mockData),
            })
        ) as Mock,
      }),
    };
  });

  const { beers, fetchMore } = useFetchMoreBeers();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("is accessible", async () => {
    const { container } = render(
      <BeerList beers={beers} fetchMore={fetchMore} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders correctly", () => {
    const { container } = render(
      <BeerList beers={beers} fetchMore={fetchMore} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with correct number of beers", async () => {
    const { getByText, getAllByRole } = render(
      <BeerList beers={beers} fetchMore={fetchMore} />
    );

    expect(getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(getAllByRole("listitem")).toHaveLength(4);
    });
  });

  it("renders with correct names", async () => {
    const { getByText } = render(
      <BeerList beers={beers} fetchMore={fetchMore} />
    );
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
