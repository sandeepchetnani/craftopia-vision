
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { useQuery } from '@tanstack/react-query';
import { fetchLabTestPackages } from '../services/labService';
import LabPackageList from './LabPackageList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export interface LocationItem {
  id: number;
  name: string;
  location: string;
  distance: string;
  image: string;
  hasOffer: boolean;
}

interface LocationCardProps {
  location: LocationItem;
  locationType: 'hospital' | 'clinic' | 'pharmacy' | 'lab';
}

const LocationCard: React.FC<LocationCardProps> = ({ location, locationType }) => {
  const [showPackages, setShowPackages] = useState(false);
  
  // Only fetch lab packages if this is a lab location
  const { data, isLoading } = useQuery({
    queryKey: ['labPackages', location.id],
    queryFn: fetchLabTestPackages,
    enabled: locationType === 'lab'
  });

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div>
        <img 
          src={location.image} 
          alt={location.name}
          className="w-full h-36 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg">{location.name}</h3>
        <p className="text-gray-600 mb-2">{location.location}</p>
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin size={18} className="mr-1" />
          <span>{location.distance}</span>
        </div>
        
        {/* Packages section for lab locations */}
        {locationType === 'lab' && (
          <div className="mt-2">
            <Button 
              variant="ghost" 
              className="p-0 mb-2 text-pink-600 hover:text-pink-700 hover:bg-transparent underline"
              onClick={() => setShowPackages(!showPackages)}
            >
              {showPackages ? 'Hide Packages' : 'View Health Packages'}
            </Button>
            
            {showPackages && (
              <div className="bg-gray-50 p-3 rounded-lg mt-2">
                {isLoading ? (
                  <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-600"></div>
                  </div>
                ) : data ? (
                  <LabPackageList categories={data.categories} />
                ) : null}
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          {location.hasOffer && (
            <button className="text-green-600 font-medium">
              Offer
            </button>
          )}
          {!location.hasOffer && <div></div>}
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full">
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
