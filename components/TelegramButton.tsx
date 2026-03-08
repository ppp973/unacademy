'use client';

import { useState, useEffect } from 'react';
import { Send, X } from 'lucide-react';

export default function WhatsAppPopup() {

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000); // batches load hone ke baad popup show

    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="bg-white w-[90%] max-w-sm rounded-2xl p-6 relative shadow-xl">

        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4 text-blue-500">
          <Send size={40} />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-2">
          Join Our WhatsApp Channel
        </h2>

        {/* Text */}
        <p className="text-gray-600 text-center mb-5">
          Latest batches, lectures and updates instantly on WhatsApp.
        </p>

        {/* Button */}
        <a
          href="https://whatsapp.com/channel/0029VbAvDSX0QeahEg4kkE3U"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Join Channel
        </a>

      </div>

    </div>
  );
}
