import NewsClient from './NewsClient';
import { PrismaClient } from '@prisma/client';
import { Metadata } from 'next';

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: 'AI News Hub | Latest Artificial Intelligence Breakthroughs',
  description: 'Stay updated with the latest AI news, research, tools, and industry breakthroughs on Ainewstools.',
  openGraph: {
    title: 'AI News Hub | Latest Artificial Intelligence Breakthroughs',
    description: 'Stay updated with the latest AI news, research, tools, and industry breakthroughs on Ainewstools.',
    type: 'website',
  },
}

export const revalidate = 0; 

export default async function NewsPage() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: 'desc' }
  });
  
  const formattedNews = articles.map((n) => ({
    id: n.id,
    emoji: n.emoji || "📰",
    cat: n.category || "General",
    title: n.title,
    date: new Date(n.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    source: n.source || "Ainewstools",
    author: n.author || "Admin",
    readTime: n.readTime || "5 min",
    summary: n.summary || "",
    body: n.content,
    imageUrl: n.imageUrl || null,
    tags: JSON.parse(n.tags || "[]"),
    featured: n.featured || false,
  }));

  return <NewsClient initialNews={formattedNews} />
}
