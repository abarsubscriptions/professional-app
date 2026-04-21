import { NextResponse } from 'next/server';
import { apiLogger } from './logger';

type Handler = (req: Request, ...args: any[]) => Promise<Response>;

export const withApiErrorHandling = (handler: Handler) => {
  return async (req: Request, ...args: any[]) => {
    try {
      return await handler(req, ...args);
    } catch (error: any) {
      // Log the error using winston
      apiLogger.error({
        message: error.message || 'An unexpected error occurred in API',
        stack: error.stack,
        url: req.url,
        method: req.method,
      });

      return NextResponse.json(
        {
          success: false,
          error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error',
        },
        { status: error.status || 500 }
      );
    }
  };
};
