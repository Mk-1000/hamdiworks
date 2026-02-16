import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { PlatformSettingsRow } from '../types/content';

const PLACEHOLDER_URL = 'https://placeholder.supabase.co';
const CACHE_TTL_MS = 2 * 60 * 1000;
const SINGLETON_ID = '00000000-0000-0000-0000-000000000001';

let cache: { data: PlatformSettingsRow; until: number } | null = null;

export function usePlatformSettings(): {
  data: PlatformSettingsRow | null;
  loading: boolean;
  error: Error | null;
  isConfigured: boolean;
  refetch: () => Promise<void>;
} {
  const url = import.meta.env.VITE_SUPABASE_URL ?? '';
  const isConfigured = !!url && url !== PLACEHOLDER_URL;

  const [data, setData] = useState<PlatformSettingsRow | null>(() => {
    if (!isConfigured || !cache || Date.now() > cache.until) return null;
    return cache.data;
  });
  const [loading, setLoading] = useState(() => {
    if (!isConfigured) return false;
    if (cache && Date.now() <= cache.until) return false;
    return true;
  });
  const [error, setError] = useState<Error | null>(null);

  const fetchSettings = useCallback(async () => {
    if (!isConfigured) {
      setData(null);
      setLoading(false);
      return;
    }
    if (cache && Date.now() <= cache.until) {
      setData(cache.data);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: row, error: err } = await supabase
        .from('platform_settings')
        .select('*')
        .eq('id', SINGLETON_ID)
        .maybeSingle();
      if (err) throw err;
      const settings = row as PlatformSettingsRow | null;
      const normalized = settings
        ? {
            ...settings,
            colors: { ...(settings.colors ?? {}) } as PlatformSettingsRow['colors'],
            colors_dark: { ...(settings.colors_dark ?? {}) } as PlatformSettingsRow['colors_dark'],
          }
        : null;
      setData(normalized);
      if (normalized) cache = { data: normalized, until: Date.now() + CACHE_TTL_MS };
      else cache = null;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData(null);
      cache = null;
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        cache = null;
        fetchSettings();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [fetchSettings]);

  const refetch = useCallback(() => {
    cache = null;
    return fetchSettings();
  }, [fetchSettings]);

  return { data, loading, error, isConfigured, refetch };
}
