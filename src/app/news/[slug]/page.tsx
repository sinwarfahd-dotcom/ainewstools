import { PrismaClient } from '@prisma/client';
import ArticleDetail from '../ArticleDetail';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug }
  });

  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} | AI News`,
    description: article.summary || 'Latest AI news and breakthroughs.',
    openGraph: {
      title: article.title,
      description: article.summary || '',
      images: article.imageUrl ? [article.imageUrl] : [],
      type: 'article',
      publishedTime: article.publishedAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary || '',
      images: article.imageUrl ? [article.imageUrl] : [],
    }
  };
}

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const article = await prisma.article.findUnique({
    where: { slug }
  });

  if (!article) {
    notFound();
  }

  // Fetch related articles
  const allArticles = await prisma.article.findMany({
    where: { 
      NOT: { id: article.id }
    },
    take: 10
  });

  const formattedArticle = {
    id: article.id,
    emoji: article.emoji || "📰",
    cat: article.category || "General",
    title: article.title,
    date: new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    source: article.source || "Ainewstools",
    author: article.author || "Admin",
    readTime: article.readTime || "5 min",
    summary: article.summary || "",
    body: article.content,
    imageUrl: article.imageUrl || null,
    tags: JSON.parse(article.tags || "[]"),
    featured: article.featured || false,
    slug: article.slug
  };

  const formattedRelated = allArticles
    .filter(n => n.category === article.category || JSON.parse(n.tags || "[]").some((t: string) => JSON.parse(article.tags || "[]").includes(t)))
    .slice(0, 4)
    .map(n => ({
      id: n.id,
      emoji: n.emoji || "📰",
      cat: n.category || "General",
      title: n.title,
      slug: n.slug
    }));

  return <ArticleDetail article={formattedArticle} relatedArticles={formattedRelated} />;
}
