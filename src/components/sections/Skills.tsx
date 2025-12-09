"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { cvData } from "@/data/cv-data";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const categoryIcons: Record<string, string> = {
  framework: "⚛️",
  language: "📝",
  ui: "🎨",
  tool: "🛠️",
  backend: "⚙️",
  runtime: "🚀",
  methodology: "📋",
};

const categoryColors: Record<string, string> = {
  framework: "from-blue-500 to-cyan-500",
  language: "from-purple-500 to-pink-500",
  ui: "from-orange-500 to-yellow-500",
  tool: "from-green-500 to-emerald-500",
  backend: "from-red-500 to-orange-500",
  runtime: "from-indigo-500 to-purple-500",
  methodology: "from-teal-500 to-cyan-500",
};

interface SkillCardProps {
  skill: { name: string; level: number; category: string };
  index: number;
  isInView: boolean;
  locale: string;
}

function SkillCard({ skill, index, isInView, locale }: SkillCardProps) {
  const t = useTranslations("skills");
  const [isHovered, setIsHovered] = useState(false);

  // Calculate XP percentage for current level
  const xpPercent = (skill.level / 10) * 100;
  const isMaxLevel = skill.level >= 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.05, duration: 0.4, type: "spring" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "glass-card p-5 cursor-pointer transition-all duration-300 neon-border",
        isHovered && "scale-105",
        isMaxLevel && "achievement"
      )}
    >
      {/* Header with icon and level */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.span
            className="text-2xl"
            animate={isHovered ? { scale: 1.2, rotate: [0, -10, 10, 0] } : {}}
          >
            {categoryIcons[skill.category]}
          </motion.span>
          <span className="font-semibold">{skill.name}</span>
        </div>

        {/* Level Badge - Game Style */}
        <motion.div
          className={cn(
            "level-badge",
            isMaxLevel && "!bg-gradient-to-r !from-yellow-400 !to-orange-500"
          )}
          animate={isMaxLevel ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isMaxLevel && "⭐"} Lv.{skill.level}
        </motion.div>
      </div>

      {/* XP Bar - Game Style */}
      <div className="xp-bar mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${xpPercent}%` } : { width: 0 }}
          transition={{ delay: index * 0.05 + 0.3, duration: 1, ease: "easeOut" }}
          className="xp-bar-fill"
          style={{
            background: isMaxLevel
              ? "linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)"
              : undefined
          }}
        />
      </div>

      {/* XP Text */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/50">
          {t(`categories.${skill.category}`)}
        </span>
        <span className="text-emerald-400 font-mono">
          {skill.level * 1000} / 10000 XP
        </span>
      </div>

      {/* Skill Rank */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex gap-1">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? {
                opacity: i < skill.level ? 1 : 0.2,
                scale: 1
              } : {}}
              transition={{ delay: index * 0.05 + 0.5 + i * 0.05 }}
              className={cn(
                "w-2 h-2 rounded-full",
                i < skill.level
                  ? isMaxLevel
                    ? "bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.8)]"
                    : "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                  : "bg-white/10"
              )}
            />
          ))}
        </div>
        <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider">
          {skill.level >= 8 ? "Master" : skill.level >= 6 ? "Expert" : skill.level >= 4 ? "Skilled" : "Learning"}
        </span>
      </div>
    </motion.div>
  );
}

export function Skills({ locale }: { locale: string }) {
  const t = useTranslations("skills");
  const { theme } = useTheme();
  const isLight = theme === "light";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(cvData.skills.map((s) => s.category))];
  const filteredSkills = selectedCategory
    ? cvData.skills.filter((s) => s.category === selectedCategory)
    : cvData.skills;

  return (
    <section id="skills" className="relative py-20 md:py-32 bg-navy-900/50" ref={ref}>
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

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-all duration-300",
              selectedCategory === null
                ? "bg-primary text-white"
                : isLight
                  ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-2",
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : isLight
                    ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
              )}
            >
              <span>{categoryIcons[cat]}</span>
              {t(`categories.${cat}`)}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
