'use client';

const GLOBAL_STYLES = `
  @keyframes eplx-spin { to { transform: rotate(360deg); } }
  @keyframes eplx-slide-in { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: none; } }
  @keyframes eplx-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
`;

let styleInjected = false;

export function ElectroplixStyles() {
  if (styleInjected) return null;
  styleInjected = true;
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />;
}
