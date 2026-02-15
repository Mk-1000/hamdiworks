import { createBrowserRouter, Navigate } from 'react-router';
import App from './App';
import { Login } from './admin/Login';
import { AdminLayout } from './admin/AdminLayout';
import { ProtectedRoute } from './admin/ProtectedRoute';
import { HeroEditor } from './admin/editors/HeroEditor';
import { AboutEditor } from './admin/editors/AboutEditor';
import { SkillsEditor } from './admin/editors/SkillsEditor';
import { ProjectsEditor } from './admin/editors/ProjectsEditor';
import { ExperienceEditor } from './admin/editors/ExperienceEditor';
import { CertificationsEditor } from './admin/editors/CertificationsEditor';
import { ContactEditor } from './admin/editors/ContactEditor';

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
          <AdminLayout />
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
