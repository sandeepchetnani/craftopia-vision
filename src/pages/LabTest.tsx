
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLabTestPackages, LabTestResponse } from '../services/labService';
import ServiceLocationsPage from '../components/ServiceLocationsPage';
import LabPackageList from '../components/LabPackageList';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, ShieldCheck } from 'lucide-react';

const LabTest = () => {
  const [showPackages, setShowPackages] = React.useState(false);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['labPackages'],
    queryFn: fetchLabTestPackages
  });

  const labPromo = {
    bgColor: "bg-pink-50",
    iconSvg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="25" y="25" width="50" height="50" rx="5" fill="none" stroke="#EC4899" strokeWidth="2" />
        <line x1="35" y1="40" x2="65" y2="40" stroke="#EC4899" strokeWidth="3" />
        <line x1="35" y1="50" x2="65" y2="50" stroke="#EC4899" strokeWidth="3" />
        <line x1="35" y1="60" x2="55" y2="60" stroke="#EC4899" strokeWidth="3" />
      </svg>
    ),
    title: "Full Body Checkup Starting at ₹2,499"
  };

  return (
    <>
      <ServiceLocationsPage
        title="Pay for Lab Test"
        searchPlaceholder="Search a diagnostic center near you"
        locationType="lab"
        promoProps={labPromo}
      />

      <Button 
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-pink-600 hover:bg-pink-700 shadow-lg z-20"
        onClick={() => setShowPackages(true)}
      >
        <Search className="mr-2 h-4 w-4" /> View Health Packages
      </Button>

      <Dialog open={showPackages} onOpenChange={setShowPackages}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center">
              <div className="bg-pink-100 p-2 rounded-full mr-2">
                <ShieldCheck className="h-6 w-6 text-pink-600" />
              </div>
              Health Packages
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-2">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                Failed to load packages. Please try again.
              </div>
            ) : data ? (
              <LabPackageList categories={data.categories} />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LabTest;
