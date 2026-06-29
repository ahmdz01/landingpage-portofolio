"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, MessageCircle } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const socials = [
  {
    icon: Mail,
    label: "Email",
    value: "ahmadrafdy01@gmail.com",
    href: "mailto:ahmadrafdy01@gmail.com",
    gradient: "from-red-500 to-orange-500",
    bg: "from-red-500/15 to-red-900/5 border-red-500/30 hover:border-red-400/60",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/ahmad-rafdy-ramadhan",
    href: "https://www.linkedin.com/in/ahmad-rafdy-ramadhan",
    gradient: "from-blue-500 to-cyan-500",
    bg: "from-blue-500/15 to-blue-900/5 border-blue-500/30 hover:border-blue-400/60",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/ahmdz01",
    href: "https://github.com/ahmdz01",
    gradient: "from-slate-400 to-slate-600",
    bg: "from-slate-500/15 to-slate-900/5 border-slate-500/30 hover:border-slate-400/60",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Nama tidak boleh kosong";
    else if (form.name.trim().length < 3) newErrors.name = "Nama minimal 3 karakter";
    if (!form.email.trim()) newErrors.email = "Email tidak boleh kosong";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Email tidak valid";
    if (!form.message.trim()) newErrors.message = "Pesan tidak boleh kosong";
    else if (form.message.trim().length < 10) newErrors.message = "Pesan minimal 10 karakter";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [errors],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("sending");
    try {
      const mailto = `mailto:ahmadrafdy01@gmail.com?subject=Pesan dari ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
      window.open(mailto);
      setStatus("sent");
      setTimeout(() => {
        setForm({ name: "", email: "", message: "" });
        setStatus("idle");
      }, 2000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-32">
      {/* Background */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-violet-600/8 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-600/8 blur-[120px]" />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-20 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
          <MessageCircle size={14} />
          Let's Connect
        </div>
        <h2 className="section-title mb-6 text-white">
          Get In <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent animate-gradient">Touch</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/50">Have a project in mind or just want to chat? I'd love to hear from you. Drop me a message and I'll get back to you within 24 hours.</p>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-8">
          <div>
            <h3 className="mb-3 text-2xl font-bold text-white flex items-center gap-3">
              <span className="h-8 w-1 rounded-full bg-gradient-to-b from-violet-400 to-blue-400" />
              Let's work together
            </h3>
            <p className="text-white/50 leading-relaxed">I'm always interested in hearing about new projects and opportunities. Whether you have a project that needs coding or just want to connect, feel free to reach out!</p>
          </div>

          <div className="space-y-3">
            {socials.map(({ icon: Icon, label, value, href, gradient, bg }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex items-center gap-4 rounded-2xl border bg-gradient-to-br p-4 transition-all duration-300 ${bg} backdrop-blur-sm hover:shadow-lg`}
              >
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40">{label}</p>
                  <p className="truncate text-sm font-semibold text-white/80">{value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="inline-flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-3 backdrop-blur-sm"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-semibold text-green-400">Available for work</span>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70 block">
                  Nama <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 ${
                    errors.name ? "border-red-500/50 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-white/10 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
                  }`}
                />
                {errors.name && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400">
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70 block">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 ${
                    errors.email ? "border-red-500/50 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-white/10 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
                  }`}
                />
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400">
                    {errors.email}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/70 block">
                Pesan <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                className={`w-full resize-none rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 ${
                  errors.message ? "border-red-500/50 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-white/10 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
                }`}
              />
              {errors.message && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400">
                  {errors.message}
                </motion.p>
              )}
              <p className="text-xs text-white/30">{form.message.length}/100 karakter (minimal 10)</p>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
              whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold transition-all duration-300 ${
                status === "sent"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : status === "error"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 disabled:opacity-50"
              }`}
            >
              {status === "sending" ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="h-4 w-4 rounded-full border-2 border-current border-t-transparent" />
                  <span>Mengirim...</span>
                </>
              ) : status === "sent" ? (
                <>
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
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
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-24 border-t border-white/10 pt-12 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/40">Dibuat dengan ❤️ menggunakan Next.js, Tailwind CSS & Framer Motion</div>
        <p className="text-sm text-white/30">© 2026 · Ahmad Rafdy Ramadhan · All rights reserved</p>
      </motion.div>
    </section>
  );
}
