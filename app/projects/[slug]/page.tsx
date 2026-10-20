import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import { featuredProjects } from "@/data/featured-projects";
import "../../project-page.css";

const email = "mailto:nikhilkumar.cout@gmail.com";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.id === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — Project notes`,
    description: project.description,
    ...(siteUrl ? { alternates: { canonical: `/projects/${project.id}` } } : {}),
    openGraph: {
      title: `${project.name} — Nikhil Kumar`,
      description: project.description,
      type: "article",
      ...(siteUrl ? { url: `/projects/${project.id}`, images: [`${siteUrl}/projects/${project.id}.svg`] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.id === slug);
  if (!project) notFound();

  const detailCopy: Record<string, { context: string; approach: string; evidence: string; next: string[] }> = {
    greeneye: {
      context: "Plant-disease identification is an image-classification problem with practical constraints: images vary, crops differ, and the model’s output needs to be usable by an application rather than trapped in a notebook.",
      approach: "GreenEye combines a CNN-based classification workflow with image processing and an inference path that can be called by an application. The project work spans model development and the surrounding application stack.",
      evidence: "The résumé reports 92% classification accuracy across multi-crop datasets. Treat this as the reported result for those datasets, not as a guarantee on every field image or a claim of commercial deployment.",
      next: ["Evaluate generalization on held-out images collected in varied field conditions.", "Document the train / validation split and per-class performance alongside the headline metric.", "Keep model inference and application responsibilities clearly separated."],
    },
    blogit: {
      context: "A blogging app is a practical place to work through core backend concerns: who can create or edit content, how the data is structured, and what happens when requests are invalid or results become large.",
      approach: "Blogit uses an MVC-oriented Node.js and Express backend with MongoDB / Mongoose and EJS. The API layer supports content operations while authentication, authorization, validation, pagination, and centralized error handling support predictable workflows.",
      evidence: "The résumé reports 10+ RESTful APIs. No user-count, production-traffic, or security-audit claims are made here.",
      next: ["Add or expand automated tests around authorization and invalid requests.", "Document API contracts and error-response shapes.", "Review deployment and operational requirements before presenting it as production software."],
    },
    footypundit: {
      context: "Player performance, workload, and transfer information can tell different parts of a football story. FootyPundit explores how those signals might be combined to investigate player valuation and injury risk.",
      approach: "The project combines machine-learning approaches including XGBoost and LSTM for prediction, then brings model outputs together in a Player Investment Index (PII). Power BI provides a way to explore the resulting signals rather than treating raw model output as the whole product.",
      evidence: "This is an exploratory analytics project. No model-accuracy, financial-return, professional scouting, or club-adoption claims are made.",
      next: ["Validate model estimates carefully against leakage and time-based data splits.", "Show uncertainty and limitations alongside point estimates.", "Make dashboard interpretations traceable to the underlying signals."],
    },
  };
  const detail = detailCopy[project.id];
  const jsonLd = {
    "@context": "https://schema.org", "@type": "CreativeWork", name: project.name,
    description: project.description, author: { "@type": "Person", name: "Nikhil Kumar" },
    keywords: project.stack.join(", "), ...(siteUrl ? { url: `${siteUrl}/projects/${project.id}` } : {}),
  };

  return <>
    <header className="site-header"><div className="header-inner"><Link className="wordmark" href="/#top" aria-label="Nikhil Kumar, home"><span className="wordmark-mark">n<span>.</span></span><span className="wordmark-name">Nikhil Kumar</span></Link><nav className="desktop-nav" aria-label="Project navigation"><Link href="/#work">Selected work</Link><Link href="/#about">About</Link><Link href="/#lab">GitHub lab</Link></nav><a className="header-contact" href={email}><span>Say hello</span><Mail size={16}/><ArrowUpRight className="header-arrow" size={14}/></a><details className="mobile-nav"><summary aria-label="Open navigation menu"><span className="menu-label">Menu</span><span className="menu-glyph"><i/><i/></span></summary><nav aria-label="Mobile navigation"><Link href="/#work">Work</Link><Link href="/#lab">GitHub Lab</Link><Link href="/#about">About</Link><Link href="/#contact">Contact</Link></nav></details></div></header>
    <main className="project-detail-page">
    <article className={`project-detail ${project.className}`}>
      <div className="page-shell detail-shell">
        <Link className="back-link" href="/#work"><ArrowLeft size={15}/> Back to selected work</Link>
        <div className="detail-intro"><div><p className="eyebrow">{project.number} / {project.label}</p><h1>{project.name}</h1><p className="detail-tagline">{project.tagline}</p><p className="detail-summary">{project.description}</p></div><div className="detail-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
        <div className="detail-art"><Image src={`/projects/${project.id}.svg`} alt={`Original conceptual illustration for ${project.name}`} width={900} height={560} priority sizes="(max-width: 900px) 100vw, 1120px"/></div>
        <div className="detail-story-grid"><div><p className="eyebrow">01 / CONTEXT</p><h2>The question behind the project.</h2></div><div><p>{detail.context}</p><p>{detail.approach}</p></div></div>
        <div className="detail-story-grid detail-evidence"><div><p className="eyebrow">02 / IMPLEMENTATION</p><h2>What the work brings together.</h2></div><div><ul className="detail-bullets">{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul><div className="detail-stack"><span className="eyebrow">TECHNOLOGY</span><div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div></div></div>
        <div className="detail-story-grid detail-result"><div><p className="eyebrow">03 / CONTEXT & LIMITATIONS</p><h2>What the result does — and doesn’t — say.</h2></div><div><p>{detail.evidence}</p>{project.metric && <div className="project-metric detail-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span><small>Reported on the project datasets.</small></div>}<h3 className="next-heading">Further validation worth exploring</h3><ul className="detail-bullets">{detail.next.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
        <div className="detail-bottom"><div><p className="eyebrow">KEEP EXPLORING</p><h2>Good work keeps getting better.</h2><p>These notes describe the project scope based on available resume details. Repository links can be added once the matching source is verified.</p></div><div className="detail-bottom-actions"><a className="button button-dark" href="https://github.com/nikhilkyumar" target="_blank" rel="noreferrer">Browse GitHub <ArrowUpRight size={16}/></a><a className="button button-light" href={email}>Contact me <Mail size={16}/></a></div></div>
      </div>
    </article>
    </main>
    <footer className="site-footer page-shell"><div className="footer-top"><Link className="wordmark" href="/#top"><span className="wordmark-mark">n<span>.</span></span><span className="wordmark-name">Nikhil Kumar</span></Link><p>Built with curiosity. Updated as I go.</p><Link className="back-top" href="/#top">Back to home <ArrowUpRight size={15}/></Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Nikhil Kumar</span><span>Greater Noida, India</span><div className="footer-socials"><a href="https://github.com/nikhilkyumar" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/nikhilkyumar/" target="_blank" rel="noreferrer">LinkedIn</a><a href={email}>Email</a></div></div></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}/>
  </>;
}
