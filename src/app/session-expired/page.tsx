'use client';

import Link from 'next/link';

export default function SessionExpired() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a0c]">
      <div className="premium-card max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto border border-indigo-500/30">
          <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-indigo-500 bg-clip-text text-transparent">
            Session Expired
          </h1>
          <p className="text-gray-400 leading-relaxed">
            For security reasons, your professional session has ended. 
            Please re-authenticate via your secure link to access the dashboard.
          </p>
        </div>

        <div className="pt-4 space-y-4">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm text-indigo-300 italic">
            "Security is not a product, but a process."
          </div>
          
          <Link 
            href="/?email=demo@vogue.com&token=123" 
            className="btn-primary w-full inline-block"
          >
            Re-Authenticate Demo
          </Link>
          
          <p className="text-xs text-gray-500">
            Internal Analytical System v1.2.4
          </p>
        </div>
      </div>
    </div>
  );
}
