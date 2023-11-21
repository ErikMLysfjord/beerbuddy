import { describe, it, expect, vi } from "vitest";
import protectRoute from "./protectRoute";

/**
 * Mocking localStorage
 */
global.localStorage = {
  ...global.localStorage,
  getItem: () => "test",
  removeItem: vi.fn(() => {}),
};

const mockReplace = vi.fn(() => {});

global.window.location = {
  ...global.window.location,
  replace: mockReplace,
};

describe("protectRoute", () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it("returns false if logged in", async () => {
    vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { login: [{ id: "test" }] } }),
      } as Response)
    );
    const res = await protectRoute();
    expect(mockReplace).not.toHaveBeenCalled();
    expect(res).toBe(false);
  });

  it("returns true if there are no users with username", async () => {
    vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { login: [] } }),
      } as Response)
    );
    const res = await protectRoute();
    expect(mockReplace).toHaveBeenCalledWith("/project2/login");
    expect(res).toBe(true);
  });

  it("returns true if localstorage is different from logged in user", async () => {
    vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { login: [{ id: "blabla" }] } }),
      } as Response)
    );
    const res = await protectRoute();
    expect(mockReplace).toHaveBeenCalledWith("/project2/login");
    expect(res).toBe(true);
  });

  it("has no values in localstorage", async () => {
    vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { login: [{ id: "blabla" }] } }),
      } as Response)
    );
    global.localStorage = {
      ...global.localStorage,
      getItem: () => null,
    };
    await protectRoute();
    expect(mockReplace).toHaveBeenCalledWith("/project2/login");
  });
});
