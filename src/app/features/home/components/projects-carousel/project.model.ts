/**
 * Project Interface
 * Represents a portfolio project with all its details
 */
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string[]; // Optional array for carousel images
  category: string;
  technologies: string[];
  link: string; // Internal routing link (e.g., /project/mcv-tender)
  liveUrl?: string; // Optional external live project URL
  githubUrl?: string; // Optional GitHub repository URL
  featured: boolean;
  completionDate: string;
  client: string;
  
  // Optional extended details
  challenges?: string;
  solution?: string;
  results?: string;
}
