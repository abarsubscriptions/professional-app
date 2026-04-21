import { NextResponse } from 'next/server';
import { getLogContent } from '@/lib/logger';
import { withApiErrorHandling } from '@/lib/api-handler';

export const GET = withApiErrorHandling(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') as 'api' | 'web';

  if (!type || !['api', 'web'].includes(type)) {
    return NextResponse.json({ error: 'Invalid log type' }, { status: 400 });
  }

  const content = getLogContent(type);

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Content-Disposition': `attachment; filename="${type}-error.log"`,
    },
  });
});
