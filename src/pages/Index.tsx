
import React from 'react';
import HealthcareHeader from '@/components/HealthcareHeader';
import MBPayBadge from '@/components/MBPayBadge';
import HealthcareHero from '@/components/HealthcareHero';
import SearchBar from '@/components/SearchBar';
import ServiceCategories from '@/components/ServiceCategories';
import HowItWorks from '@/components/HowItWorks';
import PromoCard from '@/components/PromoCard';
import FAQ from '@/components/FAQ';

const Index = () => {
  return (
    <div className="max-w-md mx-auto bg-[#f8fafc] min-h-screen overflow-x-hidden pb-12">
      <div className="flex flex-col">
        <HealthcareHeader />
        
        <div className="px-4">
          <MBPayBadge />
          <HealthcareHero />
          <SearchBar />
          <ServiceCategories />
          <HowItWorks />
          <PromoCard />
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default Index;
