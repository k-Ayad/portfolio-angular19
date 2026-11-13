/**
 * Project Interface
 * Represents a portfolio project (one /work/<slug> page)
 */
export interface ProjectImage {
  src: string;
  alt: string;
  altAr?: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string; // One-line description
  problem?: string; // Omitted (and marked in `todo`) when not provided
  built: string[];
  technologies: string[];
  liveUrl?: string;
  image: string; // Cover image
  images?: ProjectImage[]; // Screenshots shown on the project page
  noScreenshot?: boolean; // `image` is only a placeholder, so don't show it as a screenshot
  completionDate?: string;
  featured: boolean;
  legacyIds: string[]; // Old /project/:id values (numeric id and old slug) that redirect here
  ar?: { summary: string; problem?: string; built: string[] }; // Arabic text; titles, client names and stack stay in Latin
  hidden?: boolean; // Kept in the data but left out of every page, route, sitemap and llms.txt
  todo?: string[]; // Facts still needed; never rendered
}
