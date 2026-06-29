"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["about", "projects", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-white/10 bg-black/40 shadow-lg shadow-black/20 backdrop-blur-2xl" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.a href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="group relative text-xl font-black tracking-tight">
          <span className="animate-gradient bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">ahmdz</span>
          <span className="text-violet-400">.</span>
          <span className="text-white/90">dev</span>
          {/* Underline glow */}
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 transition-all duration-300 group-hover:w-full" />
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex gap-2 text-sm font-medium">
            {navLinks.map((link, index) => (
              <motion.li key={link.href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.07 }}>
                <a href={link.href} className={`relative rounded-full px-4 py-2 transition-all duration-300 ${activeSection === link.href.slice(1) ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
                  {link.label}
                  {activeSection === link.href.slice(1) && <motion.span layoutId="activeNav" className="absolute inset-0 -z-10 rounded-full bg-white/10" />}
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 active:scale-95"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-full border border-white/20 p-2.5 text-white/70 transition-all hover:bg-white/10 md:hidden">
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-black/60 backdrop-blur-2xl md:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white">
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-3 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white">
                Share Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
