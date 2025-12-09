"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cvData } from "@/data/cv-data";

export function About({ locale }: { locale: string }) {
  const t = useTranslations("about");
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
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 md:p-12 max-w-4xl mx-auto"
        >
          <p className="text-lg md:text-xl leading-relaxed text-white/80">
            {about}
          </p>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 border-t border-white/10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">📍</div>
              <div className="text-white/60 text-sm">Vietnam</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">🎂</div>
              <div className="text-white/60 text-sm">1996</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">💼</div>
              <div className="text-white/60 text-sm">Lead Developer</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">🏦</div>
              <div className="text-white/60 text-sm">FinTech Expert</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
