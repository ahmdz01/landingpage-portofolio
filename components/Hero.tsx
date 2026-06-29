"use client";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Linkedin } from "lucide-react";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 mx-auto mb-6 flex items-center justify-center text-4xl"
        >
          👋
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary font-medium mb-2 tracking-widest text-sm uppercase">
          Hello, I am
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Your Name
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl md:text-2xl text-muted-foreground mb-2">
          Full Stack Developer
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Saya membangun aplikasi web yang cepat, scalable, dan berfokus pada pengalaman pengguna yang menyenangkan.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-3 justify-center mb-12">
          <a href="#projects" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity">
            Lihat Projects
          </a>
          <a href="/cv.pdf" target="_blank" className="px-6 py-3 border border-border rounded-full font-medium hover:bg-accent transition-colors">
            Download CV
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex gap-4 justify-center text-muted-foreground">
          <a href="https://github.com/ahmdz01" target="_blank" className="hover:text-foreground transition-colors p-2 rounded-full hover:bg-accent">
            <GithubIcon />
          </a>
          <a href="https://linkedin.com/in/USERNAME_KAMU" target="_blank" className="hover:text-foreground transition-colors p-2 rounded-full hover:bg-accent">
            <Linkedin size={20} />
          </a>
          <a href="mailto:email@kamu.com" className="hover:text-foreground transition-colors p-2 rounded-full hover:bg-accent">
            <Mail size={20} />
          </a>
        </motion.div>
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 text-muted-foreground">
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}
