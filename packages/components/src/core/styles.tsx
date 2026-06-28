'use client';

const GLOBAL_STYLES = `
  @keyframes eplx-spin { to { transform: rotate(360deg); } }
  @keyframes eplx-slide-in { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: none; } }
  @keyframes eplx-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }

  *:focus-visible {
    outline: 2px solid var(--eplx-accent, #6366f1) !important;
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

let styleInjected = false;

export function ElectroplixStyles() {
  if (styleInjected) return null;
  styleInjected = true;
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />;
}
