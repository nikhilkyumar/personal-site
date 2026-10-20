import type { MetadataRoute } from "next";
import { featuredProjects } from "@/data/featured-projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
  if (!siteUrl) return [];
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...featuredProjects.map((project) => ({
      url: `${siteUrl}/projects/${project.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
