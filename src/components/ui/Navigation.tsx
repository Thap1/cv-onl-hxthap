"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggleSmall } from "./ThemeToggleSmall";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#experience", key: "experience" },
  { href: "#projects", key: "projects" },
  { href: "#education", key: "education" },
  { href: "#contact", key: "contact" },
];

export function Navigation() {
  const t = useTranslations("nav");
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? isLight
              ? "bg-white/90 backdrop-blur-lg border-b border-blue-200/50"
              : "bg-background/80 backdrop-blur-lg border-b border-white/10"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-xl font-bold font-display text-gradient"
              whileHover={{ scale: 1.05 }}
            >
              HXT
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "text-sm transition-colors relative group",
                    isLight
                      ? "text-slate-600 hover:text-slate-900"
                      : "text-white/70 hover:text-white"
                  )}
                  whileHover={{ y: -2 }}
                >
                  {t(item.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              <div className="flex items-center gap-3">
                <ThemeToggleSmall />
                <LanguageToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-3">
              <ThemeToggleSmall />
              <LanguageToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "p-2 transition-colors",
                  isLight
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-white/70 hover:text-white"
                )}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "fixed inset-0 z-40 backdrop-blur-lg pt-20 md:hidden",
              isLight ? "bg-white/95" : "bg-background/95"
            )}
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-xl transition-colors",
                    isLight
                      ? "text-slate-600 hover:text-slate-900"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {t(item.key)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
