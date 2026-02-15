import { motion } from 'motion/react';
import { Code, Rocket, Award, Users, LucideIcon } from 'lucide-react';
import type { AboutTextRow, AboutHighlightRow, AboutStatRow } from '../../types/content';

const ICON_MAP: Record<string, LucideIcon> = { Code, Rocket, Award, Users };

export function About({
  aboutText,
  aboutHighlights,
  aboutStats,
}: {
  aboutText?: AboutTextRow[] | null;
  aboutHighlights?: AboutHighlightRow[] | null;
  aboutStats?: AboutStatRow[] | null;
}) {
  const hasContent = (aboutText?.length ?? 0) > 0 || (aboutHighlights?.length ?? 0) > 0 || (aboutStats?.length ?? 0) > 0;
  if (!hasContent) return null;

  const textRows = aboutText ?? [];
  const highlights = aboutHighlights ?? [];
  const stats = aboutStats ?? [];
  const getText = (key: string) => textRows.find((r) => r.section_key === key)?.content ?? '';
  const sectionTitle = getText('section_title');
  const heading = getText('heading');
  const p1 = getText('paragraph_1');
  const p2 = getText('paragraph_2');
  const p3 = getText('paragraph_3');
  if (!sectionTitle && !heading && !p1 && !p2 && !p3 && highlights.length === 0 && stats.length === 0) return null;

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
          {sectionTitle && (
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {sectionTitle}
            </h2>
          )}
          <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {heading && <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{heading}</h3>}
            {p1 && <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{p1}</p>}
            {p2 && <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{p2}</p>}
            {p3 && <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{p3}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => {
              const Icon = ICON_MAP[highlight.icon_name] ?? Code;
              return (
                <motion.div
                  key={highlight.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-teal-600 dark:text-teal-400 mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {highlight.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <StatCard key={stat.id} number={stat.number} label={stat.label} />
          ))}
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
