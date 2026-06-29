"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const skills = {
  "Front-End": ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Next.js"],
  "Back-End & Database": ["Node.js", "PHP", "Laravel", "MySQL", "PostgreSQL"],
  Tools: ["Git", "Figma", "VS Code", "Laragon", "Taiga"],
};

const experiences = [
  {
    role: "Bachelor of Informatics",
    company: "Universitas AMIKOM Yogyakarta",
    period: "2023 – Present",
    desc: "Pursuing a Bachelor's degree in Informatics while building real-world applications including complaint management systems, digital marketplaces, and POS systems.",
  },
  {
    role: "Software Engineering Student",
    company: "SMK Muhammadiyah 1 Yogyakarta",
    period: "2020 – 2023",
    desc: "Developed strong foundation in programming and software engineering principles, with a passion for web development.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
    },
  }),
};

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-32">
      {/* Background */}
      <div className="absolute -top-40 right-0 -z-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Know Me</p>

        <h2 className="section-title mb-6">About Me</h2>

        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
          I'm a passionate full-stack web developer from Yogyakarta with expertise in building modern, scalable applications. I combine technical excellence with creative problem-solving to deliver solutions that make a real impact.
        </p>
      </motion.div>

      <div className="grid gap-16 lg:grid-cols-2">
        {/* Tech Stack */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
          <div>
            <h3 className="mb-8 text-2xl font-bold">Tech Stack</h3>

            <div className="space-y-6">
              {Object.entries(skills).map(([category, items]) => (
                <motion.div key={category} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">{category}</p>

                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge key={skill} variant="secondary" className="cursor-default px-3 py-1.5 text-sm font-medium transition-colors duration-200 hover:bg-primary hover:text-primary-foreground">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Link
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            <span>Download CV</span>

            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Education & Experience */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
          <h3 className="text-2xl font-bold">Education & Experience</h3>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div key={exp.role} custom={index} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="group relative">
                {/* Timeline */}
                <div className="absolute -left-8 top-2 h-4 w-4 rounded-full border-4 border-background bg-primary transition-transform duration-200 group-hover:scale-125" />

                <div className="absolute -bottom-2 -left-3.5 top-8 w-0.5 bg-border last:hidden" />

                <div className="py-2 pl-8">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">{exp.period}</p>

                  <h4 className="mb-1 text-lg font-bold">{exp.role}</h4>

                  <p className="mb-2 text-sm font-medium text-muted-foreground">{exp.company}</p>

                  <p className="text-sm leading-relaxed text-muted-foreground">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
