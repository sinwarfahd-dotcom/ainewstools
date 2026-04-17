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
    name: t.name,
    icon: t.emoji || "🛠️",
    desc: t.shortDesc || t.description,
    cat: t.category || "General",
    pricing: t.pricing || "free",
    rating: t.rating || 0,
    url: t.url !== "#" ? t.url : `https://${t.name.toLowerCase().replace(/\s/g, '')}.com`,
    tags: JSON.parse(t.tags || "[]"),
  }));

  const formattedNews = rawNews.map((n) => ({
    emoji: n.emoji || "📰",
    cat: n.category || "General",
    title: n.title,
    date: new Date(n.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    source: n.source || "Ainewstools"
  }));

  return <HomeClient initialTools={formattedTools} initialNews={formattedNews} />
}
