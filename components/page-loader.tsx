'use client';

import { motion } from 'motion/react';

/** Route-change fallback — rotating ring in the right content column. */
export default function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[20rem] w-full flex-none items-center justify-center"
    >
      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
        className="h-[2.5rem] w-[2.5rem] flex-none rounded-full border-[0.1875rem] border-[#25252C] border-t-[#F0F0F7]"
      />
    </div>
  );
}
