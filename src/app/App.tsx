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
import { PlatformThemeStyles } from './components/PlatformThemeStyles';
import { useContent } from '../hooks/useContent';
import { usePlatformSettings } from '../hooks/usePlatformSettings';

const MIN_LOADING_MS = 500;
const DEFAULT_PLATFORM_NAME = 'Portfolio';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const mountTimeRef = useRef(Date.now());
  const { data: content, loading: contentLoading, error: contentError, isConfigured } = useContent();
  const { data: platformSettings } = usePlatformSettings();

  const platformName = platformSettings?.platform_name?.trim() || DEFAULT_PLATFORM_NAME;
  const faviconUrl = platformSettings?.favicon_url?.trim() || null;
  const logoHeaderUrl = platformSettings?.logo_header_url?.trim() || null;
  const logoFooterUrl = platformSettings?.logo_footer_url?.trim() || null;

  useEffect(() => {
    document.title = platformName;
  }, [platformName]);

  useEffect(() => {
    if (!faviconUrl) return;
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
    return () => {
      if (link?.parentNode) link.parentNode.removeChild(link);
    };
  }, [faviconUrl]);

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
      <PlatformThemeStyles
        colors={platformSettings?.colors}
        colorsDark={platformSettings?.colors_dark}
      />
      <LoadingScreen visible={showLoadingScreen} />
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <ScrollProgress />
        <Navigation
          scrollY={scrollY}
          platformName={platformName}
          logoHeaderUrl={logoHeaderUrl}
        />
        
        <main>
          {!isConfigured ? (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
              <div className="text-center text-muted-foreground max-w-md">
                <p className="text-lg font-medium mb-2">Content loads from the database</p>
                <p className="text-sm">Set <code className="bg-muted px-1 rounded">VITE_SUPABASE_URL</code> and <code className="bg-muted px-1 rounded">VITE_SUPABASE_ANON_KEY</code> in <code className="bg-muted px-1 rounded">.env</code>, then restart the dev server.</p>
              </div>
            </div>
          ) : contentLoading ? (
            <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">
              Loading...
            </div>
          ) : contentError ? (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
              <div className="text-center text-destructive max-w-md">
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
              <Contact contactInfo={content.contactInfo} hero={content.hero ?? null} />
            </>
          ) : (
            <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">
              No content from database.
            </div>
          )}
        </main>

        <footer className="bg-primary text-primary-foreground py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {logoFooterUrl && (
              <div className="flex justify-center mb-4">
                <img src={logoFooterUrl} alt={platformName} className="h-10 object-contain" />
              </div>
            )}
            <p className="text-primary-foreground/80">
              © {new Date().getFullYear()} {platformName}. Built with React & Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}