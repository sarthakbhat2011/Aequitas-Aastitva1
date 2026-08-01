export interface Committee {
  id: string;
  title: string;
  abbreviation: string;
  category: string;
  theme: string;
  agenda: string;
  description: string;
  atmosphere: string;
  colorScheme: {
    primary: string;
    accent: string;
    border: string;
    bgGlow: string;
  };
  bgImageUrl?: string;
  keyTopics: string[];
  executiveBoard?: {
    name: string;
    role: string;
    avatar?: string;
  }[];
}

export interface ExperiencePillar {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  outcomes: string[];
  metrics: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Diplomacy' | 'Heritage' | 'Debates' | 'Delegates';
  imageUrl: string;
  caption: string;
  year: string;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  experienceLevel: 'First-time Delegate' | 'Intermediate' | 'Veteran Delegate' | 'Executive Board';
  primaryCommittee: string;
  secondaryCommittee: string;
  primaryPreferredCountry: string;
  secondaryPreferredCountry: string;
  preferredCountry?: string;
  statementOfPurpose: string;
  // Executive Board specific fields
  targetEbRole?: string;
  ebCommitteePreferences?: string[];
  pastEbExperience?: string;
  whyJoinAequitas?: string;
}
