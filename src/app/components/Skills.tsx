import { motion } from 'motion/react';
import { Server, Code, Database, Container, Layers, Cloud } from 'lucide-react';

export function Skills() {
  const skillCategories = [
    {
      title: 'Backend Development',
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: '.NET Core', level: 95, years: '3+' },
        { name: 'Spring Boot', level: 80, years: '2+' },
        { name: 'NestJS', level: 85, years: '2+' },
        { name: 'RESTful APIs', level: 90, years: '3+' },
      ],
    },
    {
      title: 'Frontend Development',
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: 'React', level: 85, years: '2+' },
        { name: 'Flutter', level: 80, years: '2+' },
        { name: 'Razor Pages', level: 75, years: '2+' },
        { name: 'Vue.js', level: 70, years: '1+' },
      ],
    },
    {
      title: 'Databases',
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: 'SQL Server', level: 90, years: '3+' },
        { name: 'PostgreSQL', level: 85, years: '2+' },
        { name: 'MongoDB', level: 80, years: '2+' },
        { name: 'Redis', level: 75, years: '1+' },
      ],
    },
    {
      title: 'DevOps & Cloud',
      icon: <Container className="w-6 h-6" />,
      skills: [
        { name: 'Docker', level: 90, years: '2+' },
        { name: 'Kubernetes', level: 80, years: '1+' },
        { name: 'CI/CD', level: 85, years: '2+' },
        { name: 'GCP', level: 75, years: '1+' },
      ],
    },
    {
      title: 'Architecture',
      icon: <Layers className="w-6 h-6" />,
      skills: [
        { name: 'Clean Architecture', level: 95, years: '3+' },
        { name: 'DDD', level: 85, years: '2+' },
        { name: 'Microservices', level: 90, years: '2+' },
        { name: 'CQRS', level: 80, years: '2+' },
      ],
    },
    {
      title: 'Other Technologies',
      icon: <Cloud className="w-6 h-6" />,
      skills: [
        { name: 'Git', level: 90, years: '3+' },
        { name: 'GraphQL', level: 75, years: '1+' },
        { name: 'WebSocket', level: 80, years: '2+' },
        { name: 'RabbitMQ', level: 75, years: '1+' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto mb-6" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skillIndex}
                    skill={skill}
                    delay={categoryIndex * 0.1 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
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
                className="px-4 py-2 bg-gradient-to-r from-teal-600/10 to-emerald-600/10 dark:from-teal-600/20 dark:to-emerald-600/20 text-gray-700 dark:text-gray-300 rounded-full border border-teal-600/20 dark:border-teal-600/30 cursor-default"
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
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {skill.name}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
          {skill.years} years
        </span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay }}
          className="h-full bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full"
        />
      </div>
    </div>
  );
}
