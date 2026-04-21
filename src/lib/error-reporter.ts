export const reportError = async (error: any) => {
  try {
    await fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message || 'Unknown Client Error',
        stack: error.stack || 'No Stack Trace',
        url: typeof window !== 'undefined' ? window.location.href : 'SSR',
      }),
    });
  } catch (err) {
    console.error('Failed to report error:', err);
  }
};
