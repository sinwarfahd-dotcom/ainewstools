import ToolsClient from './ToolsClient';
import { PrismaClient } from '@prisma/client';
import { Suspense } from 'react';

const prisma = new PrismaClient();

export const revalidate = 0; // Disable cache so fresh DB records always show on load.

export default async function ToolsPage() {
  const tools = await prisma.tool.findMany();
  
  // Format prisma output back to the expected array shape for the Client Component
  const formattedTools = tools.map((t) => ({
    id: t.id,
    name: t.name,
    icon: t.emoji || "🛠️",
    cat: t.category || "General",
    pricing: t.pricing || "free",
    rating: t.rating || 0,
    visits: "100k", // Mock for now until added to schema
    url: t.url !== "#" ? t.url : `https://${t.name.toLowerCase().replace(/\s/g, '')}.com`,
    tags: JSON.parse(t.tags || "[]"),
    desc: t.shortDesc || t.description,
    long: t.description,
    pros: JSON.parse(t.pros || "[]"),
    cons: JSON.parse(t.cons || "[]"),
    plans: JSON.parse(t.features || "[]"), // We seeded plans array into 'features' field
    added: new Date(t.createdAt).toISOString(),
  }));

  return (
    <Suspense fallback={<div className="loading">Loading Tools...</div>}>
      <ToolsClient initialTools={formattedTools} />
    </Suspense>
  );
}
