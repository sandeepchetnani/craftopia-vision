
import React from 'react';
import { ArrowRight } from 'lucide-react';

const PromoCard: React.FC = () => {
  return (
    <div className="my-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="bg-healthcare-pink-light rounded-xl p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10"></div>
        
        <div className="flex">
          <div className="flex-1 pr-2">
            <div className="flex items-center mb-1">
              <div className="w-5 h-5 mr-1">
                <div className="w-4 h-4 flex items-center justify-center relative">
                  <div className="absolute w-full h-full border-[1.5px] border-red-500 transform rotate-45"></div>
                  <div className="absolute w-full h-full border-[1.5px] border-red-500"></div>
                </div>
              </div>
              <span className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded text-red-500">makeO</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-1">FLAT ₹12,000 OFF</h3>
            <p className="text-sm font-medium text-gray-700 mb-1">on Clear Aligners</p>
            <p className="text-xs text-gray-600 mb-3">Backed by 100+ Orthodontists!</p>
            
            <button className="flex items-center text-xs text-red-500 font-semibold">
              BOOK A SCAN <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
          
          <div className="w-24 h-24">
            <img 
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRlbnRpc3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
              alt="Happy Couple with aligners"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
