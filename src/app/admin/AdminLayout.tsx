import { NavLink, Outlet, useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';
import { Button } from '../components/ui/button';
import {
  Settings,
  User,
  FileText,
  Sparkles,
  Layers,
  Briefcase,
  GraduationCap,
  Phone,
  LogOut,
} from 'lucide-react';

const nav = [
  { to: '/admin/platform', label: 'Platform', icon: Settings },
  { to: '/admin/hero', label: 'Hero', icon: User },
  { to: '/admin/about', label: 'About', icon: FileText },
  { to: '/admin/skills', label: 'Skills', icon: Layers },
  { to: '/admin/projects', label: 'Projects', icon: Briefcase },
  { to: '/admin/experience', label: 'Experience', icon: Sparkles },
  { to: '/admin/certifications', label: 'Certifications', icon: GraduationCap },
  { to: '/admin/contact', label: 'Contact', icon: Phone },
];

export function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-muted">
      <aside className="w-56 flex flex-col border-r border-border bg-background">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Admin</h2>
          <p className="text-xs text-muted-foreground">Content management</p>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-auto">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-2 border-t border-border">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Log out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
