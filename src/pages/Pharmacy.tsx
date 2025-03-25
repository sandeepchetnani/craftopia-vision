
import React from 'react';
import { ArrowLeft, Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pharmacy = () => {
  const pharmacies = [
    {
      id: 1,
      name: "Apollo Pharmacy Store",
      location: "Kormangala, Phase 1",
      distance: "0 Km Away",
      image: "https://source.unsplash.com/random/400x200/?pharmacy,hospital",
      hasOffer: true
    },
    {
      id: 2,
      name: "Abhaya Pharmacy Store",
      location: "Kormangala, 7th Cross",
      distance: "0.3 Km Away",
      image: "https://source.unsplash.com/random/400x200/?pharmacy,drugs",
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
          <h1 className="text-xl font-semibold text-gray-800">Pay for Medicine</h1>
        </div>
        <div className="h-px bg-gray-200"></div>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search a pharmacy near you"
              className="w-full bg-white border border-gray-200 rounded-full px-4 py-3 pl-4 pr-12 focus:outline-none"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Promo Card */}
        <div className="bg-orange-50 rounded-xl p-4 mb-6 flex items-center">
          <div className="mr-4">
            <div className="w-16 h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="20" y="20" width="60" height="60" fill="none" stroke="#4F46E5" strokeWidth="2" />
                <path d="M50 10 V30" stroke="#4F46E5" strokeWidth="3" />
                <rect x="35" y="35" width="10" height="10" fill="#4F46E5" />
                <rect x="55" y="35" width="10" height="10" fill="none" stroke="#4F46E5" strokeWidth="2" />
                <rect x="35" y="55" width="10" height="10" fill="none" stroke="#4F46E5" strokeWidth="2" />
                <rect x="55" y="55" width="10" height="10" fill="#4F46E5" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Get 10% OFF on all Hospital Transactions</h3>
          </div>
        </div>

        {/* Are You Here? */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Are You Here?</h2>
          
          <div className="space-y-4">
            {pharmacies.map(pharmacy => (
              <div key={pharmacy.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div>
                  <img 
                    src={pharmacy.image} 
                    alt={pharmacy.name}
                    className="w-full h-36 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg">{pharmacy.name}</h3>
                  <p className="text-gray-600 mb-2">{pharmacy.location}</p>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin size={18} className="mr-1" />
                    <span>{pharmacy.distance}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {pharmacy.hasOffer && (
                      <button className="text-green-600 font-medium">
                        Offer
                      </button>
                    )}
                    {!pharmacy.hasOffer && <div></div>}
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

export default Pharmacy;
