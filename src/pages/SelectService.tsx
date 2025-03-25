
import React from 'react';
import { ArrowLeft, ChevronRight, Pill, Stethoscope, Syringe, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SelectService = () => {
  const services = [
    {
      id: 1,
      icon: <Pill size={24} className="text-cyan-500" />,
      title: "Pay for Medicine",
      subtitle: "Search for Pharmacy",
      bgColor: "bg-cyan-50",
      path: "/pharmacy"
    },
    {
      id: 2,
      icon: <Stethoscope size={24} className="text-healthcare-purple" />,
      title: "Pay for Consultation",
      subtitle: "Search for Hospital / Clinic",
      bgColor: "bg-purple-50",
      path: "/consultation"
    },
    {
      id: 3,
      icon: <Syringe size={24} className="text-pink-500" />,
      title: "Pay for Lab Test / Checkup",
      subtitle: "Search for Diagnostic Center",
      bgColor: "bg-pink-50",
      path: "/lab-test"
    },
    {
      id: 4,
      icon: <Building2 size={24} className="text-orange-500" />,
      title: "Pay for Hospitalization",
      subtitle: "Search for Hospital",
      bgColor: "bg-orange-50",
      path: "/hospitalization"
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-[#f8fafc] min-h-screen">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-4 py-4 flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">Select Service</h1>
        </div>
        <div className="h-px bg-gray-200"></div>
      </div>

      <div className="p-4 space-y-4">
        {services.map((service) => (
          <Link 
            key={service.id} 
            to={service.path}
            className="block"
          >
            <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className={`${service.bgColor} p-3 rounded-xl mr-4`}>
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{service.title}</h3>
                <p className="text-sm text-gray-500">{service.subtitle}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SelectService;
