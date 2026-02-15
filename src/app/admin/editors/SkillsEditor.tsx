import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import type { SkillCategoryRow, SkillRow } from '../../../types/content';

const ICON_OPTIONS = ['Server', 'Code', 'Database', 'Container', 'Layers', 'Cloud'];

export function SkillsEditor() {
  const [categories, setCategories] = useState<(SkillCategoryRow & { skills: SkillRow[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<SkillRow | null>(null);
  const [addingForCatId, setAddingForCatId] = useState<string | null>(null);
  const [catForm, setCatForm] = useState({ title: '', icon_name: 'Server' });
  const [skillForm, setSkillForm] = useState({ name: '', level: 80, years: '1+' });

  const load = async () => {
    const { data: catData } = await supabase.from('skill_categories').select('*').order('sort_order');
    const { data: skillData } = await supabase.from('skills').select('*').order('sort_order');
    const cats = (catData ?? []) as SkillCategoryRow[];
    const skills = (skillData ?? []) as SkillRow[];
    setCategories(cats.map((c) => ({ ...c, skills: skills.filter((s) => s.category_id === c.id) })));
  };

  useEffect(() => {
    load().then(() => setLoading(false));
  }, []);

  const saveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCatId && editingCatId !== 'new') {
      await supabase.from('skill_categories').update(catForm).eq('id', editingCatId);
    } else {
      await supabase.from('skill_categories').insert({ ...catForm, sort_order: categories.length });
    }
    await load();
    setEditingCatId(null);
    setCatForm({ title: '', icon_name: 'Server' });
  };

  const saveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSkill) {
      await supabase.from('skills').update(skillForm).eq('id', editingSkill.id);
    } else if (addingForCatId) {
      const cat = categories.find((c) => c.id === addingForCatId);
      await supabase.from('skills').insert({
        ...skillForm,
        category_id: addingForCatId,
        sort_order: cat?.skills.length ?? 0,
      });
    }
    await load();
    setEditingSkill(null);
    setAddingForCatId(null);
    setSkillForm({ name: '', level: 80, years: '1+' });
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete category and all its skills?')) return;
    await supabase.from('skill_categories').delete().eq('id', id);
    await load();
  };

  const deleteSkill = async (id: string) => {
    if (!confirm('Delete skill?')) return;
    await supabase.from('skills').delete().eq('id', id);
    await load();
    setEditingSkill(null);
  };

  if (loading) return <div className="text-gray-500 dark:text-gray-400">Loading...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h1>

      {editingCatId && (
        <form onSubmit={saveCategory} className="space-y-4 max-w-xl p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="font-semibold">Category</h2>
          <div>
            <Label>Title</Label>
            <Input value={catForm.title} onChange={(e) => setCatForm((f) => ({ ...f, title: e.target.value }))} required />
          </div>
          <div>
            <Label>Icon</Label>
            <select className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700" value={catForm.icon_name} onChange={(e) => setCatForm((f) => ({ ...f, icon_name: e.target.value }))}>
              {ICON_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => setEditingCatId(null)}>Cancel</Button>
          </div>
        </form>
      )}

      {!editingCatId && <Button onClick={() => { setEditingCatId('new'); setCatForm({ title: '', icon_name: 'Server' }); }}>Add category</Button>}

      <ul className="space-y-6">
        {categories.map((cat) => (
          <li key={cat.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{cat.title}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditingCatId(cat.id); setCatForm({ title: cat.title, icon_name: cat.icon_name }); }}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => deleteCategory(cat.id)}>Delete</Button>
              </div>
            </div>
            {(editingSkill && cat.skills.some((s) => s.id === editingSkill.id)) || addingForCatId === cat.id ? (
              <form onSubmit={saveSkill} className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded space-y-2">
                <Label>{editingSkill ? 'Edit skill' : 'New skill'}</Label>
                <Input placeholder="Skill name" value={skillForm.name} onChange={(e) => setSkillForm((f) => ({ ...f, name: e.target.value }))} required />
                <div className="flex gap-2">
                  <Input type="number" min={0} max={100} value={skillForm.level} onChange={(e) => setSkillForm((f) => ({ ...f, level: Number(e.target.value) }))} />
                  <Input placeholder="Years (e.g. 2+)" value={skillForm.years} onChange={(e) => setSkillForm((f) => ({ ...f, years: e.target.value }))} />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Save</Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => { setEditingSkill(null); setAddingForCatId(null); setSkillForm({ name: '', level: 80, years: '1+' }); }}>Cancel</Button>
                </div>
              </form>
            ) : (
              <Button size="sm" variant="outline" className="mb-2" onClick={() => { setAddingForCatId(cat.id); setSkillForm({ name: '', level: 80, years: '1+' }); }}>Add skill</Button>
            )}
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              {cat.skills.map((s) => (
                <li key={s.id} className="flex justify-between items-center py-1">
                  <span>{s.name} ({s.level}%, {s.years})</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingSkill(s); setSkillForm({ name: s.name, level: s.level, years: s.years }); }}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-600" onClick={() => deleteSkill(s.id)}>Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
