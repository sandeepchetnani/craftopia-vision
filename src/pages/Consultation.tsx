
import React from 'react';
import ServiceLocationsPage from '../components/ServiceLocationsPage';

const Consultation = () => {
  const clinicPromo = {
    bgColor: "bg-purple-50",
    iconSvg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#6B46C1" strokeWidth="2" />
        <path d="M30 50 L45 65 L70 35" stroke="#6B46C1" strokeWidth="3" fill="none" />
      </svg>
    ),
    title: "Book Specialist Consultation at 20% OFF"
  };

  return (
    <ServiceLocationsPage
      title="Pay for Consultation"
      searchPlaceholder="Search a clinic near you"
      locationType="clinic"
      promoProps={clinicPromo}
    />
  );
};

export default Consultation;
