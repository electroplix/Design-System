#!/usr/bin/env node

/**
 * @electroplix/components CLI
 *
 * Usage:
 *   npx @electroplix/components init                – scaffold config + providers
 *   npx @electroplix/components add <name|category> – show install/import instructions
 *   npx @electroplix/components list                – list all available components
 */

const fs = require('node:fs');
const path = require('node:path');

/* ══════════════════════════════════════════════════════════════════ */
/*  ANSI Styling                                                     */
/* ══════════════════════════════════════════════════════════════════ */

const ESC = '\x1b[';
const R = `${ESC}0m`;

const s = {
  bold: (t) => `${ESC}1m${t}${R}`,
  dim: (t) => `${ESC}2m${t}${R}`,
  italic: (t) => `${ESC}3m${t}${R}`,
  purple: (t) => `${ESC}38;2;139;92;246m${t}${R}`,
  violet: (t) => `${ESC}38;2;167;139;250m${t}${R}`,
  cyan: (t) => `${ESC}38;2;34;211;238m${t}${R}`,
  green: (t) => `${ESC}38;2;52;211;153m${t}${R}`,
  yellow: (t) => `${ESC}38;2;251;191;36m${t}${R}`,
  red: (t) => `${ESC}38;2;251;113;133m${t}${R}`,
  white: (t) => `${ESC}38;2;243;244;246m${t}${R}`,
  gray: (t) => `${ESC}38;2;107;114;128m${t}${R}`,
};

/* ══════════════════════════════════════════════════════════════════ */
/*  Box-drawing helpers                                               */
/* ══════════════════════════════════════════════════════════════════ */

const B = {
  tl: '\u256D',
  tr: '\u256E',
  bl: '\u2570',
  br: '\u256F',
  h: '\u2500',
  v: '\u2502',
  tee: '\u251C',
  end: '\u2570',
  branch: '\u251C\u2500\u2500',
  last: '\u2570\u2500\u2500',
  pipe: '\u2502  ',
  dot: '\u25CF',
  arrow: '\u2192',
  check: '\u2713',
  star: '\u2605',
  diamond: '\u25C6',
  spark: '\u26A1',
};

function hr(w) {
  return B.h.repeat(w);
}

