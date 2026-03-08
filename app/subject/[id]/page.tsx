'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getSubjectLectures } from '@/lib/api';
import LectureCard from '@/components/LectureCard';
import Loader from '@/components/Loader';
import { ChevronLeft, PlayCircle } from 'lucide-react';

export default function SubjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [lectures, setLectures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (typeof id === 'string') {
        const result = await getSubjectLectures(id);
        const fetchedLectures = result.lectures || [];
        setLectures(fetchedLectures);
        
        // Save lectures to localStorage for metadata access in the lecture page
        if (fetchedLectures.length > 0) {
          localStorage.setItem('current_lectures', JSON.stringify(fetchedLectures));
        }
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  return (
    <div className="px-4 py-8 space-y-8">
      {/* Header */}
      <header className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Lectures</h1>
          <p className="text-slate-400 text-sm font-medium">Continue your learning journey</p>
        </div>
      </header>

      {/* Lectures List */}
      <div className="space-y-4">
        {loading ? (
          <Loader />
        ) : lectures.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {lectures.map((lecture, i) => (
              <motion.div
                key={lecture.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <LectureCard lecture={lecture} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-600">
              <PlayCircle size={32} />
            </div>
            <p className="text-slate-500 font-bold">No lectures found for this subject.</p>
          </div>
        )}
      </div>
    </div>
  );
}
