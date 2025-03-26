
import React, { useState } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import LocationCard, { LocationItem } from './LocationCard';
import { searchLocations } from '../services/locationService';
import { Button } from './ui/button';

interface PromoCardProps {
  bgColor: string;
  iconSvg: React.ReactNode;
  title: string;
}

const PromoCard: React.FC<PromoCardProps> = ({ bgColor, iconSvg, title }) => (
  <div className={`${bgColor} rounded-xl p-4 mb-6 flex items-center`}>
    <div className="mr-4">
      <div className="w-16 h-16">
        {iconSvg}
      </div>
    </div>
    <div>
      <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
    </div>
  </div>
);

interface ServiceLocationsPageProps {
  title: string;
  searchPlaceholder: string;
  locationType: 'hospital' | 'clinic' | 'pharmacy' | 'lab';
  promoProps: PromoCardProps;
}

const ServiceLocationsPage: React.FC<ServiceLocationsPageProps> = ({
  title,
  searchPlaceholder,
  locationType,
  promoProps
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState<LocationItem[]>(() => searchLocations(locationType, ''));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setLocations(searchLocations(locationType, query));
  };

  const clearSearch = () => {
    setSearchQuery('');
    setLocations(searchLocations(locationType, ''));
  };

  const handleScanQR = () => {
    window.location.href = '/scanner';
  };

  return (
    <div className="max-w-md mx-auto bg-[#f8fafc] min-h-screen">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-4 py-4 flex items-center">
          <Link to="/select-service" className="mr-4">
            <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
        <div className="h-px bg-gray-200"></div>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-white border border-gray-200 rounded-full px-4 py-3 pl-4 pr-12 focus:outline-none"
            />
            {searchQuery ? (
              <button 
                className="absolute right-12 top-1/2 transform -translate-y-1/2"
                onClick={clearSearch}
              >
                <X size={20} className="text-gray-400" />
              </button>
            ) : null}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Promo Card - Only show if there are no search results */}
        {!searchQuery && <PromoCard {...promoProps} />}

        {/* Content Section */}
        {locations.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Are You Here?</h2>
            
            <div className="space-y-4">
              {locations.map(location => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-12 pb-8">
            <div className="w-48 h-48 mb-4">
              <img 
                src="/lovable-uploads/371948d7-5d09-4055-b544-2ca34bfe77d8.png" 
                alt="No results" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No {locationType} found</h2>
            <p className="text-gray-600 text-center mb-8">
              This provider may not be listed with us.
              <br />Don't worry, you can still pay!
            </p>
            
            <Button 
              onClick={handleScanQR}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg mb-8"
            >
              Scan QR to Pay
            </Button>
            
            <div className="w-full">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#f8fafc] px-4 text-sm text-gray-500">
                    Need to pay for another service?
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between mt-6 gap-3">
                <Link to="/consultation" className="flex-1">
                  <div className="border border-gray-200 rounded-lg py-3 px-2 text-center text-purple-700">
                    Consultation
                  </div>
                </Link>
                <Link to="/lab-test" className="flex-1">
                  <div className="border border-gray-200 rounded-lg py-3 px-2 text-center text-pink-600">
                    Lab Test
                  </div>
                </Link>
                <Link to="/hospitalization" className="flex-1">
                  <div className="border border-gray-200 rounded-lg py-3 px-2 text-center text-orange-600">
                    Hospitalization
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceLocationsPage;