function stripAnsi(t) {
  return t.replace(/\x1b\[[0-9;]*m/g, '');
}

function boxLine(l, content, r, w) {
  const vis = stripAnsi(content);
  const pad = Math.max(0, w - vis.length - 2);
  return `  ${l}${content}${' '.repeat(pad)}${r}`;
}

/* ══════════════════════════════════════════════════════════════════ */
/*  Brand banner                                                      */
/* ══════════════════════════════════════════════════════════════════ */

function printBanner() {
  const W = 58;
  const lines = [
    '',
    `  ${B.tl}${hr(W)}${B.tr}`,
    boxLine(
      B.v,
      `  ${s.bold(s.purple(`${B.spark} ELECTROPLIX`))}  ${s.dim(s.violet('COMPONENTS'))}`,
      B.v,
      W,
    ),
    boxLine(B.v, `  ${s.gray('Parametric \u2022 Config-Driven \u2022 Zero-Dependency')}`, B.v, W),
    `  ${B.bl}${hr(W)}${B.br}`,
    '',
  ];
  for (const line of lines) {
    console.log(line);
  }
}

/* ══════════════════════════════════════════════════════════════════ */
/*  Component registry                                                */
/* ══════════════════════════════════════════════════════════════════ */

const CATEGORIES = {
  navigation: [
    'AnchorLinks',
    'Breadcrumbs',
    'Footer',
    'LanguageSelector',
    'MegaMenu',
    'Pagination',
    'PrimaryNav',
    'SidebarMenu',
    'SideDrawerNav',
    'Stepper',
    'Tabs',
  ],
  hero: [
    'HeroShell',
    'StaticHero',
    'CarouselHero',
    'CTAOverlayHero',
    'PatternedHero',
    'SplitHero',
    'VideoHeaderHero',
  ],
  buttons: [
    'Button',
    'PrimaryButton',
    'SecondaryButton',
    'TertiaryButton',
    'IconButton',
    'FloatingActionButton',
    'ButtonGroup',
    'LoadingButton',
    'ShareButton',
    'DownloadButton',
    'PrintButton',
  ],
  forms: [
    'FormShell',
    'InputField',
    'TextAreaField',
    'SelectDropdown',
    'RadioGroup',
    'ToggleSwitch',
    'DateTimePicker',
    'FileUploader',
    'ContactForm',
    'NewsletterSignup',
    'MultiStepWizard',
    'Captcha',
    'AddressAutocomplete',
    'ValidationWrapper',
  ],
  content: [
    'BlockquoteTestimonial',
    'CalloutBox',
    'HeadingSection',
    'InlineCodeText',
    'ParagraphBlock',
    'RichMarkdown',
    'TeamGrid',
  ],
  'data-display': [
    'Badge',
    'BadgeGroup',
    'BarChart',
    'LineChart',
    'PieChart',
    'Sparkline',
    'ProgressBar',
    'RatingStars',
    'CalendarGrid',
    'DataTable',
    'Timeline',
  ],
  ecommerce: [
    'CartDrawer',
    'MiniCartPanel',
    'OrderSummary',
    'ProductCard',
    'ProductGrid',
    'ProductDetail',
    'VariantSelector',
    'QuickAddButton',
    'WishlistButton',
    'PaymentButtons',
  ],
  'lists-cards': [
    'BlockShell',
    'Accordion',
    'GenericList',
    'FeatureGrid',
    'ItemCardGrid',
    'PricingTable',
    'SortableTable',
    'LCTimeline',
  ],
  marketing: [
    'ComparisonTable',
    'CountdownTimer',
    'FeatureHighlights',
    'HowItWorks',
    'LeadMagnetGate',
    'MarketingHeroBlock',
    'PromoPopup',
    'StatsCounter',
    'TestimonialsCarousel',
    'TrustBadges',
  ],
  media: [
    'AudioEmbed',
    'AvatarProfile',
    'IconGrid',
    'ImageCropperUploader',
    'ImageGallery',
    'LightboxGallery',
    'LottieOrSVG',
    'MasonryGrid',
    'MapEmbed',
    'MediaShell',
    'PolaroidImage',
    'ResponsiveVideo',
  ],
  miscellaneous: [
    'CookieConsent',
    'ScrollProgressBar',
    'ThemeToggle',
    'EmptyState',
    'AppInstallBanner',
    'DownloadBlock',
    'InlineCode',
    'RSSFeed',
  ],
  modals: [
    'OverlayBase',
    'GenericModal',
    'ConfirmDialog',
    'FormDialog',
    'LoadingOverlay',
    'Tooltip',
    'ToastBanners',
    'CookieNotice',
    'WelcomePopup',
  ],
  onboarding: [
    'FAQAccordion',
    'OnboardingWizard',
    'ProductTour',
    'TooltipHelp',
    'SupportChat',
    'ContactSupportBlock',
  ],
  search: [
    'SiteSearchBar',
    'AutoSuggest',
    'FacetFilters',
    'SearchResultCard',
    'SearchResults',
    'SearchEmptyState',
  ],
  'site-identity': [
    'LogoDisplay',
    'AnimatedBrandMark',
    'Taglines',
    'BrandingShell',
    'BrandIconGrid',
    'FaviconUploader',
  ],
  social: [
    'SocialShareBar',
    'SocialLoginButtons',
    'SocialEmbed',
    'FollowLike',
    'ReactionsBar',
    'CommentsBox',
    'ReviewsForm',
  ],
  'user-accounts': [
    'AuthForm',
    'PasswordReset',
    'MultiFactorAuthInput',
    'ProfileOverview',
    'ProfileSettings',
    'AccountSettings',
    'RoleBadge',
  ],
  blog: [
    'BlogCard',
    'AuthorByline',
    'TagList',
    'BlogBadge',
    'ReadingBar',
    'ArticleRenderer',
    'RelatedPosts',
    'ArchiveList',
    'CommentsSection',
  ],
};

/* build lookup maps */
const ALL_COMPONENTS = new Map();
for (const [cat, names] of Object.entries(CATEGORIES)) {
  for (const n of names) ALL_COMPONENTS.set(n.toLowerCase(), { name: n, category: cat });
}

const CATEGORY_ALIASES = new Map();
for (const cat of Object.keys(CATEGORIES)) {
  CATEGORY_ALIASES.set(cat.toLowerCase(), cat);
  CATEGORY_ALIASES.set(cat.replace(/-/g, '').toLowerCase(), cat);
  CATEGORY_ALIASES.set(cat.replace(/-/g, ' ').toLowerCase(), cat);
}

const _totalCount = Object.values(CATEGORIES).reduce((sum, a) => sum + a.length, 0);

/* ══════════════════════════════════════════════════════════════════ */
/*  Package manager detection                                         */
/* ══════════════════════════════════════════════════════════════════ */

function detectPackageManager() {
  const cwd = process.cwd();

  // Check for lockfiles in order of preference
  if (fs.existsSync(path.join(cwd, 'bun.lock'))) {
    return { manager: 'bun', command: 'bun install', displayName: 'Bun' };
  }
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) {
    return { manager: 'pnpm', command: 'pnpm install', displayName: 'pnpm' };
  }
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) {
    return { manager: 'yarn', command: 'yarn install', displayName: 'Yarn' };
  }
  if (fs.existsSync(path.join(cwd, 'package-lock.json'))) {
    return { manager: 'npm', command: 'npm install', displayName: 'npm' };
  }

  // Default to npm if no lockfile found
  return { manager: 'npm', command: 'npm install', displayName: 'npm' };
}

