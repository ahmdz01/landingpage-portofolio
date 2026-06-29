"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
// import { Badge } from "@/components/ui/badge";
import { Repo } from "@/lib/github";
import { Code, ExternalLink, GitFork, Star } from "lucide-react";

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Go: "bg-cyan-500",
  Rust: "bg-orange-600",
  Java: "bg-red-500",
  "C++": "bg-pink-500",
  CSS: "bg-purple-500",
  HTML: "bg-orange-400",
};

interface Props {
  repos: Repo[];
}

export default function ProjectsClient({ repos }: Props) {
  const [filter, setFilter] = useState("All");

  const languages = useMemo(() => ["All", ...new Set(repos.map((repo) => repo.language).filter(Boolean) as string[])], [repos]);

  const filteredRepos = useMemo(() => {
    if (filter === "All") return repos;
    return repos.filter((repo) => repo.language === filter);
  }, [repos, filter]);

  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-24">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12 text-center">
        <p className="text-primary text-sm font-medium uppercase tracking-widest mb-2">Portfolio</p>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Projects Saya</h2>

        <p className="text-muted-foreground max-w-xl mx-auto">Semua project di bawah ini diambil langsung dari GitHub secara otomatis.</p>
      </motion.div>

      {/* Filter */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-2 mb-10">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setFilter(lang)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${filter === lang ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-accent"}`}
          >
            {lang}
          </button>
        ))}
      </motion.div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRepos.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
            }}
            className="group flex flex-col rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/50 hover:shadow-md"
          >
            {/* Title */}
            <div className="mb-2 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Code size={16} className="mt-0.5 text-muted-foreground" />
                <h3 className="max-w-[170px] truncate text-sm font-semibold">{repo.name}</h3>
              </div>

              <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer" title="Live Demo" className="text-muted-foreground hover:text-foreground">
                    <ExternalLink size={15} />
                  </a>
                )}

                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" title="GitHub" className="text-muted-foreground hover:text-foreground">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Description */}
            <p className="flex-1 line-clamp-2 text-sm text-muted-foreground">{repo.description || "No description provided."}</p>

            {/* Topics */}
            {repo.topics.length > 0 && (
              <div className="my-4 flex flex-wrap gap-1">
                {/* {repo.topics.slice(0, 3).map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))} */}
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                {repo.language && (
                  <>
                    <span className={`h-2.5 w-2.5 rounded-full ${languageColors[repo.language] ?? "bg-gray-400"}`} />
                    {repo.language}
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Star size={12} />
                  {repo.stargazers_count}
                </span>

                <span className="flex items-center gap-1">
                  <GitFork size={12} />
                  {repo.forks_count}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Button */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent">
          Lihat semua di GitHub
          <ExternalLink size={14} />
        </a>
      </motion.div>
    </section>
  );
}
