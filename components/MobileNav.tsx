'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, PlayCircle, User } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Courses', icon: BookOpen, path: '/courses' },
    { name: 'Learning', icon: PlayCircle, path: '/learning' },
    { name: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 px-6 py-3 flex items-center justify-between md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link 
            key={item.name} 
            href={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-accent' : 'text-slate-400'}`}
          >
            <item.icon size={24} />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
