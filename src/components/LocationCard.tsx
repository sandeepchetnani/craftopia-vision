
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from './ui/button';

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
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
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
        
        <div className="flex justify-between items-center">
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
