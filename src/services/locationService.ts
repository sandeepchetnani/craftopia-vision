
import { LocationItem } from "../components/LocationCard";

// Mock data service - in a real app, this would fetch from an API
export const fetchLocations = (type: 'hospital' | 'clinic' | 'pharmacy' | 'lab'): LocationItem[] => {
  const locations = {
    hospital: [
      {
        id: 1,
        name: "City General Hospital",
        location: "Kormangala, Main Road",
        distance: "1.2 Km Away",
        image: "https://source.unsplash.com/random/400x200/?hospital,building",
        hasOffer: true
      },
      {
        id: 2,
        name: "MediLife Hospital",
        location: "Kormangala, 5th Block",
        distance: "2.5 Km Away",
        image: "https://source.unsplash.com/random/400x200/?hospital,clinic",
        hasOffer: false
      },
      {
        id: 3,
        name: "Apollo International Hospital",
        location: "Indiranagar, 100ft Road",
        distance: "3.7 Km Away",
        image: "https://source.unsplash.com/random/400x200/?medical,hospital",
        hasOffer: true
      }
    ],
    clinic: [
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
      },
      {
        id: 3,
        name: "Elite Medical Clinic",
        location: "HSR Layout, Sector 1",
        distance: "2.3 Km Away",
        image: "https://source.unsplash.com/random/400x200/?physician,clinic",
        hasOffer: true
      }
    ],
    pharmacy: [
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
      },
      {
        id: 3,
        name: "MedPlus Pharmacy",
        location: "BTM Layout, 2nd Stage",
        distance: "1.1 Km Away",
        image: "https://source.unsplash.com/random/400x200/?medicine,store",
        hasOffer: true
      }
    ],
    lab: [
      {
        id: 1,
        name: "Metropolis Diagnostic Center",
        location: "Kormangala, 5th Block",
        distance: "0.5 Km Away",
        image: "https://source.unsplash.com/random/400x200/?laboratory,medical",
        hasOffer: true
      },
      {
        id: 2,
        name: "HealthScan Labs",
        location: "Kormangala, 3rd Cross",
        distance: "1.2 Km Away",
        image: "https://source.unsplash.com/random/400x200/?medical,lab",
        hasOffer: false
      },
      {
        id: 3,
        name: "SRL Diagnostics",
        location: "Jayanagar, 4th Block",
        distance: "2.8 Km Away",
        image: "https://source.unsplash.com/random/400x200/?test,laboratory",
        hasOffer: true
      }
    ]
  };
  
  return locations[type];
};

// In a real app, this would be an API call
export const searchLocations = (type: 'hospital' | 'clinic' | 'pharmacy' | 'lab', query: string): LocationItem[] => {
  const allLocations = fetchLocations(type);
  
  if (!query) return allLocations;
  
  const lowercaseQuery = query.toLowerCase();
  
  return allLocations.filter(location => 
    location.name.toLowerCase().includes(lowercaseQuery) || 
    location.location.toLowerCase().includes(lowercaseQuery)
  );
};
