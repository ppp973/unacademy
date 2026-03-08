import Link from 'next/link';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-8">
      <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center text-accent shadow-2xl shadow-accent/10 border border-white/5 animate-pulse">
        <Search size={48} />
      </div>
      
      <div className="space-y-3">
        <h2 className="text-4xl font-black text-white">Page Not Found</h2>
        <p className="text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
          The lecture or subject you&apos;re looking for might have been moved or doesn&apos;t exist anymore.
        </p>
      </div>
      
      <Link
        href="/"
        className="px-10 py-4 bg-accent text-background rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/30"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
