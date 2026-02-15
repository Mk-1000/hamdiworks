import { NavLink, Outlet, useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';
import { Button } from '../components/ui/button';
import {
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
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <aside className="w-56 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white">Admin</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Content management</p>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-auto">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm ${isActive ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
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
