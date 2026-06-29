"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Repo } from "@/lib/github";
import { Code, ExternalLink, GitFork, Star } from "lucide-react";

const languageColors: Record<string, string> = {
  TypeScript: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
  JavaScript: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30",
  Python: "from-green-500/20 to-green-500/5 border-green-500/30",
  Go: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
  Rust: "from-orange-600/20 to-orange-600/5 border-orange-600/30",
  Java: "from-red-500/20 to-red-500/5 border-red-500/30",
  "C++": "from-pink-500/20 to-pink-500/5 border-pink-500/30",
  CSS: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
  HTML: "from-orange-400/20 to-orange-400/5 border-orange-400/30",
  PHP: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30",
  default: "from-primary/10 to-primary/5 border-primary/30",
};

const languageBadge: Record<string, string> = {
  TypeScript: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
  JavaScript: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20",
  Python: "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20",
  Go: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20",
  Rust: "bg-orange-600/10 text-orange-700 dark:text-orange-400 border border-orange-600/20",
  Java: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
  "C++": "bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20",
  CSS: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20",
  HTML: "bg-orange-400/10 text-orange-600 dark:text-orange-400 border border-orange-400/20",
  PHP: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
  default: "bg-primary/10 text-primary border border-primary/20",
};

interface Props {
  repos: Repo[];
}

// Komponen SVG GitHub resmi yang fleksibel mengikuti properti size dan className
const GithubIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectsClient({ repos }: Props) {
  const [filter, setFilter] = useState("All");
  const [expandedRepo, setExpandedRepo] = useState<number | null>(null);

  const languages = useMemo(() => ["All", ...new Set(repos.map((repo) => repo.language).filter(Boolean) as string[])], [repos]);

  const filteredRepos = useMemo(() => {
    if (filter === "All") return repos;
    return repos.filter((repo) => repo.language === filter);
  }, [repos, filter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-32 relative">
      {/* Background gradient */}
      <div className="absolute -top-40 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Portfolio</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Featured Projects</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">A selection of my recent projects and contributions. All repositories are synced directly from GitHub.</p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap justify-center gap-2 mb-16">
        {languages.map((lang, index) => (
          <motion.button
            key={lang}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(lang)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              filter === lang
                ? "bg-primary text-primary-foreground border border-primary shadow-lg shadow-primary/20"
                : "border border-border hover:border-foreground/30 text-muted-foreground hover:text-foreground hover:bg-accent/60 backdrop-blur-sm"
            }`}
          >
            {lang}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div key={filter} variants={containerVariants} initial="hidden" animate="show" exit="exit" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo) => {
              const colorClass = languageColors[repo.language || "default"] || languageColors.default;
              const badgeClass = languageBadge[repo.language || "default"] || languageBadge.default;
              const isExpanded = expandedRepo === repo.id;

              return (
                <motion.div
                  key={repo.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 bg-gradient-to-br ${colorClass} p-6 hover:border-primary/50 hover:shadow-2xl cursor-pointer`}
                  onClick={() => setExpandedRepo(isExpanded ? null : repo.id)}
                >
                  {/* Background glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                  </div>

                  {/* Header */}
                  <div className="relative z-10 mb-4 flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="p-2.5 rounded-lg bg-background/40 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300 flex-shrink-0">
                        <Code size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base truncate group-hover:text-primary transition-colors duration-200">{repo.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{repo.language || "Mixed"}</p>
                      </div>
                    </div>

                    {/* Links - Always visible on desktop, animated on mobile */}
                    <div className="flex flex-shrink-0 gap-2 opacity-0 lg:opacity-100 transition-opacity duration-300 group-hover:opacity-100">
                      {repo.homepage && (
                        <motion.a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Live Demo"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg p-2 transition-colors duration-200 hover:bg-background/60"
                        >
                          <ExternalLink size={16} className="text-muted-foreground hover:text-primary" />
                        </motion.a>
                      )}

                      <motion.a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View on GitHub"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-lg p-2 transition-colors duration-200 hover:bg-background/60"
                      >
                        <GithubIcon size={16} className="text-muted-foreground hover:text-primary" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`mb-4 text-sm leading-relaxed text-muted-foreground transition-all duration-300 ${isExpanded ? "line-clamp-none" : "line-clamp-2"}`}>{repo.description || "No description provided"}</p>

                  {/* Topics */}
                  {repo.topics.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="mb-4 flex flex-wrap gap-1.5">
                      {repo.topics.slice(0, isExpanded ? repo.topics.length : 3).map((topic) => (
                        <Badge key={topic} variant="secondary" className="bg-background/40 text-xs font-medium transition-colors hover:bg-background/60">
                          {topic}
                        </Badge>
                      ))}
                      {repo.topics.length > 3 && !isExpanded && (
                        <Badge variant="secondary" className="bg-background/40 text-xs">
                          +{repo.topics.length - 3}
                        </Badge>
                      )}
                    </motion.div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-foreground/10 pt-4 text-xs">
                    <div className="flex items-center gap-2">{repo.language && <span className={`rounded-full px-2.5 py-1 font-medium ${badgeClass}`}>{repo.language}</span>}</div>

                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1 transition-colors hover:text-foreground">
                        <Star size={14} />
                        {repo.stargazers_count}
                      </span>

                      <span className="flex items-center gap-1 transition-colors hover:text-foreground">
                        <GitFork size={14} />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>

                  {/* Mobile action links */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-foreground/10 flex gap-3 lg:hidden"
                      >
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 rounded-lg bg-background/40 hover:bg-background/60 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
                          >
                            <ExternalLink size={14} />
                            Live Demo
                          </a>
                        )}
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 rounded-lg bg-background/40 hover:bg-background/60 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <GithubIcon size={14} />
                          GitHub
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div variants={itemVariants} className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Tidak ada project dengan filter ini</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* View More Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center">
        <a
          href="https://github.com/ahmdz01"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 px-8 py-4 font-semibold hover:border-primary/50 hover:bg-accent transition-all duration-200 group"
        >
          Explore More on GitHub
          <ExternalLink size={18} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </motion.div>
    </section>
  );
}
