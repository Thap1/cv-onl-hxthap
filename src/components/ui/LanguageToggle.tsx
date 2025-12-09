"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { motion } from "framer-motion";

export function LanguageToggle() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
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

  const toggleLocale = () => {
    const newLocale = locale === "vi" ? "en" : "vi";
    setLocale(newLocale);
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="relative flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm font-medium"
    >
      <motion.span
        key={locale}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="flex items-center gap-1.5"
      >
        {locale === "vi" ? (
          <>
            <span className="text-base">🇻🇳</span>
            <span>VI</span>
          </>
        ) : (
          <>
            <span className="text-base">🇺🇸</span>
            <span>EN</span>
          </>
        )}
      </motion.span>
      {isPending && (
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </button>
  );
}
