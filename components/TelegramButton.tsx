'use client';

import { Send } from 'lucide-react';

export default function TelegramButton() {
  return (
    <a 
      href="https://t.me/scholarverse" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-[#229ED9] text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 hover:scale-110 active:scale-95 transition-all"
    >
      <Send size={24} fill="white" />
    </a>
  );
}
