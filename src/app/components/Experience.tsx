import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';

export function Experience() {
  const experiences = [
    {
      company: 'Tech Company A',
      role: 'Senior Full-Stack .NET Engineer',
      period: '2024 - Present',
      location: 'Remote',
      achievements: [
        'Led migration of monolithic application to microservices architecture',
        'Reduced deployment time by 60% through containerization with Docker',
        'Mentored junior developers in Clean Architecture principles',
        'Implemented CI/CD pipelines improving release frequency',
      ],
      technologies: ['.NET Core', 'Docker', 'Kubernetes', 'Azure', 'React'],
    },
    {
      company: 'Football KickOff (Startup)',
      role: 'Full-Stack Developer & Co-Founder',
      period: '2023 - Present',
      location: 'Monastir, Tunisia',
      achievements: [
        'Built SaaS platform from scratch serving 1000+ users',
        'Implemented real-time messaging with WebSocket',
        'Designed scalable microservices architecture on GCP',
        'Reduced server costs by 40% through optimization',
      ],
      technologies: ['NestJS', 'MongoDB', 'Docker', 'GCP', 'WebSocket'],
    },
    {
      company: 'Digital Solutions Inc.',
      role: 'Full-Stack Developer',
      period: '2022 - 2023',
      location: 'Tunisia',
      achievements: [
        'Developed healthcare platform with AI diagnostic features',
        'Integrated machine learning models for symptom analysis',
        'Built responsive admin dashboards with Vue.js',
        'Optimized database queries improving performance by 50%',
      ],
      technologies: ['Symfony', 'Flask', 'Vue.js', 'PostgreSQL', 'ML'],
    },
    {
      company: 'Mobile Dev Studio',
      role: 'Mobile Application Developer',
      period: '2021 - 2022',
      location: 'Tunisia',
      achievements: [
        'Created cross-platform e-commerce mobile app with Flutter',
        'Integrated payment gateways including Google Pay',
        'Implemented offline-first architecture with local storage',
        'Published apps with 4.5+ star ratings on app stores',
      ],
      technologies: ['Flutter', 'Firebase', 'REST API', 'Google Pay'],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto mb-6" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My journey through innovative projects and technical challenges
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-teal-600 to-emerald-600" />

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

function TimelineItem({ experience, index }: { experience: any; index: number }) {
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
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full z-10 shadow-lg" />

      {/* Content */}
      <div className={isLeft ? 'md:pr-12' : 'md:col-start-2 md:pl-12'}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {experience.company}
              </h3>
            </div>
            <h4 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-2">
              {experience.role}
            </h4>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{experience.period}</span>
              <span>•</span>
              <span>{experience.location}</span>
            </div>
          </div>

          {/* Achievements */}
          <ul className="space-y-2 mb-4">
            {experience.achievements.map((achievement: string, achIndex: number) => (
              <li
                key={achIndex}
                className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
              >
                <span className="text-teal-600 dark:text-teal-400 mt-1">▪</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech: string, techIndex: number) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm"
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
