"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cvData } from "@/data/cv-data";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export function About({ locale }: { locale: string }) {
  const t = useTranslations("about");
  const { theme } = useTheme();
  const isLight = theme === "light";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const about = locale === "vi" ? cvData.about.vi : cvData.about.en;

  return (
    <section id="about" className="relative py-20 md:py-32" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">
            <span className="text-gradient">{t("title")}</span>
          </h2>
          <p className={cn(
            "text-lg max-w-2xl mx-auto",
            isLight ? "text-slate-700" : "text-white/60"
          )} style={isLight ? { color: '#475569' } : {}}>
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 md:p-12 max-w-4xl mx-auto"
        >
          <p className={cn(
            "text-lg md:text-xl leading-relaxed",
            isLight ? "text-slate-700" : "text-white/80"
          )}>
            {about}
          </p>

          {/* Quick Info */}
          <div className={cn(
            "grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 border-t",
            isLight ? "border-slate-200" : "border-white/10"
          )}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">📍</div>
              <div className={cn("text-sm", isLight ? "text-slate-600" : "text-white/60")}>Vietnam</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">🎂</div>
              <div className={cn("text-sm", isLight ? "text-slate-600" : "text-white/60")}>1996</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">💼</div>
              <div className={cn("text-sm", isLight ? "text-slate-600" : "text-white/60")}>Lead Developer</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">🏦</div>
              <div className={cn("text-sm", isLight ? "text-slate-600" : "text-white/60")}>FinTech Expert</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
