import { motion } from 'motion/react';
import { Server, Code, Database, Container, Layers, Cloud, LucideIcon } from 'lucide-react';
import type { SkillCategoryRow, SkillRow } from '../../types/content';

const ICON_MAP: Record<string, LucideIcon> = { Server, Code, Database, Container, Layers, Cloud };

export function Skills({ skillCategories }: { skillCategories?: (SkillCategoryRow & { skills: SkillRow[] })[] | null }) {
  if (!skillCategories?.length) return null;
  const categories = skillCategories;

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => {
            const Icon = ICON_MAP[category.icon_name] ?? Server;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-muted rounded-xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary text-primary-foreground rounded-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.id}
                      skill={{ name: skill.name, level: skill.level, years: skill.years }}
                      delay={categoryIndex * 0.1 + skillIndex * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Skills Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'TypeScript',
              'C#',
              'Java',
              'Python',
              'Entity Framework',
              'LINQ',
              'SignalR',
              'JWT',
              'OAuth',
              'Swagger',
              'Jest',
              'xUnit',
              'Postman',
              'Azure',
              'Firebase',
              'Nginx',
              'Linux',
            ].map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-primary/10 dark:bg-primary/20 text-foreground rounded-full border border-primary/20 dark:border-primary/30 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillBar({ skill, delay }: { skill: { name: string; level: number; years: string }; delay: number }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-foreground font-medium">
          {skill.name}
        </span>
        <span className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          {skill.years} years
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
}
