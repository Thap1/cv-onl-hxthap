"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { cvData } from "@/data/cv-data";
import { Briefcase, Trophy, Star, Zap, Calendar, TrendingUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";

// Calculate months between dates
function getMonthsDiff(start: string, end: string | null): number {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
}

// Calculate years
function getYears(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${remainingMonths} tháng`;
  if (remainingMonths === 0) return `${years} năm`;
  return `${years} năm ${remainingMonths} tháng`;
}

export function Experience({ locale }: { locale: string }) {
  const t = useTranslations("experience");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return locale === "vi" ? "Hiện tại" : "Present";
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Calculate total months worked
  const getTotalMonths = () => {
    return cvData.experience.reduce((acc, exp) => {
      return acc + getMonthsDiff(exp.startDate, exp.endDate);
    }, 0);
  };

  const totalMonths = getTotalMonths();
  const totalYears = Math.floor(totalMonths / 12);

  return (
    <section id="experience" className="relative py-24 md:py-40 overflow-hidden" ref={ref}>
      {/* Epic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="section-container relative z-10">
        {/* Epic Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* Section Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6"
          >
            <Briefcase className="text-blue-400" size={16} />
            <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">
              {locale === "vi" ? "Hành trình sự nghiệp" : "Career Journey"}
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            {t("subtitle")}
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 shadow-[0_0_30px_rgba(251,191,36,0.2)]"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.5)]">
                <Trophy className="text-white" size={28} />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-yellow-400">{totalYears}+</div>
                <div className="text-yellow-400/70 text-sm">{locale === "vi" ? "Năm kinh nghiệm" : "Years Experience"}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                <TrendingUp className="text-white" size={28} />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-emerald-400">{cvData.experience.length}</div>
                <div className="text-emerald-400/70 text-sm">{locale === "vi" ? "Công ty" : "Companies"}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Experience Cards - Full Width */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {cvData.experience.map((exp, index) => {
            const months = getMonthsDiff(exp.startDate, exp.endDate);
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative"
              >
                {/* Connection Line */}
                {index < cvData.experience.length - 1 && (
                  <div className="absolute left-10 top-full w-1 h-8 bg-gradient-to-b from-blue-500 to-transparent hidden md:block" />
                )}

                <motion.div
                  className={cn(
                    "relative rounded-3xl overflow-hidden transition-all duration-500",
                    isHovered ? "scale-[1.02]" : "scale-100"
                  )}
                  animate={isHovered ? { y: -8 } : { y: 0 }}
                >
                  {/* Card Glow Effect */}
                  <div className={cn(
                    "absolute inset-0 rounded-3xl transition-opacity duration-500",
                    exp.isCurrent
                      ? "bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-yellow-500/30 shadow-[0_0_60px_rgba(251,191,36,0.3)]"
                      : "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.2)]",
                    isHovered ? "opacity-100" : "opacity-60"
                  )} />

                  {/* Card Content */}
                  <div className={cn(
                    "relative backdrop-blur-xl border-2 rounded-3xl p-8 md:p-10",
                    exp.isCurrent
                      ? "border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-orange-500/10"
                      : "border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
                  )}>
                    {/* Top Row - Badge & Date */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <motion.div
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm",
                          exp.isCurrent
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                            : "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-300 border border-blue-500/50"
                        )}
                        animate={exp.isCurrent ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {exp.isCurrent ? (
                          <>
                            <Zap size={16} />
                            {locale === "vi" ? "ĐANG LÀM VIỆC" : "CURRENTLY WORKING"}
                          </>
                        ) : (
                          <>
                            <Award size={16} />
                            {locale === "vi" ? "ĐÃ HOÀN THÀNH" : "COMPLETED"}
                          </>
                        )}
                      </motion.div>

                      <div className="flex items-center gap-2 text-white/60">
                        <Calendar size={16} />
                        <span className="font-mono">
                          {formatDate(exp.startDate)} → {formatDate(exp.endDate)}
                        </span>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold",
                          exp.isCurrent ? "bg-yellow-500/20 text-yellow-400" : "bg-blue-500/20 text-blue-400"
                        )}>
                          {getYears(months)}
                        </span>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {/* Company Icon */}
                      <motion.div
                        className={cn(
                          "w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0",
                          exp.isCurrent
                            ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_30px_rgba(251,191,36,0.5)]"
                            : "bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                        )}
                        animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {exp.isCurrent ? (
                          <Star className="text-white" size={36} fill="white" />
                        ) : (
                          <Briefcase className="text-white" size={36} />
                        )}
                      </motion.div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <h3 className={cn(
                          "text-2xl md:text-3xl font-bold mb-2",
                          exp.isCurrent ? "text-yellow-400" : "text-white"
                        )}>
                          {exp.company}
                        </h3>
                        <p className={cn(
                          "text-xl font-semibold mb-4",
                          exp.isCurrent ? "text-orange-300" : "text-blue-400"
                        )}>
                          {locale === "vi" ? exp.role.vi : exp.role.en}
                        </p>
                        <p className="text-white/70 text-lg leading-relaxed">
                          {locale === "vi" ? exp.description.vi : exp.description.en}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-white/50 flex items-center gap-2">
                          <TrendingUp size={14} />
                          {locale === "vi" ? "Tiến độ sự nghiệp" : "Career Progress"}
                        </span>
                        <span className={cn(
                          "font-mono font-bold text-lg",
                          exp.isCurrent ? "text-yellow-400" : "text-emerald-400"
                        )}>
                          +{months} {locale === "vi" ? "tháng" : "months"}
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: "100%" } : { width: 0 }}
                          transition={{ delay: index * 0.2 + 0.5, duration: 1.5, ease: "easeOut" }}
                          className={cn(
                            "h-full rounded-full",
                            exp.isCurrent
                              ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400"
                              : "bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400"
                          )}
                          style={{
                            boxShadow: exp.isCurrent
                              ? "0 0 20px rgba(251, 191, 36, 0.6)"
                              : "0 0 20px rgba(59, 130, 246, 0.6)"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
