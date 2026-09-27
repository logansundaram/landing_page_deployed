import type { MetadataRoute } from "next";
import { site } from "./lib/site";
import { docPages } from "./lib/docs";
import { posts } from "./lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/install`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/docs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...docPages.map((d) => ({
      url: `${site.url}/docs/${d.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    {
      url: `${site.url}/eris`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${site.url}/blog`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
