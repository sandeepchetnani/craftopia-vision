
import React from 'react';
import ServiceLocationsPage from '../components/ServiceLocationsPage';

const Pharmacy = () => {
  const pharmacyPromo = {
    bgColor: "bg-cyan-50",
    iconSvg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="#4F46E5" strokeWidth="2" />
        <path d="M50 10 V30" stroke="#4F46E5" strokeWidth="3" />
        <rect x="35" y="35" width="10" height="10" fill="#4F46E5" />
        <rect x="55" y="35" width="10" height="10" fill="none" stroke="#4F46E5" strokeWidth="2" />
        <rect x="35" y="55" width="10" height="10" fill="none" stroke="#4F46E5" strokeWidth="2" />
        <rect x="55" y="55" width="10" height="10" fill="#4F46E5" />
      </svg>
    ),
    title: "Get 10% OFF on all Pharmacy Purchases"
  };

  return (
    <ServiceLocationsPage
      title="Pay for Medicine"
      searchPlaceholder="Search a pharmacy near you"
      locationType="pharmacy"
      promoProps={pharmacyPromo}
    />
  );
};

export default Pharmacy;
