import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import App from './App';
import { Login } from './admin/Login';
import { ProtectedRoute } from './admin/ProtectedRoute';

const AdminLayout = lazy(() => import('./admin/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const HeroEditor = lazy(() => import('./admin/editors/HeroEditor').then((m) => ({ default: m.HeroEditor })));
const AboutEditor = lazy(() => import('./admin/editors/AboutEditor').then((m) => ({ default: m.AboutEditor })));
const SkillsEditor = lazy(() => import('./admin/editors/SkillsEditor').then((m) => ({ default: m.SkillsEditor })));
const ProjectsEditor = lazy(() => import('./admin/editors/ProjectsEditor').then((m) => ({ default: m.ProjectsEditor })));
const ExperienceEditor = lazy(() => import('./admin/editors/ExperienceEditor').then((m) => ({ default: m.ExperienceEditor })));
const CertificationsEditor = lazy(() => import('./admin/editors/CertificationsEditor').then((m) => ({ default: m.CertificationsEditor })));
const ContactEditor = lazy(() => import('./admin/editors/ContactEditor').then((m) => ({ default: m.ContactEditor })));

function AdminFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
      Loading admin…
    </div>
  );
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const router = createBrowserRouter(
  [
    { path: '/', element: <App /> },
    { path: '', element: <App /> },
    { path: 'admin/login', element: <Login /> },
    {
      path: 'admin',
      element: (
        <ProtectedRoute>
          <Suspense fallback={<AdminFallback />}>
            <AdminLayout />
          </Suspense>
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate to="hero" replace /> },
        { path: 'hero', element: <HeroEditor /> },
        { path: 'about', element: <AboutEditor /> },
        { path: 'skills', element: <SkillsEditor /> },
        { path: 'projects', element: <ProjectsEditor /> },
        { path: 'experience', element: <ExperienceEditor /> },
        { path: 'certifications', element: <CertificationsEditor /> },
        { path: 'contact', element: <ContactEditor /> },
      ],
    },
  ],
  { basename }
);
