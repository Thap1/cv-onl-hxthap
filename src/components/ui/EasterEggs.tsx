"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

const FUN_FACTS = [
  { vi: "🎮 Tôi có thể code 12 tiếng liên tục khi đang \"trong zone\"", en: "🎮 I can code 12 hours straight when I'm \"in the zone\"" },
  { vi: "☕ Coffee là nhiên liệu chính của tôi - 4 cốc/ngày", en: "☕ Coffee is my main fuel - 4 cups/day" },
  { vi: "🎸 Tôi thích nghe Lo-Fi khi code", en: "🎸 I love listening to Lo-Fi while coding" },
  { vi: "🌙 Bug thường được fix lúc 2 giờ sáng", en: "🌙 Bugs are usually fixed at 2 AM" },
  { vi: "🐛 \"It works on my machine\" - Câu nói yêu thích", en: "🐛 \"It works on my machine\" - Favorite quote" },
  { vi: "🚀 First commit của tôi là năm 2018", en: "🚀 My first commit was in 2018" },
];

export function EasterEggs() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [avatarClicks, setAvatarClicks] = useState(0);
  const [showFunFact, setShowFunFact] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);

  // Get locale from cookie
  const [locale, setLocale] = useState<string>("vi");
  useEffect(() => {
    const savedLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1];
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  // Konami Code Handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === KONAMI_CODE[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          // Konami code completed!
          setShowSecret(true);
          setKonamiIndex(0);

          // Fire confetti
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#3b82f6", "#f59e0b", "#10b981"],
          });

          // Hide after 5 seconds
          setTimeout(() => setShowSecret(false), 5000);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    },
    [konamiIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Avatar click handler (5 clicks = fun fact)
  useEffect(() => {
    const handleAvatarClick = () => {
      setAvatarClicks((prev) => {
        const newCount = prev + 1;
        if (newCount >= 5) {
          setCurrentFact(Math.floor(Math.random() * FUN_FACTS.length));
          setShowFunFact(true);
          setTimeout(() => setShowFunFact(false), 4000);
          return 0;
        }
        return newCount;
      });
    };

    // Find avatar element and attach listener
    const avatar = document.querySelector("[data-avatar]");
    if (avatar) {
      avatar.addEventListener("click", handleAvatarClick);
      return () => avatar.removeEventListener("click", handleAvatarClick);
    }
  }, []);

  // Scroll to bottom confetti
  useEffect(() => {
    let triggered = false;
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (scrolledToBottom && !triggered) {
        triggered = true;
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 1 },
          colors: ["#3b82f6", "#f59e0b"],
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Konami Code Secret */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 glass-card p-6 text-center max-w-md"
          >
            <div className="text-4xl mb-3">🎉🎮🎉</div>
            <h3 className="text-xl font-bold text-gradient mb-2">
              {locale === "vi" ? "Bạn đã tìm ra bí mật!" : "You found the secret!"}
            </h3>
            <p className="text-white/70 text-sm">
              {locale === "vi"
                ? "Konami Code activated! Bạn là người chơi thực thụ 🕹️"
                : "Konami Code activated! You're a true gamer 🕹️"}
            </p>
            <div className="mt-3 text-xs text-white/40 font-mono">
              ↑ ↑ ↓ ↓ ← → ← → B A
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fun Fact Popup */}
      <AnimatePresence>
        {showFunFact && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 glass-card p-4 max-w-xs"
          >
            <div className="text-sm text-white/80">
              {locale === "vi" ? FUN_FACTS[currentFact].vi : FUN_FACTS[currentFact].en}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konami progress indicator (subtle) */}
      {konamiIndex > 0 && konamiIndex < KONAMI_CODE.length && (
        <div className="fixed bottom-4 left-4 z-50 text-xs text-white/30 font-mono">
          {konamiIndex}/{KONAMI_CODE.length}
        </div>
      )}
    </>
  );
}
