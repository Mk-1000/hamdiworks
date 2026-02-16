import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { normalizeHex, colorInputValue } from '../../../lib/colorUtils';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ImageUploadField } from '../components/ImageUploadField';
import { usePlatformSettings } from '../../../hooks/usePlatformSettings';
import type { PlatformSettingsRow, PlatformColors } from '../../../types/content';

const SINGLETON_ID = '00000000-0000-0000-0000-000000000001';

/** Default palette (light). */
const DEFAULT_COLORS_LIGHT: PlatformColors = {
  background: '#fafafa',
  foreground: '#0f172a',
  primary: '#059669',
  primaryForeground: '#ffffff',
  secondary: '#f1f5f9',
  secondaryForeground: '#0f172a',
  accent: '#059669',
  accentForeground: '#ffffff',
  muted: '#f8fafc',
  mutedForeground: '#64748b',
  border: '#e2e8f0',
};

/** Default palette (dark). */
const DEFAULT_COLORS_DARK: PlatformColors = {
  background: '#0f172a',
  foreground: '#f8fafc',
  primary: '#10b981',
  primaryForeground: '#0f172a',
  secondary: '#1e293b',
  secondaryForeground: '#f8fafc',
  accent: '#10b981',
  accentForeground: '#0f172a',
  muted: '#1e293b',
  mutedForeground: '#94a3b8',
  border: '#334155',
};

const COLOR_KEYS = [
  { key: 'background', label: 'Background' },
  { key: 'foreground', label: 'Foreground' },
  { key: 'primary', label: 'Primary' },
  { key: 'primaryForeground', label: 'Primary foreground' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'secondaryForeground', label: 'Secondary foreground' },
  { key: 'accent', label: 'Accent' },
  { key: 'accentForeground', label: 'Accent foreground' },
  { key: 'muted', label: 'Muted' },
  { key: 'mutedForeground', label: 'Muted foreground' },
  { key: 'border', label: 'Border' },
] as const;

