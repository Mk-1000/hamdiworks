import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  /** When false, loader fades out. Driven by content readiness + min display time. */
  visible: boolean;
}

export function LoadingScreen({ visible }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary"
        >
          <div className="text-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-primary tracking-tighter">
                  HM
                </span>
              </div>
            </motion.div>

            {/* Loading Spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-primary-foreground border-t-transparent rounded-full mx-auto mb-4"
            />

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-primary-foreground text-lg"
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
