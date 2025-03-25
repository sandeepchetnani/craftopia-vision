
import React from 'react';
import ServiceLocationsPage from '../components/ServiceLocationsPage';

const LabTest = () => {
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
    <ServiceLocationsPage
      title="Pay for Lab Test"
      searchPlaceholder="Search a diagnostic center near you"
      locationType="lab"
      promoProps={labPromo}
    />
  );
};

export default LabTest;