export function PlatformEditor() {
  const { data: settings, loading, refetch } = usePlatformSettings();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    platform_name: 'Portfolio',
    favicon_url: '',
    logo_header_url: '',
    logo_footer_url: '',
    colors: { ...DEFAULT_COLORS_LIGHT } as PlatformColors,
    colors_dark: {} as PlatformColors,
  });

  useEffect(() => {
    if (!settings) return;
    const normalizeColors = (c: PlatformColors, defaults: PlatformColors): PlatformColors => {
      const out: PlatformColors = { ...defaults, ...c };
      COLOR_KEYS.forEach(({ key }) => {
        const v = out[key];
        if (v != null && String(v).trim() !== '') {
          const n = normalizeHex(v);
          if (n) out[key] = n;
        }
      });
      return out;
    };
    setForm({
      platform_name: settings.platform_name ?? 'Portfolio',
      favicon_url: settings.favicon_url ?? '',
      logo_header_url: settings.logo_header_url ?? '',
      logo_footer_url: settings.logo_footer_url ?? '',
      colors: normalizeColors(settings.colors ?? {}, DEFAULT_COLORS_LIGHT),
      colors_dark: normalizeColors(settings.colors_dark ?? {}, {} as PlatformColors),
    });
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const colorsToSave: PlatformColors = { ...DEFAULT_COLORS_LIGHT };
    COLOR_KEYS.forEach(({ key }) => {
      const v = form.colors[key];
      if (v != null && String(v).trim() !== '') {
        const n = normalizeHex(v);
        colorsToSave[key] = n || DEFAULT_COLORS_LIGHT[key];
      }
    });
    const colorsDarkToSave: PlatformColors = {};
    const hasDark = COLOR_KEYS.some(({ key }) => form.colors_dark[key] != null && String(form.colors_dark[key]).trim() !== '');
    if (hasDark) {
      COLOR_KEYS.forEach(({ key }) => {
        const v = form.colors_dark[key];
        if (v != null && String(v).trim() !== '') {
          const n = normalizeHex(v);
          colorsDarkToSave[key] = n || (colorsToSave[key] ?? DEFAULT_COLORS_DARK[key]);
        }
      });
      COLOR_KEYS.forEach(({ key }) => {
        if (colorsDarkToSave[key] == null) colorsDarkToSave[key] = colorsToSave[key] ?? DEFAULT_COLORS_DARK[key];
      });
    }
    const payload = {
      id: SINGLETON_ID,
      platform_name: form.platform_name.trim() || 'Portfolio',
      favicon_url: form.favicon_url.trim() || null,
      logo_header_url: form.logo_header_url.trim() || null,
      logo_footer_url: form.logo_footer_url.trim() || null,
      colors: colorsToSave,
      colors_dark: colorsDarkToSave,
      updated_at: new Date().toISOString(),
    };
    await supabase.from('platform_settings').upsert(payload, { onConflict: 'id' });
    await refetch();
    setSaving(false);
  };

  if (loading) return <div className="text-muted-foreground">Loading platform settings...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Platform settings</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Customize platform name, branding, and colors. Used in header, browser title, footer, and emails.
      </p>
      <form onSubmit={handleSave} className="space-y-6 max-w-xl">
        <div>
          <Label>Platform name</Label>
          <Input
            value={form.platform_name}
            onChange={(e) => setForm((f) => ({ ...f, platform_name: e.target.value }))}
            placeholder="Portfolio"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Used in header, browser title, footer, and emails.
          </p>
        </div>

        <ImageUploadField
          label="Favicon"
          value={form.favicon_url}
          onChange={(url) => setForm((f) => ({ ...f, favicon_url: url }))}
          storagePathPrefix="config"
          maxWidth={64}
        />

        <ImageUploadField
          label="Logo (header)"
          value={form.logo_header_url}
          onChange={(url) => setForm((f) => ({ ...f, logo_header_url: url }))}
          storagePathPrefix="config"
          maxWidth={400}
        />

        <ImageUploadField
          label="Logo (footer)"
          value={form.logo_footer_url}
          onChange={(url) => setForm((f) => ({ ...f, logo_footer_url: url }))}
          storagePathPrefix="config"
          maxWidth={300}
        />

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Colors (light mode)</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Primary (#059669) for buttons and links. Use hex for all values.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COLOR_KEYS.map(({ key, label }) => (
              <div key={`light-${key}`}>
                <Label>{label}</Label>
                <div className="flex gap-2 items-center mt-1">
                  <input
                    type="color"
                    value={colorInputValue(form.colors[key], DEFAULT_COLORS_LIGHT[key] ?? '#059669')}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        colors: { ...f.colors, [key]: e.target.value },
                      }))
                    }
                    className="w-10 h-10 rounded border border-border cursor-pointer"
                    aria-label={label}
                  />
                  <Input
                    value={form.colors[key] ?? ''}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        colors: { ...f.colors, [key]: e.target.value },
                      }))
                    }
                    onBlur={(e) => {
                      const v = normalizeHex(e.target.value);
                      if (v && v !== (form.colors[key] ?? ''))
                        setForm((f) => ({ ...f, colors: { ...f.colors, [key]: v } }));
                    }}
                    placeholder="#059669"
                    className="flex-1 font-mono text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Colors (dark mode)</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Optional. Leave empty to use theme defaults in dark mode.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COLOR_KEYS.map(({ key, label }) => (
              <div key={`dark-${key}`}>
                <Label>{label}</Label>
                <div className="flex gap-2 items-center mt-1">
                  <input
                    type="color"
                    value={colorInputValue(form.colors_dark[key], DEFAULT_COLORS_DARK[key] ?? '#10b981')}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        colors_dark: { ...f.colors_dark, [key]: e.target.value },
                      }))
                    }
                    className="w-10 h-10 rounded border border-border cursor-pointer"
                    aria-label={label}
                  />
                  <Input
                    value={form.colors_dark[key] ?? ''}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        colors_dark: { ...f.colors_dark, [key]: e.target.value },
                      }))
                    }
                    onBlur={(e) => {
                      const v = normalizeHex(e.target.value);
                      if (v && v !== (form.colors_dark[key] ?? ''))
                        setForm((f) => ({ ...f, colors_dark: { ...f.colors_dark, [key]: v } }));
                    }}
                    placeholder="#10b981"
                    className="flex-1 font-mono text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </div>
  );
}
