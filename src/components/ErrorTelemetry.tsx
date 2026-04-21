'use client';

import { useEffect } from 'react';
import { reportError } from '@/lib/error-reporter';

export default function ErrorTelemetry() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      reportError(event.error || new Error(event.message));
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      reportError(event.reason || new Error('Unhandled Promise Rejection'));
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}
