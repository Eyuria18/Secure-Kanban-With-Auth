export interface Candidate {
    login: string; // GitHub username
    avatar_url: string; // Profile picture
    name: string | null; // Full name (nullable)
    location: string | null; // Location (nullable)
    email: string | null; // Email (nullable)
    company: string | null; // Company (nullable)
    bio: string | null; // Bio (nullable)
    html_url: string; // GitHub profile link
  }
  