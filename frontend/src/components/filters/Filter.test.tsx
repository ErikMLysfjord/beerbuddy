import { it, expect, describe } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filter from "./Filter";
import { act } from "react-dom/test-utils";

describe("Filter", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Filter heading="Style" tooltip="Filter on certain styles of beer.">
        <p>Test</p>
      </Filter>
    );
    expect(container).toMatchSnapshot();
  });

  it("renders a heading and tooltip", async () => {
    render(
      <Filter heading="Style" tooltip="Filter on certain styles of beer.">
        <p>Test</p>
      </Filter>
    );

    expect(screen.getByText("Style")).toBeInTheDocument();
    expect(screen.getByText("Style")).toBeInstanceOf(HTMLHeadingElement);

    act(() => {
      fireEvent.mouseEnter(screen.getByRole("img"));
    });

    await waitFor(() => {
      expect(
        screen.getByText("Filter on certain styles of beer.")
      ).toBeInTheDocument();
    });
  });

  it("renders the children", () => {
    render(
      <Filter heading="Style" tooltip="Filter on certain styles of beer.">
        <p>Test</p>
      </Filter>
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
