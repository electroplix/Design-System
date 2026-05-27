/* ------------------------------------------------------------------ */
/*  Core barrel — re-exports everything from the core module          */
/* ------------------------------------------------------------------ */

// Types (pure TS — no React)
export type {
  BaseTheme,
  BlogTheme,
  ButtonTheme,
  ContentTheme,
  DataDisplayTheme,
  EcommerceTheme,
  FormsTheme,
  HeroTheme,
  ListsCardsTheme,
  MarketingTheme,
  MediaTheme,
  MiscTheme,
  ModalsTheme,
  NavigationTheme,
  OnboardingTheme,
  SearchTheme,
  SiteIdentityTheme,
  SocialTheme,
  UserAccountsTheme,
  ElectroplixConfig,
  Currency,
  PatternKind,
  ShellProps,
} from './types';

// Config helpers (server-safe — no React)
export {
  defineConfig,
  mergeTheme,
  defaultConfig,
  defaultBlogTheme,
  defaultButtonTheme,
  defaultContentTheme,
  defaultDataDisplayTheme,
  defaultEcommerceTheme,
  defaultFormsTheme,
  defaultHeroTheme,
  defaultListsCardsTheme,
  defaultMarketingTheme,
  defaultMediaTheme,
  defaultMiscTheme,
  defaultModalsTheme,
  defaultNavigationTheme,
  defaultOnboardingTheme,
  defaultSearchTheme,
  defaultSiteIdentityTheme,
  defaultSocialTheme,
  defaultUserAccountsTheme,
} from './config';

// Provider + hooks (client-only — "use client")
export {
  ElectroplixProvider,
  useElectroplixConfig,
  useNavTheme,
  useHeroTheme,
  useButtonTheme,
  useFormsTheme,
  useContentTheme,
  useDataDisplayTheme,
  useEcommerceTheme,
  useListsCardsTheme,
  useMarketingTheme,
  useMediaTheme,
  useMiscTheme,
  useModalsTheme,
  useOnboardingTheme,
  useSearchTheme,
  useSiteIdentityTheme,
  useSocialTheme,
  useUserAccountsTheme,
  useBlogTheme,
} from './provider';

// Icons (client-only)
export { Icon, ICON_NAMES } from './icons';
export type { IconProps, IconName } from './icons';

// Utilities (mixed — some client-only hooks, some pure)
export {
  sx,
  cn,
  money,
  truncate,
  timeAgo,
  useFocusTrap,
  useClickOutside,
  useMediaQuery,
  useDebounce,
  baseButtonStyle,
  inputStyle,
  labelStyle,
  validate,
  emailRule,
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './utils';
export type { ValidationRule } from './utils';
