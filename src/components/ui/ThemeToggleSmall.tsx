"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggleSmall() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border transition-all duration-300"
      style={{
        background: isLight
          ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
          : "linear-gradient(135deg, #1e3a5f 0%, #1e293b 100%)",
        borderColor: isLight
          ? "rgba(251, 191, 36, 0.5)"
          : "rgba(96, 165, 250, 0.3)",
        boxShadow: isLight
          ? "0 0 15px rgba(251, 191, 36, 0.4)"
          : "0 0 15px rgba(96, 165, 250, 0.2)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isLight ? "Dark Mode" : "Light Mode"}
    >
      <AnimatePresence mode="wait">
        {isLight ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-white" strokeWidth={2.5} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-blue-200" strokeWidth={2.5} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
