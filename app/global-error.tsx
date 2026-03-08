'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
    <html lang="en">
      <body className="bg-[#0f172a] text-white min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-black">Critical Error</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            A critical error occurred in the application layout. Please try refreshing the page.
          </p>
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-accent text-background rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-accent/20"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
