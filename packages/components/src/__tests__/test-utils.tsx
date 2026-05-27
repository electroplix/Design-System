import type React from 'react';
import { ElectroplixProvider } from '../core/provider';

/**
 * Wraps children in ElectroplixProvider for testing.
 */
export function TestWrapper({ children }: { children: React.ReactNode }) {
  return <ElectroplixProvider>{children}</ElectroplixProvider>;
}
