"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Repo } from "@/lib/github";
import { Code2, ExternalLink, GitFork, Star, Layers } from "lucide-react";

const languageColors: Record<string, string> = {
  TypeScript: "from-blue-500/20 to-blue-900/10 border-blue-500/30",
  JavaScript: "from-yellow-500/20 to-yellow-900/10 border-yellow-500/30",
  Python: "from-green-500/20 to-green-900/10 border-green-500/30",
  Go: "from-cyan-500/20 to-cyan-900/10 border-cyan-500/30",
  Rust: "from-orange-600/20 to-orange-900/10 border-orange-600/30",
  Java: "from-red-500/20 to-red-900/10 border-red-500/30",
  "C++": "from-pink-500/20 to-pink-900/10 border-pink-500/30",
  CSS: "from-purple-500/20 to-purple-900/10 border-purple-500/30",
  HTML: "from-orange-400/20 to-orange-900/10 border-orange-400/30",
  PHP: "from-indigo-500/20 to-indigo-900/10 border-indigo-500/30",
  default: "from-violet-500/15 to-violet-900/10 border-violet-500/25",
};

const languageDots: Record<string, string> = {
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-400",
  Go: "bg-cyan-400",
  Rust: "bg-orange-500",
  Java: "bg-red-400",
  "C++": "bg-pink-400",
  CSS: "bg-purple-400",
  HTML: "bg-orange-400",
  PHP: "bg-indigo-400",
  default: "bg-violet-400",
};

const GithubIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Props {
  repos: Repo[];
}

export default function ProjectsClient({ repos }: Props) {
  const [filter, setFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const languages = useMemo(() => ["All", ...new Set(repos.map((r) => r.language).filter(Boolean) as string[])], [repos]);

  const filteredRepos = useMemo(() => (filter === "All" ? repos : repos.filter((r) => r.language === filter)), [repos, filter]);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-32">
      {/* Background */}
      <div className="absolute top-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/8 blur-[120px]" />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
          <Layers size={14} />
          Portfolio
        </div>
        <h2 className="section-title mb-6 text-white">
          Featured <span className="animate-gradient bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/50">A selection of my recent projects and contributions. All repositories are synced directly from GitHub.</p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-12 flex flex-wrap justify-center gap-2">
        {languages.map((lang, index) => (
          <motion.button
            key={lang}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(lang)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              filter === lang
                ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/25"
                : "border border-white/10 bg-white/5 text-white/60 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300"
            }`}
          >
            {lang}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mb-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo, i) => {
              const colorClass = languageColors[repo.language || "default"] || languageColors.default;
              const dotColor = languageDots[repo.language || "default"] || languageDots.default;
              const isHovered = hoveredId === repo.id;

              return (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  onHoverStart={() => setHoveredId(repo.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 transition-all duration-300 ${colorClass} hover:shadow-2xl hover:shadow-violet-500/10`}
                >
                  {/* Hover glow */}
                  <motion.div animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5" />

                  {/* Header */}
                  <div className="relative z-10 mb-4 flex items-start justify-between">
                    <div className="flex flex-1 items-start gap-3 min-w-0">
                      <div className="flex-shrink-0 rounded-xl bg-white/10 p-2.5 transition-colors duration-300 group-hover:bg-violet-500/20">
                        <Code2 size={18} className="text-white/60 transition-colors group-hover:text-violet-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="truncate text-base font-bold text-white transition-colors duration-200 group-hover:text-violet-300">{repo.name}</h3>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className={`h-2 w-2 rounded-full ${dotColor}`} />
                          <span className="text-xs text-white/40">{repo.language || "Mixed"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-shrink-0 gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {repo.homepage && (
                        <motion.a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="rounded-lg p-2 text-white/40 transition-all hover:bg-white/10 hover:text-violet-300"
                        >
                          <ExternalLink size={15} />
                        </motion.a>
                      )}
                      <motion.a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="rounded-lg p-2 text-white/40 transition-all hover:bg-white/10 hover:text-violet-300"
                      >
                        <GithubIcon size={15} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 mb-4 line-clamp-2 text-sm leading-relaxed text-white/40">{repo.description || "No description provided"}</p>

                  {/* Topics */}
                  {repo.topics.length > 0 && (
                    <div className="relative z-10 mb-4 flex flex-wrap gap-1.5">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/50">
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/40">+{repo.topics.length - 3}</span>}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1 transition-colors hover:text-white/70">
                        <Star size={13} />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1 transition-colors hover:text-white/70">
                        <GitFork size={13} />
                        {repo.forks_count}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50 transition-all hover:border-violet-500/40 hover:bg-violet-500/15 hover:text-violet-300 md:hidden"
                        >
                          <ExternalLink size={11} />
                          Demo
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50 transition-all hover:border-violet-500/40 hover:bg-violet-500/15 hover:text-violet-300 md:hidden"
                      >
                        <GithubIcon size={11} />
                        Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-16 text-center text-white/40">
              Tidak ada project dengan filter ini
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* View More */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center">
        <a
          href="https://github.com/ahmdz01"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300 hover:shadow-lg hover:shadow-violet-500/10"
        >
          Explore More on GitHub
          <ExternalLink size={18} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </motion.div>
    </section>
  );
}
