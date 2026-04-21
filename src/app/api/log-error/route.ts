import { NextResponse } from 'next/server';
import { webLogger } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    const { message, stack, url } = await req.json();

    webLogger.error({
      message: `Client-side error: ${message}`,
      stack,
      url,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
