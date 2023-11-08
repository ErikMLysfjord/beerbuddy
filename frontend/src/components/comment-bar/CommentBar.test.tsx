import { Mock, vi } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CommentBar from "./CommentBar";

const mockError = vi.fn();
const mockSuccess = vi.fn();

/**
 * Mock the App context to return a mock message object, with success and error functions.
 */
vi.mock("antd", async () => {
  const actual: object = await vi.importActual("antd");
  return {
    ...actual,
    App: {
      useApp: () => ({ message: { error: mockError, success: mockSuccess } }),
    },
  };
});

/**
 * Mock useParams to return a mock ID.
 */
vi.mock("react-router-dom", () => ({
  useParams: () => ({ id: "1" }),
}));

/**
 * Mock fetch to always return a successful response.
 */
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(),
  })
) as Mock;

describe("CommentBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the input field and submit button", () => {
    const { getByPlaceholderText, getByText } = render(
      <CommentBar onSuccess={() => {}} />
    );
    expect(getByPlaceholderText("Write a comment...")).toBeInTheDocument();
    expect(getByText("Comment")).toBeInTheDocument();
  });

  it("should call onSuccess when a comment is successfully posted", async () => {
    const onSuccess = vi.fn();
    const { getByPlaceholderText, getByText } = render(
      <CommentBar onSuccess={onSuccess} />
    );
    const input = getByPlaceholderText("Write a comment...");
    const button = getByText("Comment");

    fireEvent.change(input, { target: { value: "This is a comment" } });
    fireEvent.click(button);

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
  });

  it("should post a message when pressing enter on input field", async () => {
    const { getByPlaceholderText } = render(
      <CommentBar onSuccess={() => {}} />
    );
    const input = getByPlaceholderText("Write a comment...");

    fireEvent.change(input, { target: { value: "This is a comment" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => expect(mockSuccess).toHaveBeenCalled());
  });

  it("should display a success message when posting a comment succeeds", async () => {
    const { getByPlaceholderText, getByText } = render(
      <CommentBar onSuccess={() => {}} />
    );
    const input = getByPlaceholderText("Write a comment...");
    const button = getByText("Comment");

    fireEvent.change(input, { target: { value: "This is a comment" } });
    fireEvent.click(button);

    await waitFor(() => expect(mockSuccess).toHaveBeenCalled());
  });

  it("should display an error message when posting a comment fails", async () => {
    /* Mock fetch to always return an unsuccessful response */
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(),
      })
    ) as Mock;

    const { getByPlaceholderText, getByText } = render(
      <CommentBar onSuccess={() => {}} />
    );
    const input = getByPlaceholderText("Write a comment...");
    const button = getByText("Comment");

    fireEvent.change(input, { target: { value: "This is a comment" } });
    fireEvent.click(button);

    await waitFor(() => expect(mockError).toHaveBeenCalled());
  });
});
