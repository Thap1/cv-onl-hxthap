"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorEffect() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)",
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          }}
        />
      </motion.div>

      {/* Trailing glow */}
      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 0.5 : 0,
        }}
      >
        <div
          className="w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 0.6 : 0,
        }}
      >
        <motion.div
          className="w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/50"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </>
  );
}
