
import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const bannerData = [
  {
    id: 1,
    title: "Pay for any",
    subtitle: "Healthcare services",
    bgColor: "bg-healthcare-blue-light"
  },
  {
    id: 2,
    title: "Book Doctor",
    subtitle: "Appointments online",
    bgColor: "bg-healthcare-pink-light"
  },
  {
    id: 3,
    title: "Order Medicine",
    subtitle: "Delivered at home",
    bgColor: "bg-green-100"
  }
];

const HealthcareHero: React.FC = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  // Create autoplay plugin with 3-second interval
  const autoplay = React.useMemo(
    () => Autoplay({ delay: 3000, stopOnInteraction: false }),
    []
  );

  // Set up the carousel with autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [autoplay]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrent(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  return (
    <div className="my-4 animate-fade-in">
      <Carousel 
        setApi={setApi}
        opts={{ loop: true, align: 'start' }}
        plugins={[autoplay]}
        ref={emblaRef}
        className="w-full"
      >
        <CarouselContent>
          {bannerData.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className={`relative overflow-hidden ${banner.bgColor} rounded-xl p-5`}>
                {/* Background circles */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/30 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full -ml-8 -mb-8"></div>
                
                {/* Lightning icons */}
                <Zap size={16} className="absolute top-10 right-10 text-healthcare-yellow lightning-icon" />
                <Zap size={14} className="absolute top-16 right-24 text-healthcare-yellow lightning-icon" style={{ animationDelay: '0.5s' }} />
                <Zap size={18} className="absolute top-24 right-14 text-healthcare-yellow lightning-icon" style={{ animationDelay: '1s' }} />
                
                {/* Content */}
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-healthcare-blue-dark text-lg font-semibold mb-1">{banner.title}</h3>
                    <p className="text-healthcare-blue-dark font-semibold text-lg">{banner.subtitle}</p>
                  </div>
                  <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center shadow-sm">
                    <div className="w-10 h-10 bg-healthcare-yellow rounded-full flex items-center justify-center">
                      <span className="text-xl font-semibold text-yellow-800">₹</span>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      {/* Dots indicator */}
      <div className="mt-4 flex justify-center">
        {bannerData.map((_, index) => (
          <span
            key={index}
            className={`dot-indicator ${index === current ? 'active' : 'inactive'}`}
            onClick={() => api?.scrollTo(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HealthcareHero;
