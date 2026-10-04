import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";

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
    { path: "/before-after", priority: 0.7, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.7, changeFrequency: "monthly" },
    { path: "/process", priority: 0.6, changeFrequency: "yearly" },
    { path: "/warranty", priority: 0.5, changeFrequency: "yearly" },
    { path: "/financing", priority: 0.5, changeFrequency: "yearly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/careers", priority: 0.4, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}/`,
    priority,
    changeFrequency,
  }));

  for (const service of services) {
    entries.push({
      url: `${site.url}/services/${service.slug}/`,
      priority: 0.8,
      changeFrequency: "monthly",
    });
  }

  for (const project of projects) {
    entries.push({
      url: `${site.url}/projects/${project.slug}/`,
      priority: 0.6,
      changeFrequency: "yearly",
    });
  }

  return entries;
}