/* ══════════════════════════════════════════════════════════════════ */
/*  INIT command                                                      */
/* ══════════════════════════════════════════════════════════════════ */

function init() {
  printBanner();

  const configName = 'electroplix.config.ts';
  const providerRel = path.join('components', 'providers.tsx');
  const configPath = path.join(process.cwd(), configName);
  const providerDir = path.join(process.cwd(), 'components');
  const providerPath = path.join(providerDir, 'providers.tsx');

  const created = [];
  const skipped = [];

  /* ── config file ─────────────────────────────────────── */
  if (fs.existsSync(configPath)) {
    skipped.push(configName);
  } else {
    const configTemplate = `import { defineConfig } from "@electroplix/components";

const config = defineConfig({
  // \u2500\u2500 Global overrides (applied to ALL categories) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  accentColor: "#7C3AED",
  textColor: "#E5E7EB",
  bgColor: "#0b0b0c",
  borderColor: "rgba(255,255,255,0.14)",
  radius: 14,
  fontFamily: "Inter, system-ui, sans-serif",

  // \u2500\u2500 Per-category overrides \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // navigation: { sticky: true, height: 64 },
  // hero:       { minH: 600 },
  // buttons:    { bgColor: "#e94560", radius: 12 },
  // forms:      { inputBg: "rgba(255,255,255,0.05)" },
  // ecommerce:  { accentColor: "#10B981" },
});

export default config;
`;
    fs.writeFileSync(configPath, configTemplate, 'utf-8');
    created.push(configName);
  }

  /* ── providers wrapper ───────────────────────────────── */
  if (fs.existsSync(providerPath)) {
    skipped.push(providerRel);
  } else {
    if (!fs.existsSync(providerDir)) {
      fs.mkdirSync(providerDir, { recursive: true });
    }
    const providerTemplate = `"use client";

import { ElectroplixProvider } from "@electroplix/components";
import config from "../electroplix.config";

/**
 * Client-side providers wrapper.
 * Import this into your root layout (which stays as a Server Component).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ElectroplixProvider config={config}>
      {children}
    </ElectroplixProvider>
  );
}
`;
    fs.writeFileSync(providerPath, providerTemplate, 'utf-8');
    created.push(providerRel);
  }

  /* ── output ──────────────────────────────────────────── */
  if (created.length) {
    for (const f of created) {
      console.log(`  ${s.green(B.check)} Created ${s.bold(f)}`);
    }
  }
  if (skipped.length) {
    for (const f of skipped) {
      console.log(`  ${s.yellow(B.diamond)} Skipped ${s.bold(f)} ${s.gray('(already exists)')}`);
    }
  }

  /* ── install package ── */
  const { execSync } = require('node:child_process');
  const pmInfo = detectPackageManager();

  try {
    execSync(`${pmInfo.command} @electroplix/components`, { stdio: 'inherit' });
  } catch (_err) {
  }
}

