import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

globalThis.fetch = vi.fn();

afterEach(() => {
  cleanup();
});
