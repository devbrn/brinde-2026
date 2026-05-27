'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoModalProps {
  videoUrl: string;
  thumbnail?: string;
  title: string;
}

export function VideoModal({ videoUrl, thumbnail, title }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
    },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden group cursor-pointer"
      >
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center"
          >
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
            >
              <video
                src={videoUrl}
                muted={isMuted}
                autoPlay
                controls
                className="w-full h-full"
              />

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white transition-all text-2xl"
              >
                ✕
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 right-4 bg-cyan-500/80 hover:bg-cyan-600 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all"
              >
                {isMuted ? '🔇 Som' : '🔊 Mudo'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
