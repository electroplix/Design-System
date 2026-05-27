import { render } from '@testing-library/react';
/**
 * @electroplix/components – miscellaneous tests
 */
import type React from 'react';
import {
  AppInstallBanner,
  CookieConsent,
  DownloadBlock,
  EmptyState,
  InlineCode,
  RSSFeed,
  ScrollProgressBar,
  ThemeToggle,
} from '../components/miscellaneous';
import { TestWrapper } from './test-utils';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

describe('Miscellaneous components', () => {
  it('CookieConsent renders', () => {
    const { container } = wrap(<CookieConsent onAccept={noop} onDecline={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ScrollProgressBar renders', () => {
    const { container } = wrap(<ScrollProgressBar />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ThemeToggle renders', () => {
    const { container } = wrap(<ThemeToggle onToggle={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('EmptyState renders', () => {
    const { container } = wrap(<EmptyState title="No items" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('AppInstallBanner renders', () => {
    const { container } = wrap(<AppInstallBanner />);
    expect(container.firstChild).toBeTruthy();
  });

  it('DownloadBlock renders', () => {
    const { container } = wrap(<DownloadBlock fileName="doc.pdf" href="/doc.pdf" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('InlineCode renders', () => {
    const { container } = wrap(<InlineCode>npm install</InlineCode>);
    expect(container.firstChild).toBeTruthy();
  });

  it('RSSFeed renders', () => {
    const { container } = wrap(
      <RSSFeed items={[{ id: '1', title: 'Post 1', link: '/post-1', date: '2024-01-01' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });
});
