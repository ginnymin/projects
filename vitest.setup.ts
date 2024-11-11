// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { vi } from 'vitest';

global.ResizeObserver = class FakeResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.fetch = vi.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));
