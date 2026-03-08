'use client';

import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full"
      />
      <p className="mt-4 text-slate-400 font-medium animate-pulse">Loading amazing content...</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl glass-card overflow-hidden h-[240px]">
      <div className="h-32 skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 skeleton rounded" />
        <div className="h-3 w-1/2 skeleton rounded" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 skeleton rounded-full" />
          <div className="h-6 w-16 skeleton rounded-full" />
        </div>
      </div>
    </div>
  );
}
