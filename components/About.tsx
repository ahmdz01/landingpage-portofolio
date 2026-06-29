"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const skills = {
  Languages: ["TypeScript", "JavaScript", "Python", "Go"],
  Frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  Backend: ["Node.js", "Express", "PostgreSQL", "Prisma"],
  Tools: ["Git", "Docker", "Vercel", "Figma"],
};

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Nama Perusahaan",
    period: "2023 – Sekarang",
    desc: "Membangun dan maintain aplikasi web menggunakan React dan Node.js.",
  },
  {
    role: "Frontend Developer",
    company: "Perusahaan Sebelumnya",
    period: "2022 – 2023",
    desc: "Mengembangkan UI komponen dan integrasi REST API.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      {/* Section header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16 text-center">
        <p className="text-sm text-primary font-medium tracking-widest uppercase mb-2">About Me</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Sedikit tentang saya</h2>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">Saya seorang developer yang passionate dalam membangun produk digital yang berdampak. Suka belajar hal baru dan berkontribusi pada proyek open source.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Skills */}
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h3 className="text-lg font-semibold mb-6">Tech Stack</h3>
          <div className="space-y-5">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Download CV */}

          <a href="/cv.pdf" target="_blank" className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 border border-border rounded-full text-sm font-medium hover:bg-accent transition-colors">
            📄 Download CV
          </a>
        </motion.div>

        {/* Experience */}
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h3 className="text-lg font-semibold mb-6">Pengalaman</h3>
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative pl-5 border-l border-border">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary" />
                <p className="text-xs text-muted-foreground mb-1">{exp.period}</p>
                <p className="font-semibold">{exp.role}</p>
                <p className="text-sm text-primary mb-1">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
