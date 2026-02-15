import { motion } from 'motion/react';
import { Award, Check } from 'lucide-react';
import type { CertificationRow, AchievementRow } from '../../types/content';

export function Certifications({
  certifications,
  achievements,
}: {
  certifications?: CertificationRow[] | null;
  achievements?: AchievementRow[] | null;
}) {
  const certs = certifications ?? [];
  const achievementsList = achievements ?? [];
  if (certs.length === 0 && achievementsList.length === 0) return null;

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications & Achievements
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto mb-6" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional certifications and notable accomplishments
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {certs.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, rotateY: 5 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-teal-600 dark:text-teal-400 font-semibold">
                    {cert.issuer}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cert.date}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {cert.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {(Array.isArray(cert.skills) ? cert.skills : []).map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Notable Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievementsList.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 text-white"
              >
                <div className="flex-shrink-0 mt-1">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-lg">{achievement.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
