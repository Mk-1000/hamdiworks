import { useEffect, useRef } from 'react';
import type { PlatformColors } from '../../types/content';
import { normalizeHex } from '../../lib/colorUtils';

function camelToKebab(s: string): string {
  return s.replace(/([A-Z])/g, (m) => '-' + m.toLowerCase());
}

/** Ensure CSS value is valid (hex gets # prefix so browsers apply it correctly). */
function cssColorValue(v: string): string {
  const n = normalizeHex(v);
  return n.length === 7 ? n : v.trim();
}

function colorsToCssVars(colors: PlatformColors): string {
  return Object.entries(colors)
    .filter(([, v]) => v != null && String(v).trim() !== '')
    .map(([k, v]) => `  --${camelToKebab(k)}: ${cssColorValue(v)};`)
    .join('\n');
}

interface PlatformThemeStylesProps {
  colors?: PlatformColors | null;
  colorsDark?: PlatformColors | null;
}

const STYLE_ID = 'platform-theme-overrides';

/** Injects platform color overrides into document.head so they override theme.css. */
export function PlatformThemeStyles({ colors, colorsDark }: PlatformThemeStylesProps) {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const hasLight = colors && Object.keys(colors).length > 0;
    const hasDark = colorsDark && Object.keys(colorsDark).length > 0;

    let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!hasLight && !hasDark) {
      if (styleEl?.parentNode) styleEl.parentNode.removeChild(styleEl);
      styleRef.current = null;
      return;
    }

    const lightBlock = hasLight ? `:root {\n${colorsToCssVars(colors!)}\n}` : '';
    const darkBlock = hasDark ? `.dark {\n${colorsToCssVars(colorsDark!)}\n}` : '';
    const css = [lightBlock, darkBlock].filter(Boolean).join('\n\n');

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = STYLE_ID;
      styleEl.setAttribute('data-platform-theme', '');
      document.head.appendChild(styleEl);
      styleRef.current = styleEl;
    }
    styleEl.textContent = css;
    // Force browser to apply new CSS variables immediately (full app update)
    void document.body.offsetHeight;

    return () => {
      if (styleRef.current?.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [colors, colorsDark]);

  return null;
}
