"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowDown, ExternalLink, Mail, Sparkles } from "lucide-react";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const titles = ["Full Stack Developer", "UI/UX Enthusiast", "React & Next.js Dev", "Laravel Developer"];

function TypingText() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIndex]);

  return (
    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
      {displayed}
      <span className="animate-blink text-violet-400">|</span>
    </span>
  );
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Main orbs */}
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px] animate-float" style={{ animationDelay: "4s" }} />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.07_0.02_265)_80%)]" />
    </div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
      <FloatingOrbs />

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="relative z-10 max-w-4xl">
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 backdrop-blur-sm">
            <Sparkles size={14} className="text-violet-400" />
            <span>Welcome to my portfolio</span>
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Avatar + Name */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 scale-150 rounded-full bg-gradient-to-br from-violet-500/40 to-blue-500/40 blur-2xl animate-pulse-glow" />
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-violet-500/40 bg-gradient-to-br from-violet-900/60 to-blue-900/60 text-5xl backdrop-blur-sm">👋</div>
            {/* Ring decoration */}
            <div className="absolute inset-0 scale-125 rounded-full border-2 border-violet-500/20 animate-rotate-slow" style={{ borderTopColor: "oklch(0.72 0.19 265 / 60%)" }} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="text-6xl font-black leading-tight tracking-tight md:text-7xl lg:text-8xl">
            <span className="block text-white">Ahmad Rafdy</span>
            <span className="block bg-gradient-to-r from-violet-400 via-purple-300 to-blue-400 bg-clip-text text-transparent animate-gradient">Ramadhan</span>
          </h1>
        </motion.div>

        {/* Typing */}
        <motion.div variants={itemVariants} className="mb-6 text-2xl font-semibold md:text-3xl">
          <TypingText />
        </motion.div>

        {/* Description */}
        <motion.p variants={itemVariants} className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
          Crafting modern, intuitive web applications with clean code and exceptional user experiences. Based in <span className="font-medium text-violet-400">Yogyakarta, Indonesia</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/40 active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-400 to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">View My Work</span>
            <ExternalLink size={18} className="relative transition-transform group-hover:translate-x-0.5" />
          </a>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-violet-500/50 hover:bg-violet-500/10 hover:scale-105 active:scale-95"
          >
            Download CV
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div variants={itemVariants} className="flex justify-center gap-3">
          {[
            { href: "https://github.com/ahmdz01", icon: <GithubIcon />, label: "GitHub" },
            {
              href: "https://www.linkedin.com/in/ahmad-rafdy-ramadhan",
              icon: <LinkedinIcon />,
              label: "LinkedIn",
            },
            { href: "mailto:ahmadrafdy01@gmail.com", icon: <Mail size={20} />, label: "Email" },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/60 backdrop-blur-sm transition-all duration-200 hover:border-violet-500/50 hover:bg-violet-500/15 hover:text-violet-300"
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
}
