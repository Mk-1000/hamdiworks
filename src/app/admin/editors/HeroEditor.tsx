import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ImageUploadField } from '../components/ImageUploadField';
import type { HeroRow } from '../../../types/content';

export function HeroEditor() {
  const [hero, setHero] = useState<HeroRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    tagline: '',
    bio: '',
    cv_url: '',
    image_url: '',
    location: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    email_link: '',
  });

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('hero').select('*').limit(1).single();
      if (data) {
        setHero(data as HeroRow);
        const links = (data.social_links as Record<string, string>) ?? {};
        setForm({
          name: data.name ?? '',
          tagline: data.tagline ?? '',
          bio: data.bio ?? '',
          cv_url: data.cv_url ?? '',
          image_url: data.image_url ?? '',
          location: data.location ?? '',
          email: data.email ?? '',
          phone: data.phone ?? '',
          github: links.github ?? '',
          linkedin: links.linkedin ?? '',
          email_link: links.email ?? '',
        });
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      tagline: form.tagline,
      bio: form.bio,
      cv_url: form.cv_url || null,
      image_url: form.image_url || null,
      location: form.location || null,
      email: form.email || null,
      phone: form.phone || null,
      social_links: { github: form.github, linkedin: form.linkedin, email: form.email_link },
    };
    if (!hero?.id) {
      const { data: inserted } = await supabase.from('hero').insert(payload).select().single();
      if (inserted) setHero(inserted as HeroRow);
    } else {
      await supabase.from('hero').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', hero.id);
    }
    setSaving(false);
  };

  if (loading) return <div className="text-gray-500 dark:text-gray-400">Loading hero...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hero</h1>
      <form onSubmit={handleSave} className="space-y-4 max-w-xl">
        <div>
          <Label>Name</Label>
          <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <div>
          <Label>Tagline</Label>
          <Input value={form.tagline} onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))} />
        </div>
        <div>
          <Label>Bio (short line)</Label>
          <Input value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
        </div>
        <div>
          <Label>Location</Label>
          <Input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
        </div>
        <div>
          <Label>CV URL</Label>
          <Input value={form.cv_url} onChange={(e) => setForm((f) => ({ ...f, cv_url: e.target.value }))} placeholder="https://..." />
        </div>
        <ImageUploadField
          label="Profile image"
          value={form.image_url}
          onChange={(url) => setForm((f) => ({ ...f, image_url: url }))}
          storagePathPrefix="hero"
          maxWidth={1200}
        />
        <div>
          <Label>GitHub URL</Label>
          <Input value={form.github} onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))} placeholder="https://github.com/..." />
        </div>
        <div>
          <Label>LinkedIn URL</Label>
          <Input value={form.linkedin} onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))} placeholder="https://linkedin.com/..." />
        </div>
        <div>
          <Label>Email link (mailto:)</Label>
          <Input value={form.email_link} onChange={(e) => setForm((f) => ({ ...f, email_link: e.target.value }))} placeholder="mailto:..." />
        </div>
        <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
      </form>
    </div>
  );
}
