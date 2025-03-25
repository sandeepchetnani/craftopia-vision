
import React from 'react';
import ServiceLocationsPage from '../components/ServiceLocationsPage';

const Hospitalization = () => {
  const hospitalPromo = {
    bgColor: "bg-orange-50",
    iconSvg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="#FF6B00" strokeWidth="2" />
        <path d="M50 10 V30" stroke="#FF6B00" strokeWidth="3" />
        <rect x="35" y="35" width="10" height="10" fill="#FF6B00" />
        <rect x="55" y="35" width="10" height="10" fill="none" stroke="#FF6B00" strokeWidth="2" />
        <rect x="35" y="55" width="10" height="10" fill="none" stroke="#FF6B00" strokeWidth="2" />
        <rect x="55" y="55" width="10" height="10" fill="#FF6B00" />
      </svg>
    ),
    title: "Get 15% OFF on Hospital Admission"
  };

  return (
    <ServiceLocationsPage
      title="Pay for Hospitalization"
      searchPlaceholder="Search a hospital near you"
      locationType="hospital"
      promoProps={hospitalPromo}
    />
  );
};

export default Hospitalization;
