
import React from 'react';
import { Stethoscope, Syringe, Building2, Pill } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCategories: React.FC = () => {
  const categories = [
    {
      id: 1,
      icon: <Building2 size={24} className="text-orange-500" />,
      title: "Pay for Hospitalization",
      bgColor: "bg-orange-50",
      path: "/hospitalization"
    },
    {
      id: 2,
      icon: <Stethoscope size={24} className="text-healthcare-purple" />,
      title: "Pay for Consultation",
      bgColor: "bg-purple-50",
      path: "/consultation"
    },
    {
      id: 3,
      icon: <Syringe size={24} className="text-pink-500" />,
      title: "Pay for Lab Test",
      bgColor: "bg-pink-50",
      path: "/lab-test"
    },
    {
      id: 4,
      icon: <Pill size={24} className="text-cyan-500" />,
      title: "Pay for Medicine",
      bgColor: "bg-cyan-50",
      path: "/pharmacy"
    }
  ];

  return (
    <div className="my-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Pay Your Health Bills</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((category) => (
          <Link 
            key={category.id}
            to={category.path} 
            className="block"
          >
            <div 
              className={`${category.bgColor} rounded-xl p-4 min-w-[90px] service-card flex flex-col items-center`}
            >
              <div className="rounded-xl p-2 mb-2">
                {category.icon}
              </div>
              <p className="text-center text-xs text-gray-700 font-medium">{category.title}</p>
            </div>
          </Link>
        ))}
        <div className="min-w-[30px]"></div>
      </div>
    </div>
  );
};

export default ServiceCategories;
