"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cvData } from "@/data/cv-data";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const icons = [GraduationCap, Award, BookOpen];

export function Education({ locale }: { locale: string }) {
  const t = useTranslations("education");
  const { theme } = useTheme();
  const isLight = theme === "light";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="relative py-20 md:py-32" ref={ref}>
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
          <p className={cn("text-lg max-w-2xl mx-auto", isLight ? "text-slate-700" : "text-white/60")} style={isLight ? { color: '#475569' } : {}}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cvData.education.map((edu, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={edu.period}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="glass-card p-6 relative overflow-hidden group cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                >
                  <Icon className="text-primary" size={28} />
                </motion.div>

                {/* Period Badge */}
                <span className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent font-mono inline-block mb-3">
                  {edu.period}
                </span>

                {/* School */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {locale === "vi" ? edu.school.vi : edu.school.en}
                </h3>

                {/* Degree */}
                <p className={cn("text-sm", isLight ? "text-slate-500" : "text-white/60")}>
                  {locale === "vi" ? edu.degree.vi : edu.degree.en}
                </p>

                {/* Unlock Effect */}
                <motion.div
                  className="absolute bottom-2 right-2 text-2xl opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0, rotate: -180 }}
                  whileHover={{ scale: 1, rotate: 0 }}
                >
                  🏆
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-md mx-auto"
        >
          <div className="glass-card p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">🌐 Languages</h3>
            {cvData.languages.map((lang) => (
              <div key={lang.name.en} className="flex items-center justify-between">
                <span className={cn(isLight ? "text-slate-700" : "text-white/80")}>
                  {locale === "vi" ? lang.name.vi : lang.name.en}
                </span>
                <span className={cn("text-sm", isLight ? "text-slate-500" : "text-white/50")}>
                  {locale === "vi" ? lang.level.vi : lang.level.en}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
