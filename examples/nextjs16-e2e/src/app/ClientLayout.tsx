'use client';
import { ElectroplixProvider } from '@electroplix/components';
import type { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <ElectroplixProvider config={{ accentColor: '#8B5CF6' }}>{children}</ElectroplixProvider>;
}
