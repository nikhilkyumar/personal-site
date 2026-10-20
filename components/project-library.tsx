"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Code2, GitFork, Layers3, Sparkles } from "lucide-react";

type Repository = {
  name: string; url: string; description: string; language: string; category: string;
  topics?: string[]; updatedAt?: string | null; archived?: boolean; fork?: boolean;
  prominence?: string; summary?: string;
};

const filters = ["All", "AI / ML", "Web", "Backend", "Data", "Competitive programming", "Experiments", "Archived"];
function labelFor(repo: Repository) {
  if (repo.archived) return "Archived";
  if (repo.fork) return "Reference / fork";
  if (repo.prominence === "small-build") return "Small build";
  if (repo.prominence === "reference") return "Reference";
  return "Project";
}

export default function ProjectLibrary({ repositories }: { repositories: Repository[] }) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return repositories.filter((repo) => {
      const categoryMatch = active === "All" || (active === "Archived" ? repo.archived : repo.category === active);
      const queryMatch = !term || `${repo.name} ${repo.description} ${repo.language} ${repo.category} ${(repo.topics ?? []).join(" ")}`.toLowerCase().includes(term);
      return categoryMatch && queryMatch;
    });
  }, [active, query, repositories]);

  return <div className="library-wrap">
    <div className="library-controls"><div className="filter-row" role="group" aria-label="Filter repositories by topic">
      {filters.map((filter) => <button type="button" key={filter} onClick={() => setActive(filter)} className={`filter-chip ${active === filter ? "is-active" : ""}`} aria-pressed={active === filter}>{filter}</button>)}
    </div><label className="repo-search"><span className="sr-only">Search repositories</span><Code2 size={16} aria-hidden="true"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search my repos…"/></label></div>
    <div className="repo-grid" aria-live="polite">{filtered.map((repo) => <article className="repo-card" key={repo.url}>
      <div className="repo-card-top"><span className="repo-icon"><Layers3 size={17} aria-hidden="true"/></span><span className={`repo-status ${repo.archived ? "status-archived" : ""}`}>{labelFor(repo)}</span></div>
      <h3>{repo.name}</h3><p>{repo.summary || repo.description || "Open the source to explore this repository."}</p>
      <div className="repo-card-meta"><span className="repo-language"><span className={`language-dot ${repo.language.toLowerCase().replace(/[^a-z]/g, "")}`}/>{repo.language || "Various"}</span><span>{repo.category}</span></div>
      <div className="repo-card-bottom">{repo.fork ? <span className="repo-footnote"><GitFork size={13} aria-hidden="true"/> Fork</span> : <span className="repo-footnote"><Sparkles size={13} aria-hidden="true"/> Source available</span>}<a href={repo.url} target="_blank" rel="noreferrer" aria-label={`Open ${repo.name} on GitHub`} className="repo-open">Source <ArrowUpRight size={15} aria-hidden="true"/></a></div>
    </article>)}</div>
    {filtered.length === 0 && <div className="empty-state"><Code2 size={22}/><p>No repositories match this filter. Try another topic or search term.</p></div>}
    <p className="library-note">This directory refreshes from your public GitHub API when the project starts or builds. For the live source of truth, browse <a href="https://github.com/nikhilkyumar?tab=repositories" target="_blank" rel="noreferrer">all repositories on GitHub <ArrowUpRight size={12}/></a>.</p>
  </div>;
}
