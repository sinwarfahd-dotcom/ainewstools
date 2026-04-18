import HomeClient from './HomeClient';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const revalidate = 0; // Disable static cache

export default async function HomePage() {
  // Fetch Top 8 Tools
  const rawTools = await prisma.tool.findMany({ take: 8, orderBy: { rating: 'desc' } });
  
  // Fetch Top 6 News
  const rawNews = await prisma.article.findMany({ take: 6, orderBy: { publishedAt: 'desc' } });

  const formattedTools = rawTools.map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    icon: t.emoji || "🛠️",
    emoji: t.emoji || "🛠️",
    imageUrl: t.imageUrl || null,
    desc: t.shortDesc || t.description,
    cat: t.category || "General",
    pricing: t.pricing || "free",
    rating: t.rating || 0,
    url: t.url !== "#" ? t.url : `https://${t.name.toLowerCase().replace(/\s/g, '')}.com`,
    tags: JSON.parse(t.tags || "[]"),
    added: new Date(t.createdAt).toISOString(),
    visits: "1K",
  }));

  const formattedNews = rawNews.map((n) => ({
    id: n.id,
    slug: n.slug,
    emoji: n.emoji || "📰",
    cat: n.category || "General",
    title: n.title,
    summary: n.summary || "",
    author: n.author || "Admin",
    readTime: n.readTime || "5 min",
    tags: JSON.parse(n.tags || "[]"),
    featured: n.featured || false,
    imageUrl: n.imageUrl || null,
    date: new Date(n.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    source: n.source || "Ainewstools"
  }));

  return <HomeClient initialTools={formattedTools} initialNews={formattedNews} />
}
