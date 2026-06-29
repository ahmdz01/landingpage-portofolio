"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const skills = {
  "Front-End": ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
  "Back-End & Database": ["Node.js", "PHP", "Laravel", "MySQL"],
  Tools: ["Git", "Figma", "Taiga", "VS Code", "Laragon"],
};

const experiences = [
  {
    role: "Bachelor of Informatics",
    company: "Universitas AMIKOM Yogyakarta",
    period: "2023 – Present",
    desc: "Currently pursuing a Bachelor's degree in Informatics while building real-world web applications such as complaint management systems, digital marketplaces, company profile websites, and POS systems.",
  },
  {
    role: "Software Engineering Student",
    company: "SMK Muhammadiyah 1 Yogyakarta",
    period: "2020 – 2023",
    desc: "Started learning programming and developed a strong passion for software engineering and web development.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

export default function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-24">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
        <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">About Me</p>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">A Little About Me</h2>

        <p className="max-w-2xl mx-auto leading-relaxed text-muted-foreground">
          Hi! I'm <strong>Ahmad Rafdy Ramadhan</strong>, a passionate Full Stack Web Developer from Yogyakarta. I enjoy building modern web applications, from crafting intuitive user interfaces to developing scalable backend systems. I
          believe great software is not only cleanly written but also solves real problems for real people.
        </p>
      </motion.div>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Tech Stack */}
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h3 className="text-lg font-semibold mb-6">Tech Stack</h3>

          <div className="space-y-5">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{category}</p>

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

          <Link href="/cv.pdf" target="_blank" className="inline-flex items-center gap-2 mt-8 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent">
            📄 Download CV
          </Link>
        </motion.div>

        {/* Education & Experience */}
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h3 className="text-lg font-semibold mb-6">Education & Experience</h3>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div key={index} custom={index} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative border-l border-border pl-5">
                <div className="absolute top-1.5 -left-1.5 h-3 w-3 rounded-full bg-primary" />

                <p className="text-xs text-muted-foreground mb-1">{exp.period}</p>

                <h4 className="font-semibold">{exp.role}</h4>

                <p className="text-sm text-primary mb-2">{exp.company}</p>

                <p className="text-sm leading-relaxed text-muted-foreground">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
