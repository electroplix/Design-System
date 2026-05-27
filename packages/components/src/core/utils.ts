'use client';
/* ------------------------------------------------------------------ */
/*  Shared utilities for @electroplix/components                      */
/* ------------------------------------------------------------------ */

import React, { useEffect, useRef } from 'react';

/* ----------------------- style helpers ---------------------------- */

/** Build a CSS style object from theme tokens + optional overrides. */
export function sx(...sources: Array<React.CSSProperties | undefined>): React.CSSProperties {
  const result: React.CSSProperties = {};
  for (const s of sources) {
    if (!s) continue;
    Object.assign(result, s);
  }
  return result;
}

/** Conditionally join CSS class names (tiny clsx alternative). */
export function cn(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(' ');
}

/** Format money value with currency. */
export function money(value: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Truncate text to a max length with ellipsis. */
export function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

/** Generate a readable "time ago" string from a Date or ISO string. */
export function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const day = Math.floor(h / 24);
  if (day < 30) return `${day}d ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
}

/* ----------------------- hook: useFocusTrap ----------------------- */

/**
 * Trap keyboard focus inside a container (useful for modals / drawers).
 * Returns a ref to attach to the container element.
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(active = true) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [active]);

  return ref;
}

/* ----------------------- hook: useClickOutside -------------------- */

/**
 * Run a callback when user clicks outside of the referenced element.
 */
export function useClickOutside<T extends HTMLElement = HTMLDivElement>(handler: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [handler]);

  return ref;
}

/* ----------------------- hook: useMediaQuery ---------------------- */

/**
 * CSS media-query hook for responsive logic.
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    function handler(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/* ----------------------- hook: useDebounce ------------------------ */

/**
 * Debounce a changing value.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = React.useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

/* ----------------------- base button style factory ---------------- */

/**
 * Common button style factory used across many button variants.
 */
export function baseButtonStyle(opts: {
  bg?: string;
  color?: string;
  radius?: number;
  px?: number;
  py?: number;
  fontSize?: number;
  fontWeight?: string;
  border?: string;
  shadow?: string;
  transition?: string;
}): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    background: opts.bg ?? '#2563eb',
    color: opts.color ?? '#fff',
    border: opts.border ?? 'none',
    borderRadius: opts.radius ?? 8,
    padding: `${opts.py ?? 10}px ${opts.px ?? 18}px`,
    fontSize: opts.fontSize ?? 15,
    fontWeight: opts.fontWeight ?? '500',
    cursor: 'pointer',
    transition: opts.transition ?? 'all 0.2s ease',
    boxShadow: opts.shadow ?? 'none',
    textDecoration: 'none',
    lineHeight: 1,
  };
}

/* ----------------------- form field helpers ----------------------- */

/** Standard input style from theme tokens. */
export function inputStyle(opts: {
  bg?: string;
  text?: string;
  border?: string;
  radius?: number;
  fontSize?: number;
}): React.CSSProperties {
  return {
    width: '100%',
    padding: '10px 14px',
    background: opts.bg ?? 'rgba(128,128,128,0.1)',
    color: opts.text ?? '#E5E7EB',
    border: `1px solid ${opts.border ?? 'rgba(255,255,255,0.12)'}`,
    borderRadius: opts.radius ?? 8,
    fontSize: opts.fontSize ?? 14,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };
}

/** Label style. */
export function labelStyle(opts?: {
  color?: string;
  fontSize?: number;
  fontWeight?: string;
}): React.CSSProperties {
  return {
    display: 'block',
    marginBottom: 6,
    fontSize: opts?.fontSize ?? 13,
    fontWeight: opts?.fontWeight ?? '500',
    color: opts?.color ?? 'rgba(255,255,255,0.8)',
  };
}

/* ----------------------- validation ------------------------------ */

export interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

export function validate(value: string, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    if (!rule.test(value)) return rule.message;
  }
  return null;
}

export const emailRule: ValidationRule = {
  test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  message: 'Invalid email address',
};

export const requiredRule: ValidationRule = {
  test: (v) => v.trim().length > 0,
  message: 'This field is required',
};

export const minLengthRule = (min: number): ValidationRule => ({
  test: (v) => v.length >= min,
  message: `Must be at least ${min} characters`,
});

export const maxLengthRule = (max: number): ValidationRule => ({
  test: (v) => v.length <= max,
  message: `Must be at most ${max} characters`,
});
