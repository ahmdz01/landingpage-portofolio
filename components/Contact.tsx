"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const socials = [
  {
    icon: Mail,
    label: "Email",
    value: "ahmadrafdy01@gmail.com", // ganti dengan email kamu
    href: "mailto:ahmadrafdy01@gmail.com", // ganti dengan email kamu
  },
  {
    icon: <LinkedinIcon />,
    label: "LinkedIn",
    value: "linkedin.com/in/USERNAME_KAMU", // ganti username
    href: "https://linkedin.com/in/USERNAME_KAMU", // ganti username
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

    const mailto = `mailto:email@kamu.com?subject=Pesan dari ${form.name}&body=${encodeURIComponent(
      `Nama: ${form.name}
Email: ${form.email}

${form.message}`,
    )}`;

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
          <p className="leading-relaxed text-muted-foreground">Saya terbuka untuk peluang freelance, full-time maupun kolaborasi open source. Response time biasanya kurang dari 24 jam.</p>

          <div className="space-y-4">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all hover:border-primary/50 hover:bg-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">{social.icon}</div>
                <div>
                  <p className="text-xs text-muted-foreground">{social.label}</p>

                  <p className="text-sm font-medium">{social.value}</p>
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
              "Pesan terkirim!"
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
        <p className="mt-1">© 2026 · Your Name</p>
      </motion.div>
    </section>
  );
}
