import CompareClient from './CompareClient';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const revalidate = 0; // Always fetch fresh data so new tools appear immediately

export default async function ComparePage() {
  const tools = await prisma.tool.findMany({ orderBy: { name: 'asc' } });

  const formattedTools = tools.map((t) => {
    // Parse the tags field to extract feature names for comparison
    const tags: string[] = JSON.parse(t.tags || "[]");
    const pros: string[] = JSON.parse(t.pros || "[]");
    const cons: string[] = JSON.parse(t.cons || "[]");

    return {
      id: t.id,
      name: t.name,
      icon: t.emoji || "🛠️",
      category: t.category || "General",
      pricing: t.pricing || "free",
      rating: t.rating || 0,
      features: tags,  // Use tags as feature list for comparison
      pros,
      cons,
    };
  });

  return <CompareClient tools={formattedTools} />;
}
