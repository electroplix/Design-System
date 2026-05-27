/* ------------------------------------------------------------------ */
/*  @electroplix/components — unified theme types                     */
/*                                                                    */
/*  Every component in the library inherits from BaseTheme. Category- */
/*  specific extensions add only the props that their components need. */
/* ------------------------------------------------------------------ */

import type { CSSProperties, ElementType, ReactNode } from 'react';

/* ================================================================== */
/*  Base theme — shared by EVERY component                            */
/* ================================================================== */

/** CSS-properties alias used across shell components. */
export type CSSVars = CSSProperties;

/** Core palette & typography shared by all categories. */
export interface BaseTheme {
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  radius?: number;
  spacing?: number;
  headingSize?: number;
  bodySize?: number;
  fontWeight?: string | number;
  lineHeight?: number;
  letterSpacing?: number;
  shadow?: string;
}

/** Card-related tokens reused across many categories. */
export interface CardTokens {
  cardBg?: string;
  cardRadius?: number;
  cardBorder?: string;
}

/** Input-related tokens used by forms / ecommerce / marketing. */
export interface InputTokens {
  inputBg?: string;
  inputText?: string;
}

/* ================================================================== */
/*  Category-specific theme extensions                                */
/* ================================================================== */

export interface BlogTheme extends BaseTheme, CardTokens {
  tagBg?: string;
  tagColor?: string;
}

export interface ButtonTheme {
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  letterSpacing?: number;
  lineHeight?: number;
  radius?: number;
  paddingX?: number;
  paddingY?: number;
  gap?: number;
  opacity?: number;
  shadow?: string;
  transitionDuration?: number;
}

export interface ContentTheme extends BaseTheme, CardTokens {
  maxW?: number;
  px?: number;
  py?: number;
  gap?: number;
}

export interface DataDisplayTheme extends BaseTheme, CardTokens {
  gridColor?: string;
}

export interface EcommerceTheme extends BaseTheme, CardTokens, InputTokens {
  buttonSize?: number;
}

export interface FormsTheme extends BaseTheme, CardTokens, InputTokens {
  maxW?: number;
  px?: number;
  py?: number;
  gap?: number;
}

export interface HeroTheme extends BaseTheme, CardTokens {
  minH?: string | number;
  maxW?: number;
  px?: number;
  py?: number;
  gap?: number;
}

export interface ListsCardsTheme extends BaseTheme, CardTokens, InputTokens {
  maxW?: number;
  px?: number;
  py?: number;
  gap?: number;
}

export interface MarketingTheme extends BaseTheme, CardTokens, InputTokens {
  mutedText?: string;
  gridColor?: string;
}

export interface MediaTheme extends BaseTheme, CardTokens {
  /* no extra tokens yet */
}

export interface MiscTheme extends BaseTheme {
  surfaceColor?: string;
  codeBg?: string;
  codeText?: string;
  mutedText?: string;
}

export interface ModalsTheme extends BaseTheme {
  /* no extra tokens yet */
}

export interface NavigationTheme extends BaseTheme {
  height?: number;
  padding?: number;
  sticky?: boolean;
  showSearch?: boolean;
  showCTA?: boolean;
}

export interface OnboardingTheme extends BaseTheme, CardTokens {
  /* no extra tokens yet */
}

export interface SearchTheme extends BaseTheme, CardTokens {
  /* no extra tokens yet */
}

export interface SiteIdentityTheme extends BaseTheme {
  /* no extra tokens yet */
}

export interface SocialTheme extends BaseTheme {
  mutedText?: string;
  buttonText?: string;
}

export interface UserAccountsTheme extends BaseTheme, InputTokens {
  /* no extra tokens yet */
}

/* ================================================================== */
/*  Currency (ecommerce)                                              */
/* ================================================================== */

export type Currency = 'USD' | 'INR' | 'EUR' | 'GBP';

/* ================================================================== */
/*  Pattern (hero)                                                    */
/* ================================================================== */

export type PatternKind = 'dots' | 'grid' | 'diagonal';

/* ================================================================== */
/*  Shell props — used by wrapper/layout components                   */
/* ================================================================== */

export interface ShellProps {
  as?: ElementType;
  style?: CSSVars;
  className?: string;
  children?: ReactNode;
}

/* ================================================================== */
/*  Global config — passed to ElectroplixProvider                     */
/*                                                                    */
/*  Root-level BaseTheme props act as global overrides:               */
/*    defineConfig({ accentColor: "#e94560", buttons: { ... } })      */
/*  Per-category keys take priority over global values.               */
/* ================================================================== */

export interface ElectroplixConfig extends Partial<BaseTheme> {
  blog?: BlogTheme;
  buttons?: ButtonTheme;
  content?: ContentTheme;
  dataDisplay?: DataDisplayTheme;
  ecommerce?: EcommerceTheme;
  forms?: FormsTheme;
  hero?: HeroTheme;
  listsCards?: ListsCardsTheme;
  marketing?: MarketingTheme;
  media?: MediaTheme;
  miscellaneous?: MiscTheme;
  modals?: ModalsTheme;
  navigation?: NavigationTheme;
  onboarding?: OnboardingTheme;
  search?: SearchTheme;
  siteIdentity?: SiteIdentityTheme;
  social?: SocialTheme;
  userAccounts?: UserAccountsTheme;
}
