"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "star" | "dot" | "diamond";
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 30;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        type: ["star", "dot", "diamond"][Math.floor(Math.random() * 3)] as "star" | "dot" | "diamond",
      });
    }

    setParticles(newParticles);
  }, []);

  const renderParticle = (type: string, size: number) => {
    switch (type) {
      case "star":
        return (
          <svg width={size * 2} height={size * 2} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
          </svg>
        );
      case "diamond":
        return (
          <svg width={size * 2} height={size * 2} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L22 12L12 22L2 12L12 2Z" />
          </svg>
        );
      default:
        return (
          <div
            className="rounded-full bg-current"
            style={{ width: size, height: size }}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            color: `rgba(${Math.random() > 0.5 ? "59, 130, 246" : "168, 85, 247"}, ${Math.random() * 0.3 + 0.1})`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [0, -100, -200],
            x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {renderParticle(particle.type, particle.size)}
        </motion.div>
      ))}

      {/* Glowing orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
          left: "10%",
          top: "20%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
          right: "15%",
          top: "60%",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
          left: "50%",
          bottom: "10%",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
