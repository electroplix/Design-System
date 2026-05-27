/* ------------------------------------------------------------------ */
/*  @electroplix/components — default theme values                    */
/* ------------------------------------------------------------------ */

import type {
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
} from "./types";

/* ----------------------- base ------------------------------------- */

const base: Required<BaseTheme> = {
  bgColor: "#0b0b0c",
  textColor: "#F3F4F6",
  accentColor: "#8B5CF6",
  borderColor: "rgba(255,255,255,0.12)",
  fontFamily: "Inter, ui-sans-serif, system-ui",
  radius: 14,
  spacing: 14,
  headingSize: 20,
  bodySize: 14,
  fontWeight: "400",
  lineHeight: 1.5,
  letterSpacing: 0,
  shadow: "none",
};

/* ----------------------- per-category ----------------------------- */

export const defaultBlogTheme: Required<BlogTheme> = {
  ...base,
  cardBg: "rgba(128,128,128,0.1)",
  cardRadius: 10,
  cardBorder: "rgba(255,255,255,0.12)",
  tagBg: "rgba(139,92,246,0.15)",
  tagColor: "#C4B5FD",
};

export const defaultButtonTheme: Required<ButtonTheme> = {
  bgColor: "#2563eb",
  textColor: "#fff",
  accentColor: "#8B5CF6",
  borderColor: "transparent",
  fontFamily: "Inter, sans-serif",
  fontSize: 15,
  fontWeight: "500",
  letterSpacing: 0,
  lineHeight: 1,
  radius: 8,
  paddingX: 18,
  paddingY: 10,
  gap: 8,
  opacity: 1,
  shadow: "none",
  transitionDuration: 200,
};

export const defaultContentTheme: Required<ContentTheme> = {
  ...base,
  cardBg: "rgba(128,128,128,0.1)",
  cardRadius: 10,
  cardBorder: "rgba(255,255,255,0.12)",
  maxW: 800,
  px: 24,
  py: 24,
  gap: 16,
};

export const defaultDataDisplayTheme: Required<DataDisplayTheme> = {
  ...base,
  cardBg: "#0b0b0c",
  cardRadius: 12,
  cardBorder: "rgba(255,255,255,0.1)",
  gridColor: "rgba(255,255,255,0.08)",
};

export const defaultEcommerceTheme: Required<EcommerceTheme> = {
  ...base,
  headingSize: 22,
  accentColor: "#7C3AED",
  borderColor: "rgba(255,255,255,0.12)",
  cardBg: "#0b0b0c",
  cardRadius: 12,
  cardBorder: "rgba(255,255,255,0.1)",
  inputBg: "rgba(128,128,128,0.1)",
  inputText: "#E5E7EB",
  buttonSize: 14,
};

export const defaultFormsTheme: Required<FormsTheme> = {
  ...base,
  cardBg: "rgba(128,128,128,0.1)",
  cardRadius: 10,
  cardBorder: "rgba(255,255,255,0.12)",
  inputBg: "rgba(128,128,128,0.1)",
  inputText: "#E5E7EB",
  maxW: 600,
  px: 24,
  py: 24,
  gap: 16,
};

export const defaultHeroTheme: Required<HeroTheme> = {
  ...base,
  cardBg: "rgba(128,128,128,0.1)",
  cardRadius: 12,
  cardBorder: "rgba(255,255,255,0.12)",
  minH: 480,
  maxW: 1200,
  px: 24,
  py: 48,
  gap: 24,
};

export const defaultListsCardsTheme: Required<ListsCardsTheme> = {
  ...base,
  cardBg: "rgba(128,128,128,0.1)",
  cardRadius: 10,
  cardBorder: "rgba(255,255,255,0.12)",
  inputBg: "rgba(128,128,128,0.1)",
  inputText: "#E5E7EB",
  maxW: 1200,
  px: 24,
  py: 24,
  gap: 16,
};

export const defaultMarketingTheme: Required<MarketingTheme> = {
  ...base,
  cardBg: "rgba(128,128,128,0.1)",
  cardRadius: 10,
  cardBorder: "rgba(255,255,255,0.12)",
  inputBg: "#191a1f",
  inputText: "#E5E7EB",
  mutedText: "rgba(255,255,255,0.7)",
  gridColor: "rgba(255,255,255,0.08)",
  shadow: "0 10px 25px rgba(0,0,0,0.35)",
};

