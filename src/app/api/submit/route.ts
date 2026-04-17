import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { name, url, description, shortDesc, pricing, category, tags, rating, features, emoji } = body;
    
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

    const tool = await prisma.tool.create({
      data: {
        name,
        slug,
        description,
        shortDesc: shortDesc || description.substring(0, 50),
        url,
        pricing: pricing.toLowerCase().replace(" ", "-"),
        emoji: emoji || "🛠️",
        rating: rating || 0,
        category,
        tags: JSON.stringify(tags || []),
        features: JSON.stringify(features || []),
        pros: "[]",
        cons: "[]",
      }
    });

    return NextResponse.json({ success: true, tool });
  } catch (error) {
    console.error('Submit API Error:', error);
    return NextResponse.json({ error: 'Failed to submit tool' }, { status: 500 });
  }
}
