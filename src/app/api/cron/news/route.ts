import { NextResponse } from 'next/server';
import { processAndSaveNews } from '@/lib/services/newsService';

// To run this securely, set CRON_SECRET in your .env
// Defaults to a fallback here so testing is easy the first time, but recommend enforcing this.
const CRON_SECRET = process.env.CRON_SECRET || 'dev-mock-secret';

/**
 * @route POST /api/cron/news
 * @description Automated endpoint to fetch, write, and save AI news.
 */
export async function POST(request: Request) {
  try {
    // 1. Authorization Check
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      console.warn('[Cron] Unauthorized attempt to access news fetcher');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Execute Pipeline
    console.log('[Cron] Starting generic automated news fetcher pipeline...');
    const article = await processAndSaveNews();

    // 3. Return Success
    return NextResponse.json(
      { 
        success: true, 
        message: 'News fetched and saved successfully.',
        articleId: article.id,
        slug: article.slug
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('[Cron] Job failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Optionally, allow GET if triggered by browsers or simple webhook pingers that don't support POST.
// For strict REST and mutation safety, POST is best, but Vercel Cron uses GET by default.
export async function GET(request: Request) {
  return POST(request);
}
