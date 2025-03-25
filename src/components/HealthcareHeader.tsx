
import React from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const HealthcareHeader: React.FC = () => {
  return (
    <header className="py-2 px-4 flex items-center bg-gradient-to-br from-healthcare-blue-light to-white relative animate-fade-in">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuLWNpcmNsZXMiIHg9IjAiIHk9IjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSg2NiwgMTMzLCAyNDQsIDAuMikiLz48L3BhdHRlcm4+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuLWNpcmNsZXMpIiAvPjwvc3ZnPg==')]" 
           style={{ opacity: 0.3 }}></div>
      <button 
        className="p-2 rounded-full text-healthcare-blue-dark hover:bg-healthcare-blue-light transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>
      <div className="ml-3 flex flex-col">
        <div className="text-xl font-semibold text-gray-800">560076</div>
        <div className="text-xs text-gray-500 flex items-center">
          <span className="line-clamp-1">Billekohalli, BG Road, BTM Phase 2</span>
          <MapPin size={12} className="ml-1" />
        </div>
      </div>
    </header>
  );
};

export default HealthcareHeader;
