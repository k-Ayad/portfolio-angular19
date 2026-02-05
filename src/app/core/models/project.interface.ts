export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link: string;
  featured: boolean;
  completionDate: string;
  client: string;
  images?: string[]; // Additional images for project details carousel
  liveUrl?: string; // Optional live project URL
  githubUrl?: string; // Optional GitHub repository URL
  challenges?: string; // Project challenges
  solution?: string; // Solutions implemented
  results?: string; // Project results/impact
}
