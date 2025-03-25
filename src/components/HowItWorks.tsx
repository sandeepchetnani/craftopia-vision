
import React from 'react';
import { Search, Ticket, FileText } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: <Search size={28} className="text-healthcare-blue" />,
      title: "STEP 1",
      description: "Search for the provider when at the location."
    },
    {
      id: 2,
      icon: <Ticket size={28} className="text-healthcare-blue" />,
      title: "STEP 2",
      description: "Apply offer & pay via UPI, Wallet, Cards etc."
    },
    {
      id: 3,
      icon: <FileText size={28} className="text-healthcare-blue" />,
      title: "STEP 3",
      description: "Upload your invoice and earn extra rewards!"
    }
  ];

  return (
    <div className="my-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">How It Works</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
        {steps.map((step) => (
          <div 
            key={step.id}
            className="bg-gray-50 rounded-xl p-4 min-w-[120px] flex-1 service-card"
          >
            <div className="flex justify-center mb-2">
              {step.icon}
            </div>
            <p className="text-center text-xs text-gray-400 font-medium mb-1">{step.title}</p>
            <p className="text-center text-xs text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
