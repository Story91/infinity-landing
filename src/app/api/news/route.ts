import { NextResponse } from 'next/server';
import { getNewsWithCache } from '@/lib/newsCache';

export async function GET() {
  try {
    const news = await getNewsWithCache();
    return NextResponse.json(news);
  } catch (err) {
    console.error('[/api/news] error:', err);
    return NextResponse.json([], { status: 200 }); // graceful degradation
  }
}
