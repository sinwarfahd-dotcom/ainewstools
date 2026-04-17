import prisma from '../prisma';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + Date.now();
}

/**
 * MOCK: Fetch raw news from an external provider (e.g., NewsAPI)
 */
async function fetchRawNews() {
  console.log('[NewsService] Fetching simulated raw news...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    title: "OpenAI announces breakthrough in reasoning models",
    description: "The new o1 model exhibits step-by-step reasoning that significantly outperforms prior architectures.",
    source: "TechCrunch",
    author: "Jane Doe"
  };
}

/**
 * MOCK: Pass raw text to an AI (e.g., OpenAI/Gemini) to rewrite into an engaging format
 */
async function rewriteWithAI(rawNews: any) {
  console.log('[NewsService] Rewriting content with AI...');
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    title: "The Next Leap: How OpenAI's Reasoning Models Are Changing Everything",
    summary: "OpenAI has just unveiled a groundbreaking development in reasoning architectures with their new o1 model.",
    content: "<h2>A New Era of Reasoning</h2><p>In a major announcement today, OpenAI revealed a significant leap in large language models with the introduction of their latest reasoning-focused model.</p><p>Unlike previous models that relied primarily on pattern matching, this new architecture incorporates explicit, step-by-step reasoning traces before generating a final answer, yielding vastly superior outcomes in mathematics, coding, and logical tasks.</p>",
    tags: JSON.stringify(["OpenAI", "Reasoning", "LLMs", "AI News"]),
    category: "AI Models",
    emoji: "🧠",
    readTime: "3 min read"
  };
}

/**
 * MOCK: Fetch a contextual media image for the news (e.g., Unsplash)
 */
async function fetchMedia() {
  console.log('[NewsService] Fetching media...');
  await new Promise(resolve => setTimeout(resolve, 500));
  return "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"; // Neural network / AI placeholder image
}

/**
 * Orchestrates the fetching, rewriting, media procurement, and saving.
 */
export async function processAndSaveNews() {
  try {
    const rawNews = await fetchRawNews();
    const polishedContent = await rewriteWithAI(rawNews);
    const imageUrl = await fetchMedia();

    console.log('[NewsService] Saving to database...');

    const article = await prisma.article.create({
      data: {
        title: polishedContent.title,
        slug: generateSlug(polishedContent.title),
        content: polishedContent.content,
        summary: polishedContent.summary,
        source: rawNews.source,
        author: rawNews.author,
        readTime: polishedContent.readTime,
        category: polishedContent.category,
        emoji: polishedContent.emoji,
        tags: polishedContent.tags,
        imageUrl: imageUrl, 
        publishedAt: new Date(),
        featured: false,
      }
    });

    console.log('[NewsService] Pipeline completed successfully. Article ID:', article.id);
    return article;
  } catch (error) {
    console.error('[NewsService] Failed to process and save news:', error);
    throw error;
  }
}
