'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-white">Something went wrong!</h2>
        <p className="text-slate-400 font-medium max-w-md mx-auto">
          We encountered an unexpected error while loading this page. Please try again or return home.
        </p>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-accent text-background rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-accent/20"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-8 py-3 bg-white/5 text-white rounded-xl font-bold hover:bg-white/10 transition-all border border-white/5"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
