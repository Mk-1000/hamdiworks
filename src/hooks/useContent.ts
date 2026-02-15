import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { ContentData } from '../types/content';

const PLACEHOLDER_URL = 'https://placeholder.supabase.co';

export function useContent(): {
  data: ContentData | null;
  loading: boolean;
  error: Error | null;
  isConfigured: boolean;
  refetch: () => Promise<void>;
} {
  const url = import.meta.env.VITE_SUPABASE_URL ?? '';
  const isConfigured = !!url && url !== PLACEHOLDER_URL;

  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(!!isConfigured);
  const [error, setError] = useState<Error | null>(null);

  const fetchAll = useCallback(async () => {
    if (!isConfigured) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [
        heroRes,
        aboutTextRes,
        aboutHighlightsRes,
        aboutStatsRes,
        skillCategoriesRes,
        skillsRes,
        projectsRes,
        experiencesRes,
        certificationsRes,
        achievementsRes,
        contactInfoRes,
      ] = await Promise.all([
        supabase.from('hero').select('*').limit(1).single(),
        supabase.from('about_text').select('*').order('sort_order'),
        supabase.from('about_highlights').select('*').order('sort_order'),
        supabase.from('about_stats').select('*').order('sort_order'),
        supabase.from('skill_categories').select('*').order('sort_order'),
        supabase.from('skills').select('*').order('sort_order'),
        supabase.from('projects').select('*').order('sort_order'),
        supabase.from('experiences').select('*').order('sort_order'),
        supabase.from('certifications').select('*').order('sort_order'),
        supabase.from('achievements').select('*').order('sort_order'),
        supabase.from('contact_info').select('*').order('sort_order'),
      ]);

      // Treat 404/missing tables as empty (run migrations in Supabase to create tables)
      const hero = heroRes.error ? null : heroRes.data;
      const aboutText = aboutTextRes.error ? [] : (aboutTextRes.data ?? []);
      const aboutHighlights = aboutHighlightsRes.error ? [] : (aboutHighlightsRes.data ?? []);
      const aboutStats = aboutStatsRes.error ? [] : (aboutStatsRes.data ?? []);
      const skillCategories = skillCategoriesRes.error ? [] : (skillCategoriesRes.data ?? []);
      const skills = skillsRes.error ? [] : (skillsRes.data ?? []);
      const projectsRaw = projectsRes.error ? [] : (projectsRes.data ?? []);
      const experiencesRaw = experiencesRes.error ? [] : (experiencesRes.data ?? []);
      const certificationsRaw = certificationsRes.error ? [] : (certificationsRes.data ?? []);
      const achievements = achievementsRes.error ? [] : (achievementsRes.data ?? []);
      const contactInfo = contactInfoRes.error ? [] : (contactInfoRes.data ?? []);

      const projects = projectsRaw.map((p: { tech?: unknown }) => ({
        ...p,
        tech: Array.isArray(p.tech) ? p.tech : [],
      }));
      const experiences = experiencesRaw.map((e: { achievements?: unknown; technologies?: unknown }) => ({
        ...e,
        achievements: Array.isArray(e.achievements) ? e.achievements : [],
        technologies: Array.isArray(e.technologies) ? e.technologies : [],
      }));
      const certifications = certificationsRaw.map((c: { skills?: unknown }) => ({
        ...c,
        skills: Array.isArray(c.skills) ? c.skills : [],
      }));

      const categoriesWithSkills = skillCategories.map((cat: { id: string }) => ({
        ...cat,
        skills: skills.filter((s: { category_id: string }) => s.category_id === cat.id),
      }));

      setData({
        hero,
        aboutText,
        aboutHighlights,
        aboutStats,
        skillCategories: categoriesWithSkills,
        projects,
        experiences,
        certifications,
        achievements,
        contactInfo,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { data, loading, error, isConfigured, refetch: fetchAll };
}
