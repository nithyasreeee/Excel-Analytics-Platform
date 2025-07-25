import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#3f4a8a]">404</h1>
          <div className="w-16 h-1 bg-[#39b54b] mx-auto my-4"></div>
          <h2 className="text-2xl font-semibold text-[#1f2937] mb-2">Page Not Found</h2>
          <p className="text-[#6b7280]">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full py-3 px-4 bg-[#39b54b] text-white font-medium rounded-lg hover:bg-[#2a9939] transition-colors"
          >
            Go to Homepage
          </Link>
          
          <Link
            to="/dashboard"
            className="block w-full py-3 px-4 border border-[#3f4a8a] text-[#3f4a8a] font-medium rounded-lg hover:bg-[#f0f4ff] transition-colors"
          >
            Return to Dashboard
          </Link>
          
          <div className="pt-4">
            <Link
              to="/documentation"
              className="text-[#3f4a8a] hover:underline"
            >
              Visit our Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
