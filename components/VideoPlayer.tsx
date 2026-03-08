'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Download, FileText, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  playUrl: string;
  downloadUrl?: string;
  pdfUrl?: string;
}

export default function VideoPlayer({ playUrl, downloadUrl, pdfUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!playUrl || !videoRef.current) return;

    let player: any = null;

    async function initPlayer() {
      try {
        setLoading(true);
        setError(null);

        if (!videoRef.current) return;

        // Check if it's a DASH manifest
        const isDash = playUrl.includes('.mpd');

        if (isDash) {
          // Dynamically import dashjs to avoid SSR issues
          const dashjs = (await import('dashjs')).default;
          player = dashjs.MediaPlayer().create();
          player.initialize(videoRef.current, playUrl, true);

          player.on(dashjs.MediaPlayer.events.CAN_PLAY, () => {
            setLoading(false);
          });

          player.on(dashjs.MediaPlayer.events.ERROR, (e: any) => {
            console.error('Dash.js error:', e);
            setError('Failed to load video stream. Please try again later.');
            setLoading(false);
          });
        } else {
          // Normal video player for .webm, .mp4, etc.
          videoRef.current.src = playUrl;
          videoRef.current.oncanplay = () => {
            setLoading(false);
          };
          videoRef.current.onerror = () => {
            setError('Failed to load video file.');
            setLoading(false);
          };
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to initialize DASH player:', err);
        setError('Could not initialize player.');
        setLoading(false);
      }
    }

    initPlayer().catch(err => {
      console.error('Unhandled error in initPlayer:', err);
      setError('An unexpected error occurred.');
      setLoading(false);
    });

    return () => {
      if (player) {
        try {
          player.destroy();
        } catch (e) {
          console.error('Error destroying player:', e);
        }
      }
    };
  }, [playUrl]);

  return (
    <div className="space-y-6">
      {/* Player Container */}
      <div className="relative aspect-video rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl group bg-black">
        {playUrl ? (
          <>
            <video 
              ref={videoRef}
              className="w-full h-full"
              controls
              autoPlay
              playsInline
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-10 h-10 text-accent animate-spin" />
                  <p className="text-white font-bold text-sm animate-pulse">Initializing Stream...</p>
                </div>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20 px-6 text-center">
                <div className="space-y-4">
                  <p className="text-red-400 font-bold">{error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-accent text-background rounded-lg font-bold text-sm"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-slate-500 font-bold">No video source available</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {downloadUrl && (
          <a 
            href={downloadUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-accent text-background px-6 py-3 rounded-xl font-bold hover:bg-accent/90 active:scale-95 transition-all shadow-lg shadow-accent/20"
          >
            <Download size={20} />
            <span>Download Video</span>
          </a>
        )}
        
        {pdfUrl ? (
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 active:scale-95 transition-all border border-white/5"
          >
            <FileText size={20} />
            <span>Lecture Notes</span>
          </a>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-2 bg-white/5 text-slate-500 px-6 py-3 rounded-xl font-bold cursor-not-allowed border border-white/5">
            <FileText size={20} />
            <span>No PDF Available</span>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm">
          <ChevronLeft size={20} />
          Previous
        </button>
        <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm">
          Next
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
