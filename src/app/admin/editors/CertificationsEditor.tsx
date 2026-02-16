import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { SortableList } from '../components/SortableList';
import type { CertificationRow, AchievementRow } from '../../../types/content';

export function CertificationsEditor() {
  const [certifications, setCertifications] = useState<CertificationRow[]>([]);
  const [achievements, setAchievements] = useState<AchievementRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [editingAchId, setEditingAchId] = useState<string | null>(null);
  const [certForm, setCertForm] = useState({ title: '', issuer: '', date: '', description: '', skills: '' });
  const [achForm, setAchForm] = useState({ text: '' });

  const load = async () => {
    const [certRes, achRes] = await Promise.all([
      supabase.from('certifications').select('*').order('sort_order'),
      supabase.from('achievements').select('*').order('sort_order'),
    ]);
    setCertifications((certRes.data ?? []) as CertificationRow[]);
    setAchievements((achRes.data ?? []) as AchievementRow[]);
  };

  useEffect(() => {
    load().then(() => setLoading(false));
  }, []);

  const saveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    const skills = certForm.skills.split(',').map((s) => s.trim()).filter(Boolean);
    if (editingCertId && editingCertId !== 'new') {
      await supabase.from('certifications').update({ ...certForm, skills }).eq('id', editingCertId);
    } else {
      await supabase.from('certifications').insert({ ...certForm, skills, sort_order: certifications.length });
    }
    await load();
    setEditingCertId(null);
    setCertForm({ title: '', issuer: '', date: '', description: '', skills: '' });
  };

  const saveAch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAchId && editingAchId !== 'new') {
      await supabase.from('achievements').update({ text: achForm.text }).eq('id', editingAchId);
    } else {
      await supabase.from('achievements').insert({ text: achForm.text, sort_order: achievements.length });
    }
    await load();
    setEditingAchId(null);
    setAchForm({ text: '' });
  };

  const deleteCert = async (id: string) => {
    if (!confirm('Delete?')) return;
    await supabase.from('certifications').delete().eq('id', id);
    await load();
    setEditingCertId(null);
  };

  const deleteAch = async (id: string) => {
    if (!confirm('Delete?')) return;
    await supabase.from('achievements').delete().eq('id', id);
    await load();
    setEditingAchId(null);
  };

  const reorderCertifications = async (orderedIds: string[]) => {
    await Promise.all(orderedIds.map((id, index) => supabase.from('certifications').update({ sort_order: index }).eq('id', id)));
    await load();
  };

  const reorderAchievements = async (orderedIds: string[]) => {
    await Promise.all(orderedIds.map((id, index) => supabase.from('achievements').update({ sort_order: index }).eq('id', id)));
    await load();
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold text-foreground">Certifications & Achievements</h1>

      <div>
        <h2 className="text-lg font-semibold mb-4">Certifications</h2>
        {editingCertId && (
          <form onSubmit={saveCert} className="space-y-4 max-w-xl mb-4 p-4 border border-border rounded-lg">
            <div><Label>Title</Label><Input value={certForm.title} onChange={(e) => setCertForm((f) => ({ ...f, title: e.target.value }))} required /></div>
            <div><Label>Issuer</Label><Input value={certForm.issuer} onChange={(e) => setCertForm((f) => ({ ...f, issuer: e.target.value }))} required /></div>
            <div><Label>Date</Label><Input value={certForm.date} onChange={(e) => setCertForm((f) => ({ ...f, date: e.target.value }))} /></div>
            <div><Label>Description</Label><Input value={certForm.description} onChange={(e) => setCertForm((f) => ({ ...f, description: e.target.value }))} /></div>
            <div><Label>Skills (comma-separated)</Label><Input value={certForm.skills} onChange={(e) => setCertForm((f) => ({ ...f, skills: e.target.value }))} /></div>
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button type="button" variant="outline" onClick={() => setEditingCertId(null)}>Cancel</Button>
            </div>
          </form>
        )}
        {!editingCertId && <Button className="mb-4" onClick={() => setEditingCertId('new')}>Add certification</Button>}
        <SortableList items={certifications} onReorder={reorderCertifications}>
          {(c, dragHandle) => (
            <>
              {dragHandle}
              <span className="font-medium flex-1">{c.title} – {c.issuer}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditingCertId(c.id); setCertForm({ title: c.title, issuer: c.issuer, date: c.date, description: c.description, skills: Array.isArray(c.skills) ? c.skills.join(', ') : '' }); }}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => deleteCert(c.id)}>Delete</Button>
              </div>
            </>
          )}
        </SortableList>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Notable achievements (bullets)</h2>
        {editingAchId && (
          <form onSubmit={saveAch} className="space-y-4 max-w-xl mb-4 p-4 border border-border rounded-lg">
            <div><Label>Text</Label><Input value={achForm.text} onChange={(e) => setAchForm({ text: e.target.value })} required /></div>
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button type="button" variant="outline" onClick={() => setEditingAchId(null)}>Cancel</Button>
            </div>
          </form>
        )}
        {!editingAchId && <Button className="mb-4" onClick={() => setEditingAchId('new')}>Add achievement</Button>}
        <SortableList items={achievements} onReorder={reorderAchievements}>
          {(a, dragHandle) => (
            <>
              {dragHandle}
              <span className="flex-1">{a.text}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditingAchId(a.id); setAchForm({ text: a.text }); }}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => deleteAch(a.id)}>Delete</Button>
              </div>
            </>
          )}
        </SortableList>
      </div>
    </div>
  );
}
