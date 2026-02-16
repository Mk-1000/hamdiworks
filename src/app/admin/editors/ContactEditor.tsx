import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { SortableList } from '../components/SortableList';
import type { ContactInfoRow } from '../../../types/content';

const TYPE_OPTIONS = ['email', 'phone', 'location'];

export function ContactEditor() {
  const [items, setItems] = useState<ContactInfoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ type: 'email', label: '', value: '', link: '' });

  const load = async () => {
    const { data } = await supabase.from('contact_info').select('*').order('sort_order');
    setItems((data ?? []) as ContactInfoRow[]);
  };

  useEffect(() => {
    load().then(() => setLoading(false));
  }, []);

  const startAdd = () => {
    setEditingId('new');
    setForm({ type: 'email', label: '', value: '', link: '' });
  };

  const startEdit = (row: ContactInfoRow) => {
    setEditingId(row.id);
    setForm({ type: row.type, label: row.label, value: row.value, link: row.link ?? '' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { type: form.type, label: form.label, value: form.value, link: form.link || null, sort_order: items.length };
    if (editingId === 'new') {
      await supabase.from('contact_info').insert(payload);
    } else {
      await supabase.from('contact_info').update(payload).eq('id', editingId);
    }
    await load();
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    await supabase.from('contact_info').delete().eq('id', id);
    await load();
    if (editingId === id) setEditingId(null);
  };

  const reorderItems = async (orderedIds: string[]) => {
    await Promise.all(orderedIds.map((id, index) => supabase.from('contact_info').update({ sort_order: index }).eq('id', id)));
    await load();
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Contact</h1>
      {editingId ? (
        <form onSubmit={handleSave} className="space-y-4 max-w-xl mb-8">
          <div>
            <Label>Type</Label>
            <select className="w-full border border-border rounded px-3 py-2 bg-background" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
              {TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div><Label>Label</Label><Input value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} required /></div>
          <div><Label>Value</Label><Input value={form.value} onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))} required /></div>
          <div><Label>Link (optional, e.g. mailto: or tel:)</Label><Input value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} /></div>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
          </div>
        </form>
      ) : (
        <Button onClick={startAdd} className="mb-6">Add contact info</Button>
      )}
      <SortableList items={items} onReorder={reorderItems}>
        {(row, dragHandle) => (
          <>
            {dragHandle}
            <span className="font-medium flex-1">{row.label}: {row.value}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => startEdit(row)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(row.id)}>Delete</Button>
            </div>
          </>
        )}
      </SortableList>
    </div>
  );
}
