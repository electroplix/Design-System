'use client';
import {
  AppInstallBanner,
  CookieConsent,
  DownloadBlock,
  EmptyState,
  InlineCode,
  RSSFeed,
  ScrollProgressBar,
  ThemeToggle,
} from '@electroplix/components';

export default function MiscTest() {
  return (
    <div>
      <h1>Miscellaneous</h1>
      <CookieConsent id="cc-1" data-testid="cookie-consent" />
      <ScrollProgressBar id="sp-1" />
      <ThemeToggle id="tt-1" />
      <EmptyState id="es-1" />
      <AppInstallBanner id="ab-1" />
      <DownloadBlock id="dl-1" fileName="file.pdf" href="/file.pdf" />
      <InlineCode id="ic-1">npm install</InlineCode>
      <RSSFeed id="rss-1" items={[]} />
    </div>
  );
}
