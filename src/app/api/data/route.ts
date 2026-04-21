import { NextResponse } from 'next/server';
import { withApiErrorHandling } from '@/lib/api-handler';

export const GET = withApiErrorHandling(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const triggerError = searchParams.get('error') === 'true';

  if (triggerError) {
    throw new Error("Simulated Backend Latency/Timeout Error");
  }

  // Simulate some logic
  const data = {
    message: "Success! You are authorized.",
    timestamp: new Date().toISOString(),
    stats: {
      users: 1250,
      active: 45,
      revenue: "$12,450"
    }
  };

  return NextResponse.json({ success: true, data });
});
