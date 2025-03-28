
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const promoData = [
  {
    id: 1,
    brand: "makeO",
    title: "FLAT ₹12,000 OFF",
    description: "on Clear Aligners",
    subtitle: "Backed by 100+ Orthodontists!",
    color: "text-red-500",
    borderColor: "border-red-500",
    buttonText: "BOOK A SCAN",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRlbnRpc3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    brand: "Apollo",
    title: "GET 20% CASHBACK",
    description: "on Health Checkups",
    subtitle: "Use code HEALTH20 at checkout!",
    color: "text-blue-500",
    borderColor: "border-blue-500",
    buttonText: "BOOK NOW",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    brand: "Medlife",
    title: "BUY 1 GET 1 FREE",
    description: "on all Lab Tests",
    subtitle: "Limited time offer. Book today!",
    color: "text-green-500",
    borderColor: "border-green-500",
    buttonText: "BOOK TEST",
    image: "https://images.unsplash.com/photo-1579154341098-e4e158cc5801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxhYiUyMHRlc3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  }
];

const PromoCard: React.FC = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  // Create autoplay plugin with 4-second interval
  const autoplay = React.useMemo(
    () => Autoplay({ delay: 4000, stopOnInteraction: false }),
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
    <div className="my-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <Carousel 
        setApi={setApi}
        opts={{ loop: true, align: 'start' }}
        plugins={[autoplay]}
        ref={emblaRef}
        className="w-full"
      >
        <CarouselContent>
          {promoData.map((promo) => (
            <CarouselItem key={promo.id}>
              <div className={`bg-${promo.id === 1 ? 'healthcare-pink-light' : promo.id === 2 ? 'blue-50' : 'green-50'} rounded-xl p-4 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10"></div>
                
                <div className="flex">
                  <div className="flex-1 pr-2">
                    <div className="flex items-center mb-1">
                      <div className="w-5 h-5 mr-1">
                        <div className="w-4 h-4 flex items-center justify-center relative">
                          <div className={`absolute w-full h-full border-[1.5px] ${promo.borderColor} transform rotate-45`}></div>
                          <div className={`absolute w-full h-full border-[1.5px] ${promo.borderColor}`}></div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-semibold bg-white px-2 py-0.5 rounded ${promo.color}`}>{promo.brand}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{promo.title}</h3>
                    <p className="text-sm font-medium text-gray-700 mb-1">{promo.description}</p>
                    <p className="text-xs text-gray-600 mb-3">{promo.subtitle}</p>
                    
                    <button className={`flex items-center text-xs ${promo.color} font-semibold`}>
                      {promo.buttonText} <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                  
                  <div className="w-24 h-24">
                    <img 
                      src={promo.image} 
                      alt="Promo image"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots indicator */}
      <div className="mt-2 flex justify-center">
        {promoData.map((_, index) => (
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

export default PromoCard;
