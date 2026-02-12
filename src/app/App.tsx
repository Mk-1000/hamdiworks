import { useState, useEffect } from 'react';
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

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set loaded after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <ThemeProvider>
      <LoadingScreen />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <ScrollProgress />
        <Navigation scrollY={scrollY} />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Contact />
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