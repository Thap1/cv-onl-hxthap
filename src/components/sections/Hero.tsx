"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { cvData } from "@/data/cv-data";

const FloatingAvatar = dynamic(
  () => import("@/components/3d/FloatingAvatar").then((mod) => mod.FloatingAvatar),
  { ssr: false }
);

const ParticleBackground = dynamic(
  () => import("@/components/3d/ParticleBackground").then((mod) => mod.ParticleBackground),
  { ssr: false }
);

interface StatCardProps {
  value: number | string;
  label: string;
  delay: number;
}

function StatCard({ value, label, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card px-6 py-4 text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-gradient">{value}+</div>
      <div className="text-sm text-white/60 mt-1">{label}</div>
    </motion.div>
  );
}

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations("hero");
  const name = locale === "vi" ? cvData.personal.name.vi : cvData.personal.name.en;
  const title = locale === "vi" ? cvData.personal.title.vi : cvData.personal.title.en;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-pattern" />
      <ParticleBackground />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse animate-delay-500" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary text-lg mb-4"
            >
              {t("greeting")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="heading-1 mb-4"
            >
              <span className="text-gradient">{name}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/70 mb-8"
            >
              {title}
            </motion.h2>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <StatCard
                value={cvData.stats.yearsOfExperience}
                label={t("yearsExp")}
                delay={0.3}
              />
              <StatCard
                value={cvData.stats.projectsCompleted}
                label={t("projects")}
                delay={0.4}
              />
              <StatCard
                value={cvData.stats.companiesWorked}
                label={t("companies")}
                delay={0.5}
              />
            </div>
          </div>

          {/* 3D Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <FloatingAvatar />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-sm">{t("scrollDown")}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
