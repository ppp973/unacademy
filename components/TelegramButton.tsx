'use client';

import { useState, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TelegramButton() {

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <a
        href="https://whatsapp.com/channel/0029VbAvDSX0QeahEg4kkE3U"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
      >
        <Send size={24} />
      </a>

      {/* Premium Popup */}
      <AnimatePresence>

        {showPopup && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >

            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ duration: 0.35 }}
              className="relative w-[92%] max-w-md p-8 rounded-3xl bg-white/90 backdrop-blur-lg shadow-2xl"
            >

              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <X size={22} />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Send size={30} />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center mb-2">
                Join Our WhatsApp Channel
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-center mb-6">
                Get latest batches, lectures and important updates instantly.
              </p>

              {/* Button */}
              <a
                href="https://whatsapp.com/channel/0029VbAvDSX0QeahEg4kkE3U"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.03] transition-all shadow-lg"
              >
                Join Channel
              </a>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}
