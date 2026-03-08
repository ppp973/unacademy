'use client';

import Link from 'next/link';
import { Search, Bell, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass px-4 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-background">S</div>
        <span className="text-xl font-bold tracking-tight">ScholarVerse</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Search size={20} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border border-background"></span>
        </button>
        <button className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border border-white/10">
          <User size={18} />
        </button>
      </div>
    </nav>
  );
}
