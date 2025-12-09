"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-3 rounded-full blur-md"
        animate={{
          background: isLight
            ? "radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Button container */}
      <motion.div
        className="relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden border-2"
        animate={{
          background: isLight
            ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)"
            : "linear-gradient(135deg, #1e3a5f 0%, #1e293b 50%, #0f172a 100%)",
          borderColor: isLight
            ? "rgba(251, 191, 36, 0.6)"
            : "rgba(96, 165, 250, 0.4)",
          boxShadow: isLight
            ? "0 0 30px rgba(251, 191, 36, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.3)"
            : "0 0 30px rgba(96, 165, 250, 0.3), inset 0 2px 10px rgba(255, 255, 255, 0.1)",
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Rotating background effect */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 6)}%`,
                top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 6)}%`,
                background: isLight ? "#fff" : "#60a5fa",
                opacity: 0.6,
              }}
            />
          ))}
        </motion.div>

        {/* Icon animation */}
        <AnimatePresence mode="wait">
          {isLight ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              className="relative z-10"
            >
              <Sun className="w-7 h-7 text-white drop-shadow-lg" strokeWidth={2.5} />
              {/* Sun rays animation */}
              <motion.div
                className="absolute -inset-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-2 bg-white/60 rounded-full"
                    style={{
                      left: "50%",
                      top: "-8px",
                      transformOrigin: "50% 20px",
                      transform: `translateX(-50%) rotate(${i * 45}deg)`,
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              className="relative z-10"
            >
              <Moon className="w-6 h-6 text-blue-200 drop-shadow-lg" strokeWidth={2.5} />
              {/* Stars around moon */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${["-8px", "20px", "8px"][i]}`,
                    top: `${["-4px", "-6px", "20px"][i]}`,
                  }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <Sparkles className="w-2 h-2 text-blue-300" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: isLight
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(255, 255, 255, 0.1)",
          color: isLight ? "#fff" : "#94a3b8",
        }}
      >
        {isLight ? "Dark Mode" : "Light Mode"}
      </motion.div>
    </motion.button>
  );
}
