'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight } from 'lucide-react';

interface BatchProps {
  batch: {
    id: string;
    name: string;
    image: string;
    category: string;
    subjects_count: number;
  };
}

export default function BatchCard({ batch }: BatchProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative rounded-2xl overflow-hidden glass-card transition-all duration-300"
    >
      <Link href={`/batch/${batch.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image 
            src={batch.image || `https://picsum.photos/seed/${batch.id}/400/225`} 
            alt={batch.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2.5 py-1 bg-accent/90 text-background text-[9px] font-black uppercase tracking-widest rounded-md shadow-lg shadow-accent/20">
              {batch.category}
            </span>
          </div>
        </div>
        
        <div className="p-5 space-y-4">
          <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {batch.name}
          </h3>
          
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
              <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-accent">
                <BookOpen size={12} />
              </div>
              <span>{batch.subjects_count} Subjects</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-background group-hover:rotate-[-45deg] transition-all duration-500">
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
