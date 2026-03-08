'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBatches } from '@/lib/api';
import BatchCard from '@/components/BatchCard';
import { SkeletonCard } from '@/components/Loader';
import { Sparkles, Filter, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const [batches, setBatches] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const [lastPlayed, setLastPlayed] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const result = await getBatches();
      if (result.success) {
        setBatches(result.data.batches);
        setCategories(['All', ...result.data.categories]);
      }
      
      // Check for last played lecture
      const lastId = localStorage.getItem('last_played_lecture');
      const savedLectures = localStorage.getItem('current_lectures');
      if (lastId && savedLectures) {
        try {
          const lectures = JSON.parse(savedLectures);
          const current = lectures.find((l: any) => l.id === lastId);
          if (current) setLastPlayed(current);
        } catch (e) {
          console.error('Error parsing saved lectures:', e);
        }
      }
      
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredBatches = selectedCategory === 'All' 
    ? batches 
    : batches.filter(b => b.category === selectedCategory);

  return (
    <div className="px-4 py-8 space-y-8">
      {/* Hero Header */}
      <header className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest"
        >
          <Sparkles size={16} />
          <span>Premium Access</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black leading-tight"
        >
          Explore Our <span className="text-gradient">Premium Batches</span>
        </motion.h1>
      </header>

      {/* Continue Learning */}
      {lastPlayed && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Continue Learning
          </h2>
          <div className="glass-card rounded-2xl p-4 flex items-center justify-between group">
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative w-20 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image 
                  src={lastPlayed.thumbnail || `https://picsum.photos/seed/${lastPlayed.id}/200/120`} 
                  alt={lastPlayed.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-background">
                    <Play size={12} fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm truncate">{lastPlayed.title}</h3>
                <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">{lastPlayed.teacher}</p>
              </div>
            </div>
            <Link 
              href={`/lecture/${lastPlayed.id}`}
              className="px-4 py-2 bg-accent text-background rounded-lg text-xs font-bold hover:scale-105 transition-all"
            >
              Resume
            </Link>
          </div>
        </motion.section>
      )}

      {/* Categories Filter */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex-shrink-0 p-2 bg-white/5 rounded-xl text-slate-400">
          <Filter size={20} />
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              selectedCategory === cat 
                ? 'bg-accent text-background shadow-lg shadow-accent/20' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : filteredBatches.length > 0 ? (
          filteredBatches.map((batch, i) => (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <BatchCard batch={batch} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <p className="text-xl font-bold text-slate-500">No batches found in this category.</p>
            <button 
              onClick={() => setSelectedCategory('All')}
              className="text-accent font-bold hover:underline"
            >
              Show all batches
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
