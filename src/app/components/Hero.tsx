import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, MapPin, Phone, Download, ArrowDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { HeroRow } from '../../types/content';

export function Hero({ hero }: { hero: HeroRow | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  if (!hero) return null;
  const h = hero;

  // Animated gradient background with particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }> = [];

    // Create particles (reduced count for performance)
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }

    let frameCount = 0;
    let rafId: number;
    function animate() {
      if (!ctx || !canvas) return;
      frameCount++;
      const throttle = 2;
      if (frameCount % throttle !== 0) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(13, 148, 136, 0.5)';
        ctx.fill();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${1 - distance / 150})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      rafId = requestAnimationFrame(animate);
    }

    const tick = () => {
      rafId = requestAnimationFrame(animate);
    };
    tick();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30 dark:opacity-20"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/10 to-primary/10 dark:from-primary/5 dark:via-primary/5 dark:to-primary/5" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg sm:text-xl text-primary mb-4">
                Hello, I'm
              </h2>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4">
                {h.name}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-3xl text-foreground mb-6"
            >
              <TypewriterText text={h.tagline} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8"
            >
              {h.bio}
            </motion.p>

            {/* Location and Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 text-muted-foreground"
            >
              {h.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{h.location}</span>
                </div>
              )}
              {h.email && (
                <div className="flex items-center gap-2">
                  <Mail size={18} />
                  <span>{h.email}</span>
                </div>
              )}
              {h.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={18} />
                  <span>{h.phone}</span>
                </div>
              )}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <button
                onClick={scrollToProjects}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                View Projects
              </button>
              <a
                href={hero?.cv_url ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-border text-foreground rounded-lg font-semibold hover:bg-muted hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {typeof h.social_links?.github === 'string' && (
                <a
                  href={h.social_links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <Github size={24} />
                </a>
              )}
              {typeof h.social_links?.linkedin === 'string' && (
                <a
                  href={h.social_links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <Linkedin size={24} />
                </a>
              )}
              {(typeof h.social_links?.email === 'string' || h.email) && (
                <a
                  href={h.social_links?.email ?? `mailto:${h.email}`}
                  className="p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <Mail size={24} />
                </a>
              )}
            </motion.div>
          </div>

          {/* Right Column - Profile Image with Floating Tech Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative flex justify-center items-center">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-border shadow-2xl flex items-center justify-center bg-muted">
                {hero?.image_url ? (
                  <ImageWithFallback
                    src={hero.image_url}
                    alt={h.name}
                    className="w-full h-full object-cover object-center min-w-0 min-h-0 scale-100"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-4xl font-bold">
                    {h.name
                      .split(/\s+/)
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase() || '?'}
                  </div>
                )}
              </div>
              
              {/* Floating Tech Stack Icons */}
              <FloatingIcon delay={0} position="top-0 -right-8">
                <TechIcon>.NET</TechIcon>
              </FloatingIcon>
              <FloatingIcon delay={0.2} position="bottom-8 -right-12">
                <TechIcon>React</TechIcon>
              </FloatingIcon>
              <FloatingIcon delay={0.4} position="top-12 -left-12">
                <TechIcon>Docker</TechIcon>
              </FloatingIcon>
              <FloatingIcon delay={0.6} position="bottom-0 -left-8">
                <TechIcon>K8s</TechIcon>
              </FloatingIcon>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-muted-foreground"
          >
            <ArrowDown size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Typewriter effect component
function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
}

// Floating icon wrapper
function FloatingIcon({ children, delay, position }: { children: React.ReactNode; delay: number; position: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute ${position}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Tech icon component
function TechIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-lg font-semibold text-sm">
      {children}
    </div>
  );
}

// Add React import for hooks
import * as React from 'react';
