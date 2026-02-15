import { useState, useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { ScrollProgress } from './components/ScrollProgress';
import { ThemeProvider } from './components/ThemeProvider';
import { LoadingScreen } from './components/LoadingScreen';
import { useContent } from '../hooks/useContent';

const MIN_LOADING_MS = 500;

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const mountTimeRef = useRef(Date.now());
  const { data: content, loading: contentLoading, error: contentError, isConfigured } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const contentReady = !contentLoading && (content != null || contentError != null || !isConfigured);
    if (!contentReady) return;
    const elapsed = Date.now() - mountTimeRef.current;
    const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
    const timer = setTimeout(() => setShowLoadingScreen(false), remaining);
    return () => clearTimeout(timer);
  }, [contentLoading, content, contentError, isConfigured]);

  return (
    <ThemeProvider>
      <LoadingScreen visible={showLoadingScreen} />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <ScrollProgress />
        <Navigation scrollY={scrollY} />
        
        <main>
          {!isConfigured ? (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
              <div className="text-center text-gray-600 dark:text-gray-400 max-w-md">
                <p className="text-lg font-medium mb-2">Content loads from the database</p>
                <p className="text-sm">Set <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">VITE_SUPABASE_URL</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> in <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.env</code>, then restart the dev server.</p>
              </div>
            </div>
          ) : contentLoading ? (
            <div className="min-h-[60vh] flex items-center justify-center text-gray-500 dark:text-gray-400">
              Loading...
            </div>
          ) : contentError ? (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
              <div className="text-center text-red-600 dark:text-red-400 max-w-md">
                <p className="font-medium">Could not load content</p>
                <p className="text-sm mt-1">{contentError.message}</p>
              </div>
            </div>
          ) : content ? (
            <>
              <Hero hero={content.hero ?? null} />
              <About
                aboutText={content.aboutText}
                aboutHighlights={content.aboutHighlights}
                aboutStats={content.aboutStats}
              />
              <Skills skillCategories={content.skillCategories} />
              <Projects projects={content.projects} />
              <Experience experiences={content.experiences} />
              <Certifications
                certifications={content.certifications}
                achievements={content.achievements}
              />
              <Contact contactInfo={content.contactInfo} />
            </>
          ) : (
            <div className="min-h-[60vh] flex items-center justify-center text-gray-500 dark:text-gray-400">
              No content from database.
            </div>
          )}
        </main>

        <footer className="bg-gray-900 dark:bg-black text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              © 2026 Hamdi Mokni. Built with React & Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}