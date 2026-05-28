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
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';

const noop = () => {};

export default function MiscellaneousPage() {
  return (
    <CategoryPage
      slug="miscellaneous"
      title="Miscellaneous"
      description="Cookie consent, theme toggle, RSS, scroll, app banners."
      componentCount={8}
    >
      <ComponentDemo name="CookieConsent">
        <CookieConsent onAccept={noop} onDecline={noop} position="bottom" />
      </ComponentDemo>
      <ComponentDemo name="ScrollProgressBar">
        <ScrollProgressBar />
      </ComponentDemo>
      <ComponentDemo name="ThemeToggle">
        <ThemeToggle isDark={false} onToggle={noop} />
      </ComponentDemo>
      <ComponentDemo name="EmptyState">
        <EmptyState
          icon="inbox"
          title="No items yet"
          description="Create your first item to get started."
          ctaLabel="Create item"
          onCta={noop}
        />
      </ComponentDemo>
      <ComponentDemo name="AppInstallBanner">
        <AppInstallBanner />
      </ComponentDemo>
      <ComponentDemo name="DownloadBlock">
        <DownloadBlock fileName="report.pdf" fileSize="2.4 MB" href="/report.pdf" />
      </ComponentDemo>
      <ComponentDemo name="InlineCode">
        <InlineCode>npm install @electroplix/components</InlineCode>
      </ComponentDemo>
      <ComponentDemo name="RSSFeed">
        <RSSFeed
          title="Latest news"
          items={[
            {
              id: '1',
              title: 'Component Library v0.5 released',
              link: '#',
              date: '2026-04-12',
              summary: 'Five new components and bug fixes.',
            },
            {
              id: '2',
              title: 'Theming guide updated',
              link: '#',
              date: '2026-04-08',
              summary: 'New section on custom tokens.',
            },
          ]}
        />
      </ComponentDemo>
    </CategoryPage>
  );
}
