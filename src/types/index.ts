export interface PricingPlan {
  name: string;
  price: string;
  note: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  desc: string;
  long?: string;
  url: string;
  pricing: string;
  imageUrl: string | null;
  emoji: string | null;
  icon?: string | null; // Alias for emoji in some places
  rating: number;
  added: string;
  visits: string;
  cat: string;
  tags: string[];
  pros?: string[];
  cons?: string[];
  plans?: PricingPlan[];
  featured?: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  body?: string; // Alias for content
  source: string;
  author: string;
  readTime: string;
  cat: string; // Alias for category
  emoji: string;
  tags: string[];
  featured: boolean;
  imageUrl: string | null;
  date: string; // Formatted date string
}
