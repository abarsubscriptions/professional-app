'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { reportError } from '@/lib/error-reporter';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient<any>('data');
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const triggerUiError = async () => {
    const error = new Error("Generic UI Crash triggered by user!");
    await reportError(error);
    throw error;
  };

  const downloadLogs = async (type: 'api' | 'web') => {
    try {
      const res = await fetch(`/api/export-logs?type=${type}`, {
        headers: { 'Authorization': `Bearer premium_secret_123` }
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-error.log`;
      a.click();
    } catch (err) {
      alert("Failed to export logs");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <header className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
            Vogue Analytics Engine
          </h1>
          <p className="text-gray-400 text-sm">Professional Web & API Ecosystem</p>
        </div>
        <div className="flex gap-4">
          <button onClick={fetchData} className="btn-primary">
            Refresh Data
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="premium-card">
          <p className="text-gray-400 text-sm mb-2">Total Users</p>
          <p className="text-4xl font-bold text-white">{data?.stats?.users || '--'}</p>
          <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-2/3"></div>
          </div>
        </div>
        <div className="premium-card">
          <p className="text-gray-400 text-sm mb-2">Active Sessions</p>
          <p className="text-4xl font-bold text-indigo-400 font-mono">{data?.stats?.active || '--'}</p>
        </div>
        <div className="premium-card">
          <p className="text-gray-400 text-sm mb-2">Revenue (YTD)</p>
          <p className="text-4xl font-bold text-emerald-400">{data?.stats?.revenue || '--'}</p>
        </div>
      </section>

      {/* Control Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Error Handling Demo */}
        <div className="premium-card space-y-6">
          <h3 className="text-xl font-semibold text-white">System Diagnostics</h3>
          <p className="text-gray-400 text-sm">
            Test the professional error handling boundaries and real-time logging system.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={triggerUiError}
              className="px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/20 transition-all font-medium"
            >
              Simulate UI Crash
            </button>
            <button 
               className="px-4 py-3 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-xl hover:bg-orange-500/20 transition-all font-medium"
               onClick={() => apiClient('data?error=true').catch(err => setError(err.message))}
            >
              Test API Latency
            </button>
          </div>
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              API Error: {error}
            </div>
          )}
        </div>

        {/* Log Export */}
        <div className="premium-card space-y-6">
          <h3 className="text-xl font-semibold text-white">Export Error Logs</h3>
          <p className="text-gray-400 text-sm">
            Securely download generated error log files for both Web and API instances.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => downloadLogs('api')}
              className="w-full flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-all group"
            >
              <span className="text-white">api-error.log</span>
              <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded uppercase">Download</span>
            </button>
            <button 
              onClick={() => downloadLogs('web')}
              className="w-full flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-all group"
            >
              <span className="text-white">web-error.log</span>
              <span className="text-xs px-2 py-1 bg-pink-500/20 text-pink-400 rounded uppercase">Download</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-8">
        &copy; 2026 Vogue Analytical Systems. All rights reserved. Professional Grade Architecture.
      </footer>
    </main>
  );
}
