import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

// Generated from live route data so it can never drift from the actual
// pages/slugs the way the old hand-maintained public/sitemap.xml did.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "monthly" },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/areas", priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}/`,
    priority,
    changeFrequency,
  }));

  for (const project of projects) {
    entries.push({
      url: `${site.url}/projects/${project.slug}/`,
      priority: 0.6,
      changeFrequency: "yearly",
    });
  }

  return entries;
}
