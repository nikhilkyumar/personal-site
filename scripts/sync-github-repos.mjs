import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "github-repositories.json");
const api = "https://api.github.com/users/nikhilkyumar/repos?per_page=100&sort=updated";

function plainText(markdown = "") {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/[>*_~|]/g, " ")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function categorize(repo, readme) {
  const text = `${repo.name} ${repo.description ?? ""} ${(repo.topics ?? []).join(" ")} ${readme}`.toLowerCase();
  if (/\b(dsa|leetcode|codeforces|competitive|algorithm|problem.?solv|data structure)\b/.test(text)) return "Competitive programming";
  if (/\b(tensorflow|pytorch|machine learning|deep learning|computer vision|cnn|yolo|plant disease|xgboost|model training|classification)\b/.test(text)) return "AI / ML";
  if (/\b(power bi|analytics|pandas|visualization|data science|dataset|sql|postgres)\b/.test(text)) return "Data";
  if (/\b(react|next\.js|node\.js|express|website|web app|frontend|full.?stack|html|css|javascript|vite|portfolio)\b/.test(text)) return "Web";
  if (/\b(api|backend|server|authentication|database|rest)\b/.test(text)) return "Backend";
  return "Experiments";
}

async function getReadme(owner, repoName) {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}/readme`, {
      headers: { "User-Agent": "nikhil-portfolio-repo-sync", Accept: "application/vnd.github.raw+json" },
      signal: AbortSignal.timeout(7000),
    });
    if (!res.ok) return "";
    return await res.text();
  } catch {
    return "";
  }
}

async function main() {
  let existing = [];
  try { existing = JSON.parse(await readFile(dataPath, "utf8")); } catch { /* use an empty seed if needed */ }
  try {
    const response = await fetch(api, {
      headers: { "User-Agent": "nikhil-portfolio-repo-sync", Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(9000),
    });
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
    const repos = await response.json();
    if (!Array.isArray(repos)) throw new Error("Unexpected response from GitHub API");

    const publicRepos = repos.filter((repo) => !repo.private && repo.name !== "nikhilkyumar");
    const enriched = await Promise.all(publicRepos.map(async (repo) => {
      const readme = repo.fork ? "" : await getReadme(repo.owner.login, repo.name);
      const compactSummary = plainText(readme).slice(0, 230);
      const meaningfulReadme = readme.trim().length > 350;
      const prominence = repo.archived ? "archived" : (repo.fork ? "reference" : (meaningfulReadme || (repo.topics ?? []).length > 0 ? "project" : "small-build"));
      return {
        name: repo.name,
        url: repo.html_url,
        description: repo.description ?? "Repository description not provided yet.",
        language: repo.language ?? "Various",
        category: categorize(repo, readme),
        topics: repo.topics ?? [],
        updatedAt: repo.updated_at ?? null,
        archived: Boolean(repo.archived),
        fork: Boolean(repo.fork),
        prominence,
        summary: compactSummary || repo.description || "Open the source repository to explore the implementation.",
      };
    }));

    enriched.sort((a, b) => {
      const rank = { project: 0, "small-build": 1, reference: 2, archived: 3 };
      return (rank[a.prominence] ?? 4) - (rank[b.prominence] ?? 4) || a.name.localeCompare(b.name);
    });
    await mkdir(path.dirname(dataPath), { recursive: true });
    await writeFile(dataPath, `${JSON.stringify(enriched, null, 2)}\n`, "utf8");
    console.log(`Synced ${enriched.length} public repositories from github.com/nikhilkyumar.`);
    console.log("Review the generated categories and prominence labels before publishing.");
  } catch (error) {
    console.warn("GitHub repository sync was not available; keeping the bundled repository snapshot.");
    console.warn(error instanceof Error ? error.message : String(error));
    if (!existing.length) process.exitCode = 1;
  }
}

await main();
