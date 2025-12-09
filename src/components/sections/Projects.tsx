"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { cvData } from "@/data/cv-data";
import { Users, Calendar, ChevronDown, Rocket, Target, Crown, Sparkles, Code2, Layers, CheckCircle2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

// Get difficulty based on team size
function getDifficulty(teamSize: number): { label: string; labelVi: string; color: string; bgColor: string; stars: number } {
  if (teamSize >= 12) return { label: "LEGENDARY", labelVi: "HUYỀN THOẠI", color: "from-yellow-400 to-orange-500", bgColor: "from-yellow-500/20 to-orange-500/20", stars: 5 };
  if (teamSize >= 8) return { label: "EPIC", labelVi: "SỬ THI", color: "from-purple-400 to-pink-500", bgColor: "from-purple-500/20 to-pink-500/20", stars: 4 };
  if (teamSize >= 6) return { label: "HARD", labelVi: "KHÓ", color: "from-blue-400 to-cyan-500", bgColor: "from-blue-500/20 to-cyan-500/20", stars: 3 };
  return { label: "NORMAL", labelVi: "BÌNH THƯỜNG", color: "from-green-400 to-emerald-500", bgColor: "from-green-500/20 to-emerald-500/20", stars: 2 };
}

// Check if project is current
function isCurrentProject(period: string): boolean {
  return period.toLowerCase().includes("present");
}

interface ProjectCardProps {
  project: (typeof cvData.projects)[0];
  index: number;
  isInView: boolean;
  locale: string;
  isLight: boolean;
}

function ProjectCard({ project, index, isInView, locale, isLight }: ProjectCardProps) {
  const t = useTranslations("projects");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const description =
    locale === "vi" ? project.description.vi : project.description.en;
  const role = locale === "vi" ? project.role.vi : project.role.en;
  const highlights =
    locale === "vi" ? project.highlights.vi : project.highlights.en;

  const difficulty = getDifficulty(project.teamSize);
  const isCurrent = isCurrentProject(project.period);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {/* Outer Glow */}
      <div className={cn(
        "absolute inset-0 rounded-3xl transition-all duration-500 blur-xl",
        isCurrent
          ? "bg-gradient-to-r from-yellow-500/40 to-orange-500/40"
          : `bg-gradient-to-r ${difficulty.bgColor}`,
        isHovered ? "opacity-100 scale-105" : "opacity-50"
      )} />

      <motion.div
        className={cn(
          "relative rounded-3xl overflow-hidden transition-all duration-500",
          isHovered ? "scale-[1.02]" : "scale-100"
        )}
        animate={isHovered ? { y: -10 } : { y: 0 }}
      >
        {/* Card Border Glow */}
        <div className={cn(
          "absolute inset-0 rounded-3xl p-[2px]",
          isCurrent
            ? "bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-400"
            : `bg-gradient-to-br ${difficulty.color}`
        )}>
          <div className="absolute inset-[2px] rounded-[22px] bg-slate-900/95 backdrop-blur-xl" />
        </div>

        {/* Card Content */}
        <div className="relative">
          {/* Header Banner */}
          <div className={cn(
            "px-6 py-4 flex items-center justify-between",
            `bg-gradient-to-r ${difficulty.color}`
          )}>
            <div className="flex items-center gap-3">
              {isCurrent ? (
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
                >
                  <Crown className="text-white" size={22} />
                </motion.div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <CheckCircle2 className="text-white" size={22} />
                </div>
              )}
              <div>
                <span className="text-white font-bold text-sm tracking-wider block">
                  {isCurrent
                    ? (locale === "vi" ? "DỰ ÁN HIỆN TẠI" : "ACTIVE PROJECT")
                    : (locale === "vi" ? "HOÀN THÀNH" : "COMPLETED")}
                </span>
                <span className="text-white/70 text-xs">{project.period}</span>
              </div>
            </div>

            {/* Difficulty Stars */}
            <div className="flex items-center gap-2">
              <span className="text-white/80 text-xs font-bold">
                {locale === "vi" ? difficulty.labelVi : difficulty.label}
              </span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.3 + i * 0.05 }}
                  >
                    <Star
                      size={16}
                      className={i < difficulty.stars ? "text-white" : "text-white/30"}
                      fill={i < difficulty.stars ? "white" : "transparent"}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 md:p-8">
            {/* Project Name & Role */}
            <div className="mb-6">
              <h3 className={cn(
                "text-2xl md:text-3xl font-bold mb-2",
                isCurrent ? "text-yellow-400" : "text-white"
              )}>
                {project.name}
              </h3>
              <p className={cn(
                "text-lg font-semibold flex items-center gap-2",
                isCurrent ? "text-orange-300" : "text-blue-400"
              )}>
                <Rocket size={18} />
                {role}
              </p>
            </div>

            {/* Description */}
            <p className={cn("text-base leading-relaxed mb-6", isLight ? "text-slate-700" : "text-white/70")} style={isLight ? { color: '#475569' } : {}}>
              {description}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border",
                isCurrent
                  ? "bg-yellow-500/10 border-yellow-500/30"
                  : "bg-blue-500/10 border-blue-500/30"
              )}>
                <Users size={20} className={isCurrent ? "text-yellow-400" : "text-blue-400"} />
                <div>
                  <div className={cn(
                    "text-xl font-bold",
                    isCurrent ? "text-yellow-400" : "text-blue-400"
                  )}>
                    {project.teamSize}
                  </div>
                  <div className="text-white/50 text-xs">{t("teamSize")}</div>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border",
                isCurrent
                  ? "bg-orange-500/10 border-orange-500/30"
                  : "bg-purple-500/10 border-purple-500/30"
              )}>
                <Calendar size={20} className={isCurrent ? "text-orange-400" : "text-purple-400"} />
                <div>
                  <div className={cn(
                    "text-sm font-bold font-mono",
                    isCurrent ? "text-orange-400" : "text-purple-400"
                  )}>
                    {project.period}
                  </div>
                  <div className="text-white/50 text-xs">{locale === "vi" ? "Thời gian" : "Duration"}</div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-white/50 text-sm mb-3">
                <Code2 size={16} />
                <span className="font-semibold uppercase tracking-wider">Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.5 + i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-semibold border cursor-default transition-all",
                      isCurrent
                        ? "bg-yellow-500/10 border-yellow-500/40 text-yellow-300 hover:bg-yellow-500/20"
                        : "bg-blue-500/10 border-blue-500/40 text-blue-300 hover:bg-blue-500/20"
                    )}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Highlights/Achievements */}
            <div className={cn(
              "rounded-2xl border overflow-hidden",
              isCurrent
                ? "bg-yellow-500/5 border-yellow-500/20"
                : "bg-white/5 border-white/10"
            )}>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <Sparkles size={18} className={isCurrent ? "text-yellow-400" : "text-emerald-400"} />
                  <span className={isCurrent ? "text-yellow-400" : "text-white"}>
                    {locale === "vi" ? "Thành tựu" : "Achievements"} ({highlights.length})
                  </span>
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-white/50" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{ height: isExpanded ? "auto" : 0 }}
                className="overflow-hidden"
              >
                <ul className="px-5 pb-5 space-y-3">
                  {highlights.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isExpanded ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isExpanded ? { scale: 1 } : {}}
                        transition={{ delay: i * 0.1 + 0.1, type: "spring" }}
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                          isCurrent
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-emerald-500/20 text-emerald-400"
                        )}
                      >
                        ✓
                      </motion.div>
                      <span className={cn(isLight ? "text-slate-700" : "text-white/80")}>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects({ locale }: { locale: string }) {
  const t = useTranslations("projects");
  const { theme } = useTheme();
  const isLight = theme === "light";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Count total missions and completed
  const totalProjects = cvData.projects.length;
  const activeProjects = cvData.projects.filter(p => isCurrentProject(p.period)).length;

  return (
    <section
      id="projects"
      className="relative py-24 md:py-40 overflow-hidden"
      ref={ref}
    >
      {/* Epic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15),transparent_70%)]" />
        {/* Animated diagonal lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 30px,
              rgba(168, 85, 247, 0.5) 30px,
              rgba(168, 85, 247, 0.5) 31px
            )`
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6"
          >
            <Layers className="text-purple-400" size={16} />
            <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase">
              {locale === "vi" ? "Dự án nổi bật" : "Featured Projects"}
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className={cn(
              "bg-clip-text text-transparent",
              isLight
                ? "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
                : "bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"
            )}>
              {t("title")}
            </span>
          </h2>
          <p className={cn("text-lg max-w-2xl mx-auto mb-10", isLight ? "text-slate-700" : "text-white/60")} style={isLight ? { color: '#475569' } : {}}>
            {t("subtitle")}
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                <Target className="text-white" size={28} />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-purple-400">{totalProjects}</div>
                <div className="text-purple-400/70 text-sm">{locale === "vi" ? "Tổng dự án" : "Total Projects"}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 shadow-[0_0_30px_rgba(251,191,36,0.2)]"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.5)]">
                <Rocket className="text-white" size={28} />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-yellow-400">{activeProjects}</div>
                <div className="text-yellow-400/70 text-sm">{locale === "vi" ? "Đang thực hiện" : "In Progress"}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {cvData.projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              isInView={isInView}
              locale={locale}
              isLight={isLight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
