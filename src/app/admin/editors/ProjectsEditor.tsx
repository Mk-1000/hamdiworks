import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ImageUploadField } from '../components/ImageUploadField';
import { SortableList } from '../components/SortableList';
import type { ProjectRow } from '../../../types/content';

export function ProjectsEditor() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    image_url: '',
    tech: '' as string,
    impact: '',
    github_url: '',
    demo_url: '',
  });

  const load = async () => {
    const { data } = await supabase.from('projects').select('*').order('sort_order');
    setProjects((data ?? []) as ProjectRow[]);
  };

  useEffect(() => {
    load().then(() => setLoading(false));
  }, []);

  const startAdd = () => {
    setEditingId('new');
    setForm({ title: '', description: '', image_url: '', tech: '', impact: '', github_url: '', demo_url: '' });
  };

  const startEdit = (p: ProjectRow) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      image_url: p.image_url ?? '',
      tech: Array.isArray(p.tech) ? p.tech.join(', ') : '',
      impact: p.impact ?? '',
      github_url: p.github_url ?? '',
      demo_url: p.demo_url ?? '',
    });
  };

  const cancelEdit = () => setEditingId(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = form.tech.split(',').map((t) => t.trim()).filter(Boolean);
    const payload = {
      title: form.title,
      description: form.description,
      image_url: form.image_url || null,
      tech: techArray,
      impact: form.impact || null,
      github_url: form.github_url || null,
      demo_url: form.demo_url || null,
      sort_order: projects.length,
    };
    if (editingId === 'new') {
      await supabase.from('projects').insert(payload);
    } else {
      await supabase.from('projects').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editingId);
    }
    await load();
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    await load();
    if (editingId === id) setEditingId(null);
  };

  const reorderProjects = async (orderedIds: string[]) => {
    await Promise.all(orderedIds.map((id, index) => supabase.from('projects').update({ sort_order: index }).eq('id', id)));
    await load();
  };

  if (loading) return <div className="text-muted-foreground">Loading projects...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Projects</h1>
      {editingId ? (
        <form onSubmit={handleSave} className="space-y-4 max-w-xl mb-8">
          <div>
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
          </div>
          <div>
            <Label>Description</Label>
            <Input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required />
          </div>
          <ImageUploadField
            label="Project image"
            value={form.image_url}
            onChange={(url) => setForm((f) => ({ ...f, image_url: url }))}
            storagePathPrefix={`projects/${editingId === 'new' ? 'new' : editingId}`}
            maxWidth={800}
          />
          <div>
            <Label>Tech (comma-separated)</Label>
            <Input value={form.tech} onChange={(e) => setForm((f) => ({ ...f, tech: e.target.value }))} placeholder="React, Node, ..." />
          </div>
          <div>
            <Label>Impact</Label>
            <Input value={form.impact} onChange={(e) => setForm((f) => ({ ...f, impact: e.target.value }))} />
          </div>
          <div>
            <Label>GitHub URL</Label>
            <Input value={form.github_url} onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))} />
          </div>
          <div>
            <Label>Demo URL</Label>
            <Input value={form.demo_url} onChange={(e) => setForm((f) => ({ ...f, demo_url: e.target.value }))} />
          </div>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>
          </div>
        </form>
      ) : (
        <Button onClick={startAdd} className="mb-6">Add project</Button>
      )}
      <SortableList items={projects} onReorder={reorderProjects}>
        {(p, dragHandle) => (
          <>
            {dragHandle}
            <span className="text-foreground font-medium flex-1">{p.title}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => startEdit(p)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
            </div>
          </>
        )}
      </SortableList>
    </div>
  );
}
