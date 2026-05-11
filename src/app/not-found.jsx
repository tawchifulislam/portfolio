'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-[#030303]">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative flex flex-col items-center text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[10rem] md:text-[14rem] font-black leading-none text-white/3 select-none">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col items-center gap-4 -mt-16 md:-mt-24"
        >
          <span className="px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-violet-500/10 border border-violet-500/20 text-violet-400">
            Page Not Found
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Lost in the void.
          </h2>

          <p className="text-sm text-white/30 max-w-sm leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved somewhere else.
          </p>
        </motion.div>

        <motion.button
          onClick={() => router.push('/')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/3 hover:bg-white/6 border border-white/8 hover:border-violet-500/30 text-white/50 hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur-sm transition-all duration-300"
        >
          <ArrowLeft size={14} />
          Back to Home
        </motion.button>
      </div>
    </div>
  );
}
