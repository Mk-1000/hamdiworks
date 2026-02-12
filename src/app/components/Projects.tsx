import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Projects() {
  const projects = [
    {
      title: 'Al-Fikr Application Migration',
      description:
        'Migrated a legacy monolithic MVC application to a modern microservices architecture, improving scalability and reducing deployment time by 60%.',
      image: 'https://images.unsplash.com/photo-1676030789467-a097e2291bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3NlcnZpY2VzJTIwYXJjaGl0ZWN0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzA5MjQ4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['.NET Core', 'Docker', 'Microservices', 'MariaDB', 'RabbitMQ'],
      impact: 'Improved scalability and reduced deployment time',
      github: '#',
      demo: null,
    },
    {
      title: 'Football KickOff (Startup)',
      description:
        'A comprehensive SaaS platform for football team management featuring real-time messaging, automated reservations, and team coordination tools.',
      image: 'https://images.unsplash.com/photo-1759884247264-86c2aa311632?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2Z0d2FyZSUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc3MDg5OTkxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['NestJS', 'MongoDB', 'WebSocket', 'Docker', 'GCP'],
      impact: 'Active users managing teams and reservations',
      github: null,
      demo: 'https://app.kickoff-sports.tn',
    },
    {
      title: 'Sa7ty Health Platform',
      description:
        'An innovative healthcare platform with AI-powered diagnostic assistant for symptom analysis and real-time diagnostics, improving healthcare accessibility.',
      image: 'https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neSUyMHBsYXRmb3JtfGVufDF8fHx8MTc3MDkyNDgzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['Symfony', 'Flask', 'Machine Learning', 'Vue.js', 'PostgreSQL'],
      impact: 'AI-powered symptom analysis and diagnostics',
      github: '#',
      demo: null,
    },
    {
      title: 'Kardili E-Commerce App',
      description:
        'A cross-platform mobile application offering buy-now-pay-later functionality with seamless payment integration and user-friendly interface.',
      image: 'https://images.unsplash.com/photo-1723705027411-9bfc3c99c2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBtb2JpbGUlMjBhcHBsaWNhdGlvbnxlbnwxfHx8fDE3NzA5MjQ4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['Flutter', 'Firebase', 'Google Pay', 'REST API'],
      impact: 'Cross-platform mobile experience',
      github: null,
      demo: null,
    },
    // Placeholder for additional projects
    {
      title: 'Your Next Project Here',
      description:
        'This slot is reserved for your next amazing project. Update the projects array in Projects.tsx to add more projects with details.',
      image: 'https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHNjcmVlbnxlbnwxfHx8fDE3NzA4Njc2NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['Technology 1', 'Technology 2', 'Technology 3'],
      impact: 'Impact description here',
      github: null,
      demo: null,
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto mb-6" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
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

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Links Overlay */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/90 dark:bg-gray-900/90 rounded-full hover:bg-white dark:hover:bg-gray-900 transition-colors"
            >
              <Github className="w-5 h-5 text-gray-900 dark:text-white" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/90 dark:bg-gray-900/90 rounded-full hover:bg-white dark:hover:bg-gray-900 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-gray-900 dark:text-white" />
            </a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech: string, techIndex: number) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Impact */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Impact:</span> {project.impact}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
