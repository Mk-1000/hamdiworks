import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { ProjectRow } from '../../types/content';

export function Projects({ projects }: { projects?: ProjectRow[] | null }) {
  if (!projects?.length) return null;

  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and technical achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ProjectRow; index: number }) {
  const hasImage = project.image_url && project.image_url.trim() !== '';
  const tech = Array.isArray(project.tech) ? project.tech : [];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-muted rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          whileHover={{ scale: hasImage ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {hasImage ? (
            <ImageWithFallback
              src={project.image_url!}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
              <span className="text-6xl font-bold opacity-50">{project.title[0]?.toUpperCase() ?? '?'}</span>
            </div>
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Links Overlay */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-background/90 rounded-full hover:bg-background transition-colors"
            >
              <Github className="w-5 h-5 text-foreground" />
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-background/90 rounded-full hover:bg-background transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-foreground" />
            </a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-foreground mb-3">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t: string, techIndex: number) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Impact */}
        {project.impact && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Impact:</span> {project.impact}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
