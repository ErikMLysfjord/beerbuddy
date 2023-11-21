import { describe, it, expect, vi } from "vitest";
import protectRoute from "./protectRoute";

global.localStorage = {
  ...global.localStorage,
  getItem: () => "test",
  removeItem: vi.fn(() => {}),
};
describe("protectRoute", () => {
  it("returns false", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { login: [{ id: "test" }] } }),
      } as Response)
    );
    const res = await protectRoute();
    expect(res).toBe(false);
  });

  it("returns true", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { login: [] } }),
      } as Response)
    );
    const res = await protectRoute();
    expect(res).toBe(true);
  });

  it("returns true", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { login: [{ id: "blabla" }] } }),
      } as Response)
    );
    const res = await protectRoute();
    expect(res).toBe(true);
  });

  it("has no values in localstorage", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { login: [{ id: "blabla" }] } }),
      } as Response)
    );
    global.localStorage = {
      ...global.localStorage,
      getItem: () => null,
    };
    const res = await protectRoute();
    expect(res).toBe(undefined);
  });
});
