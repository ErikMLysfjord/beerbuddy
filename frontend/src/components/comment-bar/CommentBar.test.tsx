import { Mock, vi } from "vitest";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import CommentBar from "./CommentBar";
import { axe } from "jest-axe";

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

  it("should match snapshot", () => {
    const { container } = render(<CommentBar onSuccess={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  it("should be accessible", async () => {
    const { container } = render(<CommentBar onSuccess={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("should render the input field and submit button", () => {
    const { getByPlaceholderText, getByRole } = render(
      <CommentBar onSuccess={() => {}} />
    );
    expect(getByPlaceholderText("Best beer ever!")).toBeInTheDocument();
    expect(getByRole("button", { name: "Comment" })).toBeInTheDocument();
  });

  it("should call onSuccess when a comment is successfully posted", async () => {
    const onSuccess = vi.fn();
    const { getByPlaceholderText, getAllByText } = render(
      <CommentBar onSuccess={onSuccess} />
    );
    const input = getByPlaceholderText("Best beer ever!");
    const button = getAllByText("Comment")[1];

    fireEvent.change(input, { target: { value: "This is a comment" } });
    fireEvent.click(button);

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
  });

  it("should post a message when pressing enter on input field", async () => {
    const { getByPlaceholderText } = render(
      <CommentBar onSuccess={() => {}} />
    );
    const input = getByPlaceholderText("Best beer ever!");

    fireEvent.change(input, { target: { value: "This is a comment" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => expect(mockSuccess).toHaveBeenCalled());
  });

  it("should display a success message when posting a comment succeeds", async () => {
    const { getByPlaceholderText, getAllByText } = render(
      <CommentBar onSuccess={() => {}} />
    );
    const input = getByPlaceholderText("Best beer ever!");
    const button = getAllByText("Comment")[1];

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

    const { getByPlaceholderText, getAllByText } = render(
      <CommentBar onSuccess={() => {}} />
    );
    const input = getByPlaceholderText("Best beer ever!");
    const button = getAllByText("Comment")[1];

    fireEvent.change(input, { target: { value: "This is a comment" } });
    fireEvent.click(button);

    await waitFor(() => expect(mockError).toHaveBeenCalled());
  });

  it("Should Throw error on empty comment", async () => {
    const { getByPlaceholderText, getAllByText, queryByRole, queryAllByText } =
      render(<CommentBar onSuccess={() => {}} />);
    const input = getByPlaceholderText("Best beer ever!");
    const button = getAllByText("Comment")[1];

    fireEvent.change(input, { target: { value: "    " } });
    fireEvent.click(button);
    expect(queryByRole("img")).not.toBeInTheDocument();
    expect(queryAllByText("Comment")).toHaveLength(2);

    await waitFor(() => expect(mockSuccess).not.toHaveBeenCalled());
  });

  it("should throw error for a comment with more than 280 characters", async () => {
    const { getByPlaceholderText, getAllByText } = render(
      <CommentBar onSuccess={() => {}} />
    );
    const input = getByPlaceholderText("Best beer ever!");
    const button = getAllByText("Comment")[1];

    fireEvent.change(input, { target: { value: "a".repeat(281) } });
    fireEvent.click(button);

    await waitFor(() => expect(mockSuccess).not.toHaveBeenCalled());
    await waitFor(() => expect(mockError).toHaveBeenCalled());
  });

  it("should throw error for a comment that only contains special characters", async () => {
    const { getByPlaceholderText, getAllByText } = render(
      <CommentBar onSuccess={() => {}} />
    );
    const input = getByPlaceholderText("Best beer ever!");
    const button = getAllByText("Comment")[1];

    fireEvent.change(input, {
      target: { value: "!!!@#$%^&*()_+{}[]|;'<>,.?/~`" },
    });
    fireEvent.click(button);

    await waitFor(() => expect(mockSuccess).not.toHaveBeenCalled());

    it("should render a button without text when the screen width is less than 768px", () => {
      const { getByAltText, queryByText, queryByRole } = render(
        <CommentBar onSuccess={() => {}} />
      );

      expect(queryByRole("img")).not.toBeInTheDocument();
      expect(queryByText("Comment")).toBeInTheDocument();

      // Mock the window width to be 500px.
      // This is done to ensure the correct text is rendered.
      global.innerWidth = 500;
      act(() => {
        global.dispatchEvent(new Event("resize"));
      });

      // The button should now have a send icon instead of "Comment".
      expect(getByAltText("Send icon")).toBeInTheDocument();
      expect(queryByText("Comment")).not.toBeInTheDocument();
      expect(queryByRole("img")).toBeInTheDocument();
    });
  });
});
