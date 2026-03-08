'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, User, Calendar } from 'lucide-react';

interface LectureProps {
  lecture: {
    id: string;
    title: string;
    teacher: string;
    thumbnail: string;
  };
}

export default function LectureCard({ lecture }: LectureProps) {
  return (
    <motion.div
      whileHover={{ y: -4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      whileTap={{ scale: 0.98 }}
      className="group glass-card rounded-2xl overflow-hidden transition-all duration-300"
    >
      <Link href={`/lecture/${lecture.id}`} className="flex flex-col sm:flex-row sm:items-center gap-5 p-4">
        <div className="relative aspect-video sm:w-48 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
          <Image 
            src={lecture.thumbnail || `https://picsum.photos/seed/${lecture.id}/320/180`} 
            alt={lecture.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-accent text-background rounded-full flex items-center justify-center shadow-2xl shadow-accent/40 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play size={24} fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[9px] font-black text-white uppercase tracking-widest">
            HD
          </div>
        </div>
        
        <div className="flex-1 min-w-0 space-y-3 py-1">
          <h3 className="font-black text-lg leading-tight line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {lecture.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <User size={12} />
              </div>
              <span>{lecture.teacher}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-slate-500">
                <Calendar size={12} />
              </div>
              <span>Premium Lecture</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
