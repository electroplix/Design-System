'use client';
/* ------------------------------------------------------------------ */
/*  ElectroplixProvider — React context for global theme config       */
/* ------------------------------------------------------------------ */

import React, { createContext, useContext, useMemo } from 'react';
import type { ElectroplixConfig, BaseTheme } from './types';
import { defaultConfig, mergeTheme } from './config';

const Ctx = createContext<ElectroplixConfig>(defaultConfig);

/** Keys that belong to BaseTheme (global overrides), not categories */
const BASE_KEYS = new Set<string>([
  'bgColor',
  'textColor',
  'accentColor',
  'borderColor',
  'fontFamily',
  'radius',
  'spacing',
  'headingSize',
  'bodySize',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
  'shadow',
]);

/** Keys that map to per-category theme objects */
const CATEGORY_KEYS = new Set<string>([
  'blog',
  'buttons',
  'content',
  'dataDisplay',
  'ecommerce',
  'forms',
  'hero',
  'listsCards',
  'marketing',
  'media',
  'miscellaneous',
  'modals',
  'navigation',
  'onboarding',
  'search',
  'siteIdentity',
  'social',
  'userAccounts',
]);

/**
 * Wrap your app (or any subtree) to override default theme tokens.
 *
 * @example
 * ```tsx
 * import { ElectroplixProvider } from "@electroplix/components";
 * import cfg from "../electroplix.config";
 *
 * export default function Layout({ children }: { children: React.ReactNode }) {
 *   return <ElectroplixProvider config={cfg}>{children}</ElectroplixProvider>;
 * }
 * ```
 */
export function ElectroplixProvider({
  config,
  children,
}: {
  config?: Partial<ElectroplixConfig>;
  children: React.ReactNode;
}) {
  const merged = useMemo(() => {
    if (!config) return defaultConfig;

    // Extract root-level BaseTheme overrides (accentColor, bgColor, etc.)
    const globalBase: Partial<BaseTheme> = {};
    for (const key of Object.keys(config)) {
      if (BASE_KEYS.has(key)) {
        (globalBase as Record<string, unknown>)[key] = (config as Record<string, unknown>)[key];
      }
    }

    // Merge each category: default → global base → per-category overrides
    const out: Record<string, unknown> = {};
    for (const key of CATEGORY_KEYS) {
      const catKey = key as keyof ElectroplixConfig;
      const defaultVal = defaultConfig[catKey] as Record<string, unknown> | undefined;
      const categoryOverrides = config[catKey] as Record<string, unknown> | undefined;
      out[key] = mergeTheme(
        (defaultVal ?? {}) as Record<string, unknown>,
        globalBase as Record<string, unknown>,
        categoryOverrides,
      );
    }
    return out as unknown as ElectroplixConfig;
  }, [config]);

  return <Ctx.Provider value={merged}>{children}</Ctx.Provider>;
}

/**
 * Returns the full merged config. Use inside any component.
 */
export function useElectroplixConfig(): ElectroplixConfig {
  return useContext(Ctx);
}

/**
 * Shortcut hooks for individual categories.
 */
export function useNavTheme() {
  return useElectroplixConfig().navigation;
}
export function useHeroTheme() {
  return useElectroplixConfig().hero;
}
export function useButtonTheme() {
  return useElectroplixConfig().buttons;
}
export function useFormsTheme() {
  return useElectroplixConfig().forms;
}
export function useContentTheme() {
  return useElectroplixConfig().content;
}
export function useDataDisplayTheme() {
  return useElectroplixConfig().dataDisplay;
}
export function useEcommerceTheme() {
  return useElectroplixConfig().ecommerce;
}
export function useListsCardsTheme() {
  return useElectroplixConfig().listsCards;
}
export function useMarketingTheme() {
  return useElectroplixConfig().marketing;
}
export function useMediaTheme() {
  return useElectroplixConfig().media;
}
export function useMiscTheme() {
  return useElectroplixConfig().miscellaneous;
}
export function useModalsTheme() {
  return useElectroplixConfig().modals;
}
export function useOnboardingTheme() {
  return useElectroplixConfig().onboarding;
}
export function useSearchTheme() {
  return useElectroplixConfig().search;
}
export function useSiteIdentityTheme() {
  return useElectroplixConfig().siteIdentity;
}
export function useSocialTheme() {
  return useElectroplixConfig().social;
}
export function useUserAccountsTheme() {
  return useElectroplixConfig().userAccounts;
}
export function useBlogTheme() {
  return useElectroplixConfig().blog;
}
