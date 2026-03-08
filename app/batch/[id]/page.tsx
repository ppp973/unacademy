'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getBatchDetails } from '@/lib/api';
import SubjectCard from '@/components/SubjectCard';
import Loader from '@/components/Loader';
import { ChevronLeft, BookOpen } from 'lucide-react';

export default function BatchPage() {
  const { id } = useParams();
  const router = useRouter();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (typeof id === 'string') {
        const result = await getBatchDetails(id);
        setSubjects(result.subjects || []);
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
          <h1 className="text-2xl font-bold">Batch Subjects</h1>
          <p className="text-slate-400 text-sm font-medium">Select a subject to view lectures</p>
        </div>
      </header>

      {/* Subjects List */}
      <div className="space-y-4">
        {loading ? (
          <Loader />
        ) : subjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((subject, i) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <SubjectCard subject={subject} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-600">
              <BookOpen size={32} />
            </div>
            <p className="text-slate-500 font-bold">No subjects found for this batch.</p>
          </div>
        )}
      </div>
    </div>
  );
}
