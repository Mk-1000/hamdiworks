import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { SortableList } from '../components/SortableList';
import type { AboutTextRow, AboutHighlightRow, AboutStatRow } from '../../../types/content';

const TEXT_KEYS = ['section_title', 'heading', 'paragraph_1', 'paragraph_2', 'paragraph_3'] as const;
const ICON_OPTIONS = ['Code', 'Rocket', 'Award', 'Users'];

export function AboutEditor() {
  const [aboutText, setAboutText] = useState<AboutTextRow[]>([]);
  const [highlights, setHighlights] = useState<AboutHighlightRow[]>([]);
  const [stats, setStats] = useState<AboutStatRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [textForm, setTextForm] = useState<Record<string, string>>({});
  const [editingHighlight, setEditingHighlight] = useState<AboutHighlightRow | null>(null);
  const [editingStat, setEditingStat] = useState<AboutStatRow | null>(null);
  const [highlightForm, setHighlightForm] = useState({ icon_name: 'Code', title: '', description: '' });
  const [statForm, setStatForm] = useState({ number: '', label: '' });

  const load = async () => {
    const [textRes, highRes, statRes] = await Promise.all([
      supabase.from('about_text').select('*').order('sort_order'),
      supabase.from('about_highlights').select('*').order('sort_order'),
      supabase.from('about_stats').select('*').order('sort_order'),
    ]);
    setAboutText((textRes.data ?? []) as AboutTextRow[]);
    setHighlights((highRes.data ?? []) as AboutHighlightRow[]);
    setStats((statRes.data ?? []) as AboutStatRow[]);
    const map: Record<string, string> = {};
    (textRes.data ?? []).forEach((r: { section_key: string; content: string }) => { map[r.section_key] = r.content; });
    TEXT_KEYS.forEach((k) => { if (!(k in map)) map[k] = ''; });
    setTextForm(map);
  };

  useEffect(() => {
    load().then(() => setLoading(false));
  }, []);

  const saveText = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    for (const key of TEXT_KEYS) {
      const content = textForm[key] ?? '';
      const existing = aboutText.find((r) => r.section_key === key);
      if (existing) {
        await supabase.from('about_text').update({ content }).eq('id', existing.id);
      } else {
        await supabase.from('about_text').insert({ section_key: key, content, sort_order: TEXT_KEYS.indexOf(key) });
      }
    }
    await load();
    setSaving(false);
  };

  const saveHighlight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingHighlight?.id) {
      await supabase.from('about_highlights').update(highlightForm).eq('id', editingHighlight.id);
    } else {
      await supabase.from('about_highlights').insert({ ...highlightForm, sort_order: highlights.length });
    }
    await load();
    setEditingHighlight(null);
    setHighlightForm({ icon_name: 'Code', title: '', description: '' });
  };

  const saveStat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStat?.id) {
      await supabase.from('about_stats').update(statForm).eq('id', editingStat.id);
    } else {
      await supabase.from('about_stats').insert({ ...statForm, sort_order: stats.length });
    }
    await load();
    setEditingStat(null);
    setStatForm({ number: '', label: '' });
  };

  const deleteHighlight = async (id: string) => {
    if (!confirm('Delete?')) return;
    await supabase.from('about_highlights').delete().eq('id', id);
    await load();
  };

  const deleteStat = async (id: string) => {
    if (!confirm('Delete?')) return;
    await supabase.from('about_stats').delete().eq('id', id);
    await load();
  };

  const reorderHighlights = async (orderedIds: string[]) => {
    await Promise.all(orderedIds.map((id, index) => supabase.from('about_highlights').update({ sort_order: index }).eq('id', id)));
    await load();
  };

  const reorderStats = async (orderedIds: string[]) => {
    await Promise.all(orderedIds.map((id, index) => supabase.from('about_stats').update({ sort_order: index }).eq('id', id)));
    await load();
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold text-foreground">About</h1>

      <form onSubmit={saveText} className="space-y-4 max-w-xl">
        <h2 className="text-lg font-semibold">Section text</h2>
        {TEXT_KEYS.map((key) => (
          <div key={key}>
            <Label>{key}</Label>
            <Input value={textForm[key] ?? ''} onChange={(e) => setTextForm((f) => ({ ...f, [key]: e.target.value }))} />
          </div>
        ))}
        <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save text'}</Button>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-4">Highlights</h2>
        {editingHighlight !== null ? (
          <form onSubmit={saveHighlight} className="space-y-4 max-w-xl mb-4">
            <div>
              <Label>Icon</Label>
              <select className="w-full border border-border rounded px-3 py-2 bg-background" value={highlightForm.icon_name} onChange={(e) => setHighlightForm((f) => ({ ...f, icon_name: e.target.value }))}>
                {ICON_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div><Label>Title</Label><Input value={highlightForm.title} onChange={(e) => setHighlightForm((f) => ({ ...f, title: e.target.value }))} required /></div>
            <div><Label>Description</Label><Input value={highlightForm.description} onChange={(e) => setHighlightForm((f) => ({ ...f, description: e.target.value }))} required /></div>
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button type="button" variant="outline" onClick={() => { setEditingHighlight(null); setHighlightForm({ icon_name: 'Code', title: '', description: '' }); }}>Cancel</Button>
            </div>
          </form>
        ) : (
          <Button className="mb-4" onClick={() => setEditingHighlight({ id: '', icon_name: 'Code', title: '', description: '', sort_order: 0 })}>Add highlight</Button>
        )}
        <SortableList items={highlights} onReorder={reorderHighlights}>
          {(h, dragHandle) => (
            <>
              {dragHandle}
              <span className="font-medium flex-1">{h.title}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditingHighlight(h); setHighlightForm({ icon_name: h.icon_name, title: h.title, description: h.description }); }}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => deleteHighlight(h.id)}>Delete</Button>
              </div>
            </>
          )}
        </SortableList>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Stats</h2>
        {editingStat !== null ? (
          <form onSubmit={saveStat} className="space-y-4 max-w-xl mb-4">
            <div><Label>Number</Label><Input value={statForm.number} onChange={(e) => setStatForm((f) => ({ ...f, number: e.target.value }))} required /></div>
            <div><Label>Label</Label><Input value={statForm.label} onChange={(e) => setStatForm((f) => ({ ...f, label: e.target.value }))} required /></div>
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button type="button" variant="outline" onClick={() => { setEditingStat(null); setStatForm({ number: '', label: '' }); }}>Cancel</Button>
            </div>
          </form>
        ) : (
          <Button className="mb-4" onClick={() => setEditingStat({ id: '', number: '', label: '', sort_order: 0 })}>Add stat</Button>
        )}
        <SortableList items={stats} onReorder={reorderStats}>
          {(s, dragHandle) => (
            <>
              {dragHandle}
              <span className="flex-1">{s.number} – {s.label}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditingStat(s); setStatForm({ number: s.number, label: s.label }); }}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => deleteStat(s.id)}>Delete</Button>
              </div>
            </>
          )}
        </SortableList>
      </div>
    </div>
  );
}
