
import React from 'react';
import { cn } from '@/lib/utils';

const MBPayBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-2 my-4 animate-scale-in">
      <div className="bg-white p-2 rounded-xl shadow-sm flex items-center justify-center">
        <div className="w-8 h-8 flex items-center justify-center relative">
          <div className="absolute w-full h-full border-2 border-red-500 transform rotate-45"></div>
          <div className="absolute w-full h-full border-2 border-red-500"></div>
          <div className="text-xs font-bold text-healthcare-blue">MB</div>
        </div>
        <span className="ml-1 font-semibold text-gray-800">-Pay</span>
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">
          Get rewards on your every <span className="text-healthcare-blue">Healthcare</span> spend
        </h2>
      </div>
    </div>
  );
};

export default MBPayBadge;
