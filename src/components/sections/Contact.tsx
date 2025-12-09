"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cvData } from "@/data/cv-data";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export function Contact({ locale }: { locale: string }) {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const { theme } = useTheme();
  const isLight = theme === "light";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: cvData.personal.github || "https://github.com/Thap1",
      color: "hover:text-white",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: cvData.personal.linkedin || "#",
      color: "hover:text-blue-400",
    },
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${cvData.personal.email || "contact@example.com"}`,
      color: "hover:text-red-400",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-navy-900/50"
      ref={ref}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />

      <div className="section-container relative">
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

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-card p-8 md:p-12 max-w-2xl mx-auto text-center"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent p-1 mx-auto mb-6"
          >
            <div className="w-full h-full rounded-full bg-navy-900 flex items-center justify-center text-3xl">
              👨‍💻
            </div>
          </motion.div>

          {/* Name */}
          <h3 className="text-2xl font-bold mb-2">
            {locale === "vi"
              ? cvData.personal.name.vi
              : cvData.personal.name.en}
          </h3>
          <p className="text-primary mb-6">
            {locale === "vi"
              ? cvData.personal.title.vi
              : cvData.personal.title.en}
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.2, y: -5 }}
                className={cn(
                  "p-4 rounded-xl transition-all duration-300 hover:glow",
                  isLight
                    ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    : "bg-white/5 text-white/60 hover:bg-white/10",
                  link.color
                )}
              >
                <link.icon size={24} />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href={`mailto:${cvData.personal.email || "contact@example.com"}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all duration-300"
          >
            <Send size={20} />
            {t("cta")}
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className={cn("mt-16 text-center text-sm", isLight ? "text-slate-500" : "text-white/40")}
        >
          <p>
            {tFooter("madeWith")} ❤️ {tFooter("by")}{" "}
            <span className="text-primary">
              {locale === "vi"
                ? cvData.personal.name.vi
                : cvData.personal.name.en}
            </span>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} All rights reserved.</p>
        </motion.footer>
      </div>
    </section>
  );
}