export const defaultMediaTheme: Required<MediaTheme> = {
  ...base,
  cardBg: "rgba(128,128,128,0.1)",
  cardRadius: 10,
  cardBorder: "rgba(255,255,255,0.12)",
};

export const defaultMiscTheme: Required<MiscTheme> = {
  ...base,
  radius: 16,
  spacing: 16,
  headingSize: 18,
  shadow: "0 20px 50px rgba(0,0,0,0.5)",
  surfaceColor: "rgba(255,255,255,0.03)",
  codeBg: "rgba(139,92,246,0.1)",
  codeText: "#E5E7EB",
  mutedText: "rgba(255,255,255,0.6)",
};

export const defaultModalsTheme: Required<ModalsTheme> = { ...base };

export const defaultNavigationTheme: Required<NavigationTheme> = {
  ...base,
  height: 72,
  padding: 24,
  sticky: false,
  showSearch: false,
  showCTA: false,
};

export const defaultOnboardingTheme: Required<OnboardingTheme> = {
  ...base,
  cardBg: "rgba(128,128,128,0.1)",
  cardRadius: 10,
  cardBorder: "rgba(255,255,255,0.12)",
};

export const defaultSearchTheme: Required<SearchTheme> = {
  ...base,
  cardBg: "rgba(128,128,128,0.1)",
  cardRadius: 10,
  cardBorder: "rgba(255,255,255,0.12)",
};

export const defaultSiteIdentityTheme: Required<SiteIdentityTheme> = { ...base };

export const defaultSocialTheme: Required<SocialTheme> = {
  ...base,
  mutedText: "rgba(255,255,255,0.65)",
  buttonText: "#ffffff",
};

export const defaultUserAccountsTheme: Required<UserAccountsTheme> = {
  ...base,
  inputBg: "rgba(128,128,128,0.1)",
  inputText: "#E5E7EB",
};

/* ----------------------- aggregate -------------------------------- */

export const defaultConfig: ElectroplixConfig = {
  blog: { ...defaultBlogTheme },
  buttons: { ...defaultButtonTheme },
  content: { ...defaultContentTheme },
  dataDisplay: { ...defaultDataDisplayTheme },
  ecommerce: { ...defaultEcommerceTheme },
  forms: { ...defaultFormsTheme },
  hero: { ...defaultHeroTheme },
  listsCards: { ...defaultListsCardsTheme },
  marketing: { ...defaultMarketingTheme },
  media: { ...defaultMediaTheme },
  miscellaneous: { ...defaultMiscTheme },
  modals: { ...defaultModalsTheme },
  navigation: { ...defaultNavigationTheme },
  onboarding: { ...defaultOnboardingTheme },
  search: { ...defaultSearchTheme },
  siteIdentity: { ...defaultSiteIdentityTheme },
  social: { ...defaultSocialTheme },
  userAccounts: { ...defaultUserAccountsTheme },
};

/* ----------------------- utilities -------------------------------- */

/**
 * Type-safe helper for authoring `electroplix.config.ts`.
 *
 * @example
 * ```ts
 * import { defineConfig } from "@electroplix/components/config";
 *
 * export default defineConfig({
 *   navigation: { bgColor: "#22223B", sticky: true },
 *   buttons:    { bgColor: "#C9ADA7", radius: 12 },
 * });
 * ```
 */
export function defineConfig(config: ElectroplixConfig): ElectroplixConfig {
  return config;
}

/** Shallow-merge: later sources win; `undefined` values are skipped. */
export function mergeTheme<T extends Record<string, unknown>>(
  target: T,
  ...sources: Array<Partial<T> | undefined>
): T {
  const result = { ...target };
  for (const source of sources) {
    if (!source) continue;
    for (const key of Object.keys(source) as Array<keyof T>) {
      if (source[key] !== undefined) {
        result[key] = source[key] as T[keyof T];
      }
    }
  }
  return result;
}
