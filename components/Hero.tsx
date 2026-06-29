"use client";

import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Mail } from "lucide-react";

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
      {/* Background */}
      <div className="absolute left-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="relative z-10 max-w-4xl">
        {/* Avatar */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-lg" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/5 text-5xl font-bold backdrop-blur-sm">👋</div>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.p variants={itemVariants} className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Welcome to my portfolio
        </motion.p>

        {/* Title */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-6xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
            <span className="block">Ahmad</span>
            <span className="block text-foreground/60">Rafdy</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="mb-4 text-2xl font-medium text-muted-foreground md:text-3xl">Full Stack Web Developer</p>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">Crafting modern, intuitive web applications with clean code and exceptional user experiences. Based in Yogyakarta, Indonesia.</p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all duration-200 hover:scale-105 hover:opacity-90 active:scale-95"
          >
            View My Work
            <ExternalLink size={18} className="transition-transform group-hover:translate-x-0.5" />
          </a>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 border-foreground/20 px-8 py-4 font-semibold transition-all duration-200 hover:border-foreground/40 hover:bg-accent"
          >
            Download CV
          </a>
        </motion.div>

        {/* Social */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4">
          <a
            href="https://github.com/ahmdz01"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border p-3 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
          >
            <GithubIcon />
          </a>

          <a
            href="https://www.linkedin.com/in/ahmad-rafdy-ramadhan"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border p-3 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
          >
            <LinkedinIcon />
          </a>

          <a href="mailto:ahmadrafdy01@gmail.com" className="rounded-full border border-border p-3 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 hover:text-foreground">
            <Mail size={20} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
        className="absolute bottom-12 text-muted-foreground/50"
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  );
}
