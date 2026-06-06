import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Electroplix SSR Validation — Next.js 16',
  description: 'Cross-version Server Component validation for @electroplix/components.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
