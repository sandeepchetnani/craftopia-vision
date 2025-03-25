
import React from 'react';
import { ArrowLeft, Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Consultation = () => {
  const clinics = [
    {
      id: 1,
      name: "HealthFirst Clinic",
      location: "Kormangala, 2nd Phase",
      distance: "0.8 Km Away",
      image: "https://source.unsplash.com/random/400x200/?doctor,clinic",
      hasOffer: true
    },
    {
      id: 2,
      name: "Family Healthcare Center",
      location: "Kormangala, 8th Cross",
      distance: "1.5 Km Away",
      image: "https://source.unsplash.com/random/400x200/?healthcare,doctor",
      hasOffer: false
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-[#f8fafc] min-h-screen">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-4 py-4 flex items-center">
          <Link to="/select-service" className="mr-4">
            <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">Pay for Consultation</h1>
        </div>
        <div className="h-px bg-gray-200"></div>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search a clinic near you"
              className="w-full bg-white border border-gray-200 rounded-full px-4 py-3 pl-4 pr-12 focus:outline-none"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Promo Card */}
        <div className="bg-purple-50 rounded-xl p-4 mb-6 flex items-center">
          <div className="mr-4">
            <div className="w-16 h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#6B46C1" strokeWidth="2" />
                <path d="M30 50 L45 65 L70 35" stroke="#6B46C1" strokeWidth="3" fill="none" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Book Specialist Consultation at 20% OFF</h3>
          </div>
        </div>

        {/* Are You Here? */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Are You Here?</h2>
          
          <div className="space-y-4">
            {clinics.map(clinic => (
              <div key={clinic.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div>
                  <img 
                    src={clinic.image} 
                    alt={clinic.name}
                    className="w-full h-36 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg">{clinic.name}</h3>
                  <p className="text-gray-600 mb-2">{clinic.location}</p>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin size={18} className="mr-1" />
                    <span>{clinic.distance}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {clinic.hasOffer && (
                      <button className="text-green-600 font-medium">
                        Offer
                      </button>
                    )}
                    {!clinic.hasOffer && <div></div>}
                    <button className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition-colors">
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
