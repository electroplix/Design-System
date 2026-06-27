import type React from 'react';
import { ElectroplixProvider } from '../core/provider';

// Mock window.matchMedia for jsdom test environment
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

/**
 * Wraps children in ElectroplixProvider for testing.
 */
export function TestWrapper({ children }: { children: React.ReactNode }) {
  return <ElectroplixProvider>{children}</ElectroplixProvider>;
}
