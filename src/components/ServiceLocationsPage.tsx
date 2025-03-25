
import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import LocationCard, { LocationItem } from './LocationCard';
import { searchLocations } from '../services/locationService';

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
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Promo Card */}
        <PromoCard {...promoProps} />

        {/* Are You Here? */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Are You Here?</h2>
          
          <div className="space-y-4">
            {locations.length > 0 ? (
              locations.map(location => (
                <LocationCard key={location.id} location={location} />
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No locations found. Try a different search term.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceLocationsPage;
