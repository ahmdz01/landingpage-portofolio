"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, GraduationCap, Zap } from "lucide-react";

const skills = {
  "Front-End": ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Next.js"],
  "Back-End & Database": ["Node.js", "PHP", "Laravel", "MySQL", "PostgreSQL"],
  Tools: ["Git", "Figma", "VS Code", "Laragon", "Taiga"],
};

const skillColors: Record<string, string> = {
  "Front-End": "from-blue-500 to-cyan-500",
  "Back-End & Database": "from-green-500 to-emerald-500",
  Tools: "from-orange-500 to-amber-500",
};

const experiences = [
  {
    role: "Bachelor of Informatics",
    company: "Universitas AMIKOM Yogyakarta",
    period: "2023 – Present",
    desc: "Pursuing a Bachelor's degree in Informatics while building real-world applications including complaint management systems, digital marketplaces, and POS systems.",
    icon: GraduationCap,
    color: "from-violet-500/20 to-violet-500/5 border-violet-500/30",
    iconColor: "text-violet-400",
  },
  {
    role: "Software Engineering Student",
    company: "SMK Muhammadiyah 1 Yogyakarta",
    period: "2020 – 2023",
    desc: "Developed strong foundation in programming and software engineering principles, with a passion for web development.",
    icon: Code2,
    color: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
    iconColor: "text-blue-400",
  },
];

const stats = [
  { value: "3+", label: "Years Learning" },
  { value: "10+", label: "Projects Built" },
  { value: "5+", label: "Tech Stacks" },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-32">
      {/* Background */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-violet-600/8 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-600/8 blur-[120px]" />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-20 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
          <Zap size={14} />
          Know Me
        </div>
        <h2 className="section-title mb-6 text-white">
          About <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent animate-gradient">Me</span>
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/50">
          I'm a passionate full-stack web developer from Yogyakarta with expertise in building modern, scalable applications. I combine technical excellence with creative problem-solving to deliver solutions that make a real impact.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-20 grid grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
          >
            <div className="mb-1 text-3xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">{stat.value}</div>
            <div className="text-sm text-white/50">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-16 lg:grid-cols-2">
        {/* Tech Stack */}
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="h-8 w-1 rounded-full bg-gradient-to-b from-violet-400 to-blue-400" />
            Tech Stack
          </h3>

          <div className="space-y-6">
            {Object.entries(skills).map(([category, items], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 + 0.2, duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className={`h-1.5 w-6 rounded-full bg-gradient-to-r ${skillColors[category]}`} />
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60">{category}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 + 0.3, duration: 0.3 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="cursor-default rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-medium text-white/80 transition-all duration-200 hover:border-violet-500/50 hover:bg-violet-500/20 hover:text-violet-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/40"
          >
            <span>Download CV</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Education */}
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="h-8 w-1 rounded-full bg-gradient-to-b from-violet-400 to-blue-400" />
            Education & Experience
          </h3>

          <div className="relative space-y-4 pl-6">
            {/* Timeline line */}
            <div className="absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b from-violet-500/60 via-blue-500/40 to-transparent" />

            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ x: 4 }}
                  className={`relative rounded-2xl border bg-gradient-to-br p-6 transition-all duration-300 ${exp.color} backdrop-blur-sm hover:shadow-xl`}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[30px] top-6 h-3 w-3 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 glow-sm ring-4 ring-background" />

                  <div className="mb-3 flex items-start gap-3">
                    <div className="rounded-xl bg-white/10 p-2.5">
                      <Icon size={18} className={exp.iconColor} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-1">{exp.period}</p>
                      <h4 className="text-base font-bold text-white">{exp.role}</h4>
                      <p className="text-sm text-white/50">{exp.company}</p>
                    </div>
                  </div>
                  <p className="pl-12 text-sm leading-relaxed text-white/50">{exp.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
