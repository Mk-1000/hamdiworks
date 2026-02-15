import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import type { ExperienceRow } from '../../../types/content';

export function ExperienceEditor() {
  const [experiences, setExperiences] = useState<ExperienceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    company: '',
    role: '',
    period: '',
    location: '',
    achievements: '',
    technologies: '',
  });

  const load = async () => {
    const { data } = await supabase.from('experiences').select('*').order('sort_order');
    setExperiences((data ?? []) as ExperienceRow[]);
  };

  useEffect(() => {
    load().then(() => setLoading(false));
  }, []);

  const startAdd = () => {
    setEditingId('new');
    setForm({ company: '', role: '', period: '', location: '', achievements: '', technologies: '' });
  };

  const startEdit = (e: ExperienceRow) => {
    setEditingId(e.id);
    setForm({
      company: e.company,
      role: e.role,
      period: e.period,
      location: e.location,
      achievements: Array.isArray(e.achievements) ? e.achievements.join('\n') : '',
      technologies: Array.isArray(e.technologies) ? e.technologies.join(', ') : '',
    });
  };

  const handleSave = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const achievements = form.achievements.split('\n').map((s) => s.trim()).filter(Boolean);
    const technologies = form.technologies.split(',').map((s) => s.trim()).filter(Boolean);
    const payload = { company: form.company, role: form.role, period: form.period, location: form.location, achievements, technologies, sort_order: experiences.length };
    if (editingId === 'new') {
      await supabase.from('experiences').insert(payload);
    } else {
      await supabase.from('experiences').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editingId);
    }
    await load();
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    await supabase.from('experiences').delete().eq('id', id);
    await load();
    if (editingId === id) setEditingId(null);
  };

  if (loading) return <div className="text-gray-500 dark:text-gray-400">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Experience</h1>
      {editingId ? (
        <form onSubmit={handleSave} className="space-y-4 max-w-xl mb-8">
          <div><Label>Company</Label><Input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} required /></div>
          <div><Label>Role</Label><Input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} required /></div>
          <div><Label>Period</Label><Input value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))} placeholder="2022 - 2023" /></div>
          <div><Label>Location</Label><Input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} /></div>
          <div><Label>Achievements (one per line)</Label><textarea className="w-full border rounded px-3 py-2 min-h-[100px] dark:bg-gray-800 dark:border-gray-700" value={form.achievements} onChange={(e) => setForm((f) => ({ ...f, achievements: e.target.value }))} /></div>
          <div><Label>Technologies (comma-separated)</Label><Input value={form.technologies} onChange={(e) => setForm((f) => ({ ...f, technologies: e.target.value }))} /></div>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
          </div>
        </form>
      ) : (
        <Button onClick={startAdd} className="mb-6">Add experience</Button>
      )}
      <ul className="space-y-2">
        {experiences.map((e) => (
          <li key={e.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="font-medium">{e.company} – {e.role}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => startEdit(e)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(e.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
