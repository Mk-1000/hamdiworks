import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';
import type { ExperienceRow } from '../../types/content';

export function Experience({ experiences }: { experiences?: ExperienceRow[] | null }) {
  if (!experiences?.length) return null;

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My journey through innovative projects and technical challenges
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <TimelineItem key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ experience, index }: { experience: ExperienceRow; index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative md:grid md:grid-cols-2 md:gap-8 ${
        isLeft ? '' : 'md:text-right'
      }`}
    >
      {/* Timeline Dot */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10 shadow-lg" />

      {/* Content */}
      <div className={isLeft ? 'md:pr-12' : 'md:col-start-2 md:pl-12'}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-muted rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-foreground">
                {experience.company}
              </h3>
            </div>
            <h4 className="text-lg font-semibold text-primary mb-2">
              {experience.role}
            </h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{experience.period}</span>
              <span>•</span>
              <span>{experience.location}</span>
            </div>
          </div>

          {/* Achievements */}
          <ul className="space-y-2 mb-4">
            {(Array.isArray(experience.achievements) ? experience.achievements : []).map((achievement: string, achIndex: number) => (
              <li
                key={achIndex}
                className="flex items-start gap-2 text-foreground"
              >
                <span className="text-primary mt-1">▪</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(experience.technologies) ? experience.technologies : []).map((tech: string, techIndex: number) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Empty space for alternating layout */}
      {!isLeft && <div className="hidden md:block" />}
    </motion.div>
  );
}
