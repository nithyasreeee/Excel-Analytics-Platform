import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="max-w-4xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold mb-8 text-[#1f2937] animate-fade-in">
          Welcome to Excel Analytics Platform
        </h1>
        <p className="text-xl text-[#6b7280] mb-12 max-w-2xl mx-auto leading-relaxed">
          Transform your Excel data into actionable insights. Upload, analyze, and visualize your spreadsheets with powerful tools and intuitive interface.
        </p>
        <div className="space-x-6">
          <a 
            href="/login" 
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-[#39b54b] rounded-lg hover:bg-[#2a9939] transition-all transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </a>
          <a 
            href="/register" 
            className="inline-block px-8 py-4 text-lg font-semibold text-[#3f4a8a] bg-white rounded-lg hover:bg-[#f0f2f9] transition-all transform hover:scale-105 hover:shadow-lg border-2 border-[#3f4a8a]"
          >
            Create Account
          </a>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-[#e5e7eb]">
            <div className="text-[#39b54b] text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2 text-[#1f2937]">Quick Analysis</h3>
            <p className="text-[#6b7280]">Get instant insights from your Excel data with automated analysis tools</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-[#e5e7eb]">
            <div className="text-[#f59e0b] text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-2 text-[#1f2937]">Visualization</h3>
            <p className="text-[#6b7280]">Transform your data into beautiful, interactive visualizations</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-[#e5e7eb]">
            <div className="text-[#3f4a8a] text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-2 text-[#1f2937]">Real-time Updates</h3>
            <p className="text-[#6b7280]">See changes instantly as you modify and analyze your data</p>
          </div>
        </div>
      </div>
    </div>
  );
}
