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

const socials = [
  {
    icon: Mail,
    label: "Email",
    value: "ahmadrafdy01@gmail.com",
    href: "mailto:ahmadrafdy01@gmail.com",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/ahmad-rafdy-ramadhan",
    href: "https://www.linkedin.com/in/ahmad-rafdy-ramadhan",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    const mailto = `mailto:ahmadrafdy01@gmail.com?subject=Pesan dari ${form.name}&body=${encodeURIComponent(`Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;

    window.open(mailto);

    setStatus("sent");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-24">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Contact</p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Mari ngobrol</h2>
        <p className="mx-auto max-w-xl text-muted-foreground">Punya project menarik atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya.</p>
      </motion.div>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-6">
          <p className="leading-relaxed text-muted-foreground">Saya terbuka untuk peluang freelance, kolaborasi project, maupun diskusi seputar teknologi. Response time biasanya kurang dari 24 jam.</p>

          <div className="space-y-4">
            {socials.map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all hover:border-primary/50 hover:bg-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-600 dark:text-green-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Available for work
          </div>
        </motion.div>

        {/* Right */}
        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Nama</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@email.com"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Pesan</label>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Halo, saya ingin berdiskusi tentang..."
              className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === "sending" ? (
              "Mengirim..."
            ) : status === "sent" ? (
              "Pesan terkirim! ✓"
            ) : (
              <>
                Kirim Pesan
                <Send size={16} />
              </>
            )}
          </button>
        </motion.form>
      </div>

      {/* Footer */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-24 border-t border-border pt-8 text-center text-sm text-muted-foreground">
        <p>Dibuat dengan Next.js, Tailwind CSS, dan Framer Motion.</p>
        <p className="mt-1">© 2026 · Ahmad Rafdy Ramadhan</p>
      </motion.div>
    </section>
  );
}
