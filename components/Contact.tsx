"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socials = [
  {
    icon: Mail,
    label: "Email",
    value: "ahmadrafdy01@gmail.com",
    href: "mailto:ahmadrafdy01@gmail.com",
    color: "from-red-500/10 to-red-500/5 border-red-500/30 hover:border-red-500/50",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/ahmad-rafdy-ramadhan",
    href: "https://www.linkedin.com/in/ahmad-rafdy-ramadhan",
    color: "from-blue-500/10 to-blue-500/5 border-blue-500/30 hover:border-blue-500/50",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/ahmdz01",
    href: "https://github.com/ahmdz01",
    color: "from-slate-500/10 to-slate-500/5 border-slate-500/30 hover:border-slate-500/50",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Nama tidak boleh kosong";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Nama minimal 3 karakter";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email tidak boleh kosong";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email tidak valid";
    }

    if (!form.message.trim()) {
      newErrors.message = "Pesan tidak boleh kosong";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Pesan minimal 10 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Clear error for this field
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("sending");

    try {
      const mailto = `mailto:ahmadrafdy01@gmail.com?subject=Pesan dari ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;

      window.open(mailto);

      setStatus("sent");

      setTimeout(() => {
        setForm({
          name: "",
          email: "",
          message: "",
        });
        setStatus("idle");
      }, 2000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-32 relative">
      {/* Background gradient */}
      <div className="absolute -top-40 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Let's Connect</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Get In Touch</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">Have a project in mind or just want to chat? I'd love to hear from you. Drop me a message and I'll get back to you within 24 hours.</p>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Info */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-8">
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-3">Let's work together</h3>
            <p className="text-muted-foreground leading-relaxed">I'm always interested in hearing about new projects and opportunities. Whether you have a project that needs coding or just want to connect, feel free to reach out!</p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            {socials.map(({ icon: Icon, label, value, href, color }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 bg-gradient-to-br ${color}`}
              >
                <div className="p-3 rounded-lg bg-background/40 group-hover:bg-background/60 transition-all duration-200">
                  <Icon size={20} className="transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Status badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-green-500/30 bg-gradient-to-r from-green-500/10 to-green-500/5 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">Available for work</span>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl border border-border bg-gradient-to-br from-background via-background to-foreground/[0.02] backdrop-blur"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold block">
                  Nama <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-lg border bg-background outline-none transition-all duration-200 text-sm ${
                    errors.name ? "border-red-500/50 focus:ring-red-500/20 focus:border-red-500" : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {errors.name && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 font-medium">
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold block">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-lg border bg-background outline-none transition-all duration-200 text-sm ${
                    errors.email ? "border-red-500/50 focus:ring-red-500/20 focus:border-red-500" : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 font-medium">
                    {errors.email}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold block">
                Pesan <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border bg-background outline-none transition-all duration-200 text-sm resize-none ${
                  errors.message ? "border-red-500/50 focus:ring-red-500/20 focus:border-red-500" : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                }`}
              />
              {errors.message && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 font-medium">
                  {errors.message}
                </motion.p>
              )}
              <p className="text-xs text-muted-foreground">{form.message.length}/100 karakter (minimal 10)</p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
              whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold transition-all duration-200 text-center ${
                status === "sent"
                  ? "bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30"
                  : status === "error"
                    ? "bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/30"
                    : "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 border border-primary/20"
              }`}
            >
              {status === "sending" ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  <span>Mengirim...</span>
                </>
              ) : status === "sent" ? (
                <>
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                    ✓
                  </motion.span>
                  <span>Pesan terkirim! Terima kasih</span>
                </>
              ) : status === "error" ? (
                <>
                  <span>✕</span>
                  <span>Gagal mengirim pesan</span>
                </>
              ) : (
                <>
                  <span>Kirim Pesan</span>
                  <Send size={18} />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-24 pt-12 border-t border-border text-center text-sm text-muted-foreground">
        <p className="font-medium mb-2">Dibuat dengan ❤️ menggunakan Next.js, Tailwind CSS, dan Framer Motion</p>
        <p>© 2026 · Ahmad Rafdy Ramadhan · All rights reserved</p>
      </motion.div>
    </section>
  );
}
