"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/70 backdrop-blur-xl border-b border-border/40 shadow-sm" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <span className="text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">rafdy</span>
            <span className="text-primary">.</span>
            <span className="text-foreground">dev</span>
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex gap-8 text-sm font-medium">
            {navLinks.map((link, index) => (
              <motion.li key={link.href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
                <a href={link.href} className="group relative text-muted-foreground transition-colors duration-200 hover:text-foreground">
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </motion.li>
            ))}
          </ul>

          {mounted && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={toggleTheme}
              className="rounded-full border border-border p-2.5 transition-all duration-200 hover:border-primary/50 hover:bg-accent"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          )}
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-3 md:hidden">
          {mounted && (
            <button onClick={toggleTheme} className="rounded-full border border-border p-2 transition-all hover:bg-accent">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-full border border-border p-2 transition-all hover:bg-accent">
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: mobileOpen ? 1 : 0,
          height: mobileOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden border-t border-border/40 md:hidden"
      >
        <div className="space-y-3 px-6 py-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground">
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
