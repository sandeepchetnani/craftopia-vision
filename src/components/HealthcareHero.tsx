
import React from 'react';
import { Zap } from 'lucide-react';

const HealthcareHero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-healthcare-blue-light rounded-xl p-5 my-4 animate-fade-in">
      {/* Background circles */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/30 rounded-full -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full -ml-8 -mb-8"></div>
      
      {/* Lightning icons */}
      <Zap size={16} className="absolute top-10 right-10 text-healthcare-yellow lightning-icon" />
      <Zap size={14} className="absolute top-16 right-24 text-healthcare-yellow lightning-icon" style={{ animationDelay: '0.5s' }} />
      <Zap size={18} className="absolute top-24 right-14 text-healthcare-yellow lightning-icon" style={{ animationDelay: '1s' }} />
      
      {/* Content */}
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-healthcare-blue-dark text-lg font-semibold mb-1">Pay for any</h3>
          <p className="text-healthcare-blue-dark font-semibold text-lg">Healthcare services</p>
        </div>
        <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center shadow-sm">
          <div className="w-10 h-10 bg-healthcare-yellow rounded-full flex items-center justify-center">
            <span className="text-xl font-semibold text-yellow-800">₹</span>
          </div>
        </div>
      </div>
      
      {/* Dots indicator */}
      <div className="mt-8 flex justify-center">
        <span className="dot-indicator active"></span>
        <span className="dot-indicator inactive"></span>
        <span className="dot-indicator inactive"></span>
      </div>
    </div>
  );
};

export default HealthcareHero;
