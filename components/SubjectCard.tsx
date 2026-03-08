'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface SubjectProps {
  subject: {
    id: string;
    name: string;
    image: string;
    batch_name?: string;
  };
}

export default function SubjectCard({ subject }: SubjectProps) {
  return (
    <motion.div
      whileHover={{ x: 8, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      whileTap={{ scale: 0.98 }}
      className="group glass-card rounded-2xl p-4 flex items-center gap-5 transition-all duration-300 border border-white/5"
    >
      <Link href={`/subject/${subject.id}`} className="flex items-center gap-5 w-full">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-slate-800 flex-shrink-0 shadow-lg group-hover:shadow-accent/20 transition-all border-2 border-white/10 group-hover:border-accent/50">
          <Image 
            src={subject.image || `https://picsum.photos/seed/${subject.id}/100/100`} 
            alt={subject.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-lg leading-tight text-slate-300 group-hover:text-white transition-colors">
            {subject.batch_name || 'Premium Batch'}
          </h3>
          <h4 className="font-bold text-xl text-accent mt-1 truncate">
            {subject.name}
          </h4>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Master Pro Series</p>
          </div>
        </div>
        
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all duration-300 border border-white/5">
          <ChevronRight size={22} />
        </div>
      </Link>
    </motion.div>
  );
}