/* ══════════════════════════════════════════════════════════════════ */
/*  ADD command                                                       */
/* ══════════════════════════════════════════════════════════════════ */

function add(name) {
  printBanner();

  if (!name) {
    console.log(`  ${s.red('Error:')} Please provide a component or category name.\n`);
    console.log(`  ${s.gray('Usage:')} npx @electroplix/components add <component|category>\n`);
    process.exit(1);
  }

  const key = name.toLowerCase().replace(/\s+/g, '-');

  /* ── try category match first ──────────────────────── */
  const catMatch = CATEGORY_ALIASES.get(key);
  if (catMatch) {
    const comps = CATEGORIES[catMatch];
    console.log(`  ${s.bold(s.purple(catMatch))} ${s.gray(`(${comps.length} components)`)}\n`);

    for (let i = 0; i < comps.length; i++) {
      const isLast = i === comps.length - 1;
      const prefix = isLast ? B.last : B.branch;
      console.log(`  ${s.gray(prefix)} ${comps[i]}`);
    }

    console.log(`\n  ${s.gray('Import all from category:')}`);
    console.log(`  ${s.cyan(`import { ${comps.join(', ')} } from '@electroplix/components';`)}\n`);
    return;
  }

  /* ── try individual component match ────────────────── */
  const entry = ALL_COMPONENTS.get(key);
  if (!entry) {
    console.log(`  ${s.red('Error:')} Component "${name}" not found.\n`);
    console.log(`  ${s.gray('Run')} npx @electroplix/components list ${s.gray('to see all available components.')}\n`);
    process.exit(1);
  }

  console.log(`  ${s.bold(s.green(entry.name))} ${s.gray(`(${entry.category})`)}\n`);
  console.log(`  ${s.gray('Import:')}`);
  console.log(`  ${s.cyan(`import { ${entry.name} } from '@electroplix/components';`)}\n`);
  console.log(`  ${s.gray('Install:')}`);
  console.log(`  ${s.cyan('npm install @electroplix/components')}\n`);
}

/* ══════════════════════════════════════════════════════════════════ */
/*  LIST command                                                      */
/* ══════════════════════════════════════════════════════════════════ */

function list() {
  printBanner();

  const catEntries = Object.entries(CATEGORIES);
  const totalCount = Object.values(CATEGORIES).reduce((sum, a) => sum + a.length, 0);

  console.log(`  ${s.bold(s.cyan(`${totalCount} components`))} across ${s.bold(`${catEntries.length} categories`)}\n`);

  for (let ci = 0; ci < catEntries.length; ci++) {
    const [cat, names] = catEntries[ci];
    const isLastCat = ci === catEntries.length - 1;
    const catPrefix = isLastCat ? B.end : B.tee;
    const childPipe = isLastCat ? '   ' : B.pipe;

    console.log(`  ${s.bold(`${catPrefix}${B.h}${B.h} ${s.purple(cat)}`)} ${s.gray(`(${names.length})`)}`);

    for (let ni = 0; ni < names.length; ni++) {
      const isLastName = ni === names.length - 1;
      const namePrefix = isLastName ? B.last : B.branch;
      console.log(`  ${childPipe}${namePrefix}${B.h}${B.h} ${names[ni]}`);
    }

    if (!isLastCat) console.log('');
  }

  console.log('');
}

/* ══════════════════════════════════════════════════════════════════ */
/*  HELP / default                                                    */
/* ══════════════════════════════════════════════════════════════════ */

function help() {
  printBanner();
  console.log(`  ${s.bold('Usage:')}\n`);
  console.log(`  ${s.cyan('npx @electroplix/components init')}       ${s.gray('Scaffold config + provider setup')}`);
  console.log(`  ${s.cyan('npx @electroplix/components add')} <name> ${s.gray('Show install/import instructions')}`);
  console.log(`  ${s.cyan('npx @electroplix/components list')}       ${s.gray('List all available components')}\n`);
}

/* ══════════════════════════════════════════════════════════════════ */
/*  Main                                                              */
/* ══════════════════════════════════════════════════════════════════ */

const [, , cmd, ...args] = process.argv;

switch (cmd) {
  case 'init':
    init();
    break;
  case 'add':
    add(args.join(' '));
    break;
  case 'list':
    list();
    break;
  default:
    help();
}
