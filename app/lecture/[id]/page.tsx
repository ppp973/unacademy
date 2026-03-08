'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getLectureVideo, getSubjectLectures } from '@/lib/api';
import VideoPlayer from '@/components/VideoPlayer';
import Loader from '@/components/Loader';
import { ChevronLeft, User, Info, MessageCircle } from 'lucide-react';

export default function LecturePage() {
  const { id } = useParams();
  const router = useRouter();
  const [videoData, setVideoData] = useState<any>(null);
  const [lectureInfo, setLectureInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (typeof id === 'string') {
        // Fetch video URLs
        const videoResult = await getLectureVideo(id);
        setVideoData(videoResult);
        
        // We also need lecture details (title, teacher, etc.)
        // Since the video API doesn't return metadata, we'd normally get it from the subject list
        // For now, we'll try to find it in localStorage or just use placeholders if not found
        const savedLectures = localStorage.getItem('current_lectures');
        if (savedLectures) {
          try {
            const lectures = JSON.parse(savedLectures);
            const current = lectures.find((l: any) => l.id === id);
            if (current) setLectureInfo(current);
          } catch (e) {
            console.error('Error parsing saved lectures:', e);
          }
        }
        
        // Save as last played
        localStorage.setItem('last_played_lecture', id);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <header className="px-4 py-4 flex items-center gap-4 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-30">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg font-bold truncate">{videoData?.title || lectureInfo?.title || 'Lecture Video'}</h1>
          <p className="text-slate-400 text-xs font-medium truncate">{videoData?.teacher || lectureInfo?.teacher || 'Premium Educator'}</p>
        </div>
      </header>

      <div className="px-4 py-6 space-y-8">
        {/* Video Player Section */}
        <section className="relative">
          <div className="absolute -inset-4 bg-accent/5 blur-3xl rounded-full opacity-50 pointer-events-none" />
          <VideoPlayer 
            playUrl={videoData?.download_url || videoData?.video_urls?.download || ''} 
            downloadUrl={videoData?.download_url || videoData?.video_urls?.download || ''}
            pdfUrl={videoData?.pdf?.url || lectureInfo?.pdf_url}
          />
        </section>

        {/* Lecture Details */}
        <section className="space-y-6">
          <div className="glass-card rounded-[2rem] p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16" />
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-blue-600 rounded-2xl flex items-center justify-center text-background shadow-lg shadow-accent/20">
                <User size={28} />
              </div>
              <div>
                <h3 className="font-black text-xl">{videoData?.teacher || lectureInfo?.teacher || 'Expert Educator'}</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Verified Educator</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <Info size={18} />
                <span className="font-black text-sm uppercase tracking-wider">Lecture Insights</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                This premium session on <span className="text-white font-bold">{videoData?.title || lectureInfo?.title || 'this topic'}</span> is designed to provide deep conceptual clarity. 
                Our structured approach ensures you master the fundamentals while tackling advanced applications.
              </p>
            </div>
          </div>

          {/* Chat/Discussion Placeholder */}
          <div className="glass-card rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                <MessageCircle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Doubts & Discussion</h4>
                <p className="text-slate-500 text-xs">Join 1.2k students in discussion</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-all">
              Join Chat
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
