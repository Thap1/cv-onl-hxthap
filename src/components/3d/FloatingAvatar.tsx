"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function FloatingAvatar() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      {/* Outer Glow Effects */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Pulsing glow background */}
        <motion.div
          className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Animated Rings */}
      <motion.div
        className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-blue-500/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-72 h-72 md:w-[22rem] md:h-[22rem] rounded-full border border-purple-500/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full border border-cyan-500/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Particles around avatar */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
          style={{
            left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 8)}%`,
            top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 8)}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.25,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main Avatar Container */}
      <motion.div
        className="relative z-10"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Avatar Glow Border */}
        <motion.div
          className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 blur-md"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Gradient Border */}
        <div className="relative p-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
          {/* Inner Border */}
          <div className="p-1 rounded-full bg-slate-900">
            {/* Avatar Image */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
              <Image
                src="/avt.jpg"
                alt="Hoàng Xuân Tháp"
                fill
                className="object-cover"
                priority
              />

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/30"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-white text-xs font-bold tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            AVAILABLE
          </span>
        </motion.div>

        {/* Level Badge */}
        <motion.div
          className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/30"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="text-center">
            <div className="text-[10px] font-bold text-black/70">LVL</div>
            <div className="text-lg font-black text-black leading-none">7</div>
          </div>
        </motion.div>

        {/* XP Ring */}
        <svg
          className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]"
          viewBox="0 0 100 100"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="url(#xpGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="301.59"
            initial={{ strokeDashoffset: 301.59 }}
            animate={{ strokeDashoffset: 301.59 * 0.3 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <defs>
            <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-10 right-10 text-4xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        ⚡
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-10 text-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -10, 10, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        🚀
      </motion.div>
      <motion.div
        className="absolute top-20 left-5 text-2xl"
        animate={{
          y: [0, -10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        💻
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-5 text-2xl"
        animate={{
          y: [0, 10, 0],
          rotate: [0, 20, 0],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        ⭐
      </motion.div>
    </div>
  );
}
