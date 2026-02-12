import { motion } from 'motion/react';
import { Code, Rocket, Award, Users } from 'lucide-react';

export function About() {
  const highlights = [
    {
      icon: <Code className="w-8 h-8" />,
      title: '3+ Years Experience',
      description: 'Building scalable enterprise applications',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Microservices Expert',
      description: 'Architecting distributed systems',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Clean Architecture',
      description: 'Following best practices and patterns',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Full-Stack Developer',
      description: 'From database to UI/UX',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Passionate Full-Stack .NET Engineer
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              With over 3 years of experience in software development, I specialize in building 
              scalable, high-performance applications using .NET Core, microservices architecture, 
              and modern frontend technologies.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              My expertise spans the entire software development lifecycle, from system design 
              and architecture to deployment and maintenance. I'm passionate about clean code, 
              Domain-Driven Design, and creating solutions that make a real impact.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              I thrive in collaborative environments and enjoy tackling complex technical challenges. 
              Whether it's migrating legacy systems to modern architectures or building innovative 
              solutions from scratch, I bring dedication and technical excellence to every project.
            </p>
          </motion.div>

          {/* Right Column - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-teal-600 dark:text-teal-400 mb-4">
                  {highlight.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {highlight.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <StatCard number="3+" label="Years Experience" />
          <StatCard number="20+" label="Projects Completed" />
          <StatCard number="10+" label="Technologies" />
          <StatCard number="100%" label="Client Satisfaction" />
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
    >
      <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text mb-2">
        {number}
      </div>
      <div className="text-gray-600 dark:text-gray-400">{label}</div>
    </motion.div>
  );
}
