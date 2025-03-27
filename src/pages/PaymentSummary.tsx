
import React, { useState } from "react";
import { ArrowLeft, ChevronRight, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface PaymentSummaryProps {}

interface SummaryData {
  merchantName?: string;
  merchantEmail?: string;
  paymentType?: string;
  amount?: string;
}

interface Offer {
  id: string;
  provider: string;
  code: string;
  description: string;
  discount: number;
  type: "best" | "other" | "bank" | "not-applicable";
  condition?: string;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = () => {
  const location = useLocation();
  const { toast } = useToast();
  const summaryData: SummaryData = location.state?.summaryData || {
    merchantName: "Business Name Pvt. ltd.",
    merchantEmail: "businessname@okaxis",
    paymentType: "Medicine",
    amount: "2400"
  };

  const [showOffers, setShowOffers] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const formattedAmount = summaryData.amount
    ? summaryData.amount.replace(/,/g, "")
    : "0";
  
  // Format as Indian currency with commas
  const formatIndianCurrency = (amount: string) => {
    const number = parseFloat(amount);
    return new Intl.NumberFormat('en-IN').format(number);
  };

  const offers: Offer[] = [
    {
      id: "1",
      provider: "cult.fit",
      code: "FLASH20",
      description: "Get Cult.fit voucher worth ₹500 on this payment",
      discount: 500,
      type: "best"
    },
    {
      id: "2",
      provider: "cult.fit",
      code: "FLASH10",
      description: "Get Cult.fit voucher worth ₹500 on this payment",
      discount: 300,
      type: "other"
    },
    {
      id: "3",
      provider: "cult.fit",
      code: "FLASH5",
      description: "Get Cult.fit voucher worth ₹500 on this payment",
      discount: 200,
      type: "other"
    },
    {
      id: "4",
      provider: "LAZYPAY",
      code: "FLASH10",
      description: "Get cash-back worth ₹500 on this payment",
      discount: 500,
      type: "bank"
    },
    {
      id: "5",
      provider: "cult.fit",
      code: "FLASH10",
      description: "Get Cult.fit voucher worth ₹500 on this payment",
      discount: 500,
      type: "not-applicable",
      condition: "Add ₹500 more to avail this offer"
    }
  ];

  // Group offers by type
  const bestOffers = offers.filter(offer => offer.type === "best");
  const otherOffers = offers.filter(offer => offer.type === "other");
  const bankOffers = offers.filter(offer => offer.type === "bank");
  const notApplicableOffers = offers.filter(offer => offer.type === "not-applicable");

  const handleApplyCoupon = () => {
    setShowOffers(true);
  };

  const handleBackToSummary = () => {
    setShowOffers(false);
  };

  const handleApplyOffer = (offer: Offer) => {
    if (offer.type !== "not-applicable") {
      setSelectedOffer(offer);
      setShowOffers(false);
      setShowSuccessDialog(true);
      
      // Close dialog after 2 seconds
      setTimeout(() => {
        setShowSuccessDialog(false);
        toast({
          title: "Offer Applied",
          description: `${offer.code} has been applied to your purchase`,
        });
      }, 2000);
    }
  };

  const handleSeeAllOffers = () => {
    setShowOffers(true);
  };

  const getDiscountedAmount = () => {
    if (!selectedOffer) return formattedAmount;
    const amount = parseFloat(formattedAmount);
    return (amount - selectedOffer.discount).toString();
  };

  if (showOffers) {
    return (
      <div className="max-w-md mx-auto bg-[#f8fafc] min-h-screen flex flex-col">
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="px-4 py-4 flex items-center">
            <button onClick={handleBackToSummary} className="mr-4">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">All Offers</h1>
              <p className="text-sm text-gray-600">Amount: ₹{formatIndianCurrency(formattedAmount)}</p>
            </div>
          </div>
          <div className="h-px bg-gray-200"></div>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg mb-6 flex overflow-hidden">
            <Input 
              className="flex-1 border-none"
              placeholder="Enter Code" 
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button 
              className="rounded-none bg-white hover:bg-white text-blue-500 font-medium"
              onClick={() => {}}
            >
              Apply
            </Button>
          </div>

          {bestOffers.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-gray-800 mb-3">Best For You!</h2>
              {bestOffers.map(offer => (
                <OfferCard key={offer.id} offer={offer} onApply={handleApplyOffer} />
              ))}
            </>
          )}

          {otherOffers.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-gray-800 mb-3 mt-6">Other Offers</h2>
              {otherOffers.map(offer => (
                <OfferCard key={offer.id} offer={offer} onApply={handleApplyOffer} />
              ))}
            </>
          )}

          {bankOffers.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-gray-800 mb-3 mt-6">Bank Offers</h2>
              {bankOffers.map(offer => (
                <OfferCard key={offer.id} offer={offer} onApply={handleApplyOffer} />
              ))}
            </>
          )}

          {notApplicableOffers.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-gray-800 mb-3 mt-6">Not Applicable</h2>
              {notApplicableOffers.map(offer => (
                <OfferCard key={offer.id} offer={offer} onApply={handleApplyOffer} isDisabled />
              ))}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-[#f8fafc] min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-4 py-4 flex items-center">
          <Link to="/payment" className="mr-4">
            <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">Payment Summary</h1>
        </div>
        <div className="h-px bg-gray-200"></div>
      </div>

      <div className="p-4 mb-4">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mr-4">
            <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M12 13H14M12 17H14M18 13H20M18 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <div className="text-blue-500 font-medium">Paying for {summaryData.paymentType}</div>
            <div className="text-gray-900 font-semibold text-lg">{summaryData.merchantName}</div>
            <div className="text-gray-500 text-sm">{summaryData.merchantEmail}</div>
          </div>
        </div>
      </div>

      {selectedOffer ? (
        <div className="px-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800">Offer Applied</h2>
            <Button 
              variant="ghost" 
              className="text-blue-500 font-medium p-0 h-auto"
              onClick={handleSeeAllOffers}
            >
              See All
            </Button>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mr-4">
                  {selectedOffer.provider === "LAZYPAY" ? (
                    <div className="font-bold text-xs uppercase">
                      <span className="text-red-600">LP</span>
                    </div>
                  ) : (
                    <svg className="w-7 h-7 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 14L15 8M9.5 8.5H9.51M14.5 13.5H14.51M19 21L17.5 19.5M19 21L21 19.5M19 21V16.5M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 12.6477 21.9398 13.2815 21.8245 13.8973M5 7.8335C3.75566 9.15082 3 10.9085 3 12.8571C3 16.7033 5.60771 19.8105 9.22572 20.7622" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">{selectedOffer.code} applied</div>
                  <div className="text-gray-500 text-xs">{selectedOffer.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Offers Available</h2>
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm" onClick={handleApplyCoupon}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 14L15 8M9.5 8.5H9.51M14.5 13.5H14.51M19 21L17.5 19.5M19 21L21 19.5M19 21V16.5M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 12.6477 21.9398 13.2815 21.8245 13.8973M5 7.8335C3.75566 9.15082 3 10.9085 3 12.8571C3 16.7033 5.60771 19.8105 9.22572 20.7622" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-900 font-semibold">Apply Coupon</div>
                  <div className="text-gray-500 text-sm">Earn exciting rewards</div>
                </div>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </div>
        </div>
      )}

      <div className="px-4 flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Bill Breakdown</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total MRP</span>
            <span className="font-medium">₹{formatIndianCurrency(formattedAmount)}</span>
          </div>
          {selectedOffer && (
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Reward Voucher [{selectedOffer.code}]</span>
              <span className="font-medium text-green-600">-₹{selectedOffer.discount}</span>
            </div>
          )}
          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total Amount</span>
            <span className="font-medium">₹{formatIndianCurrency(formattedAmount)}</span>
          </div>
          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-semibold">Payable Amount</span>
            <span className="font-semibold">₹{selectedOffer ? formatIndianCurrency(getDiscountedAmount()) : formatIndianCurrency(formattedAmount)}</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mt-8">
          Payment related queries or concerns? Please check your <a href="#" className="text-blue-500">covered benefits here</a>, you can also <a href="#" className="text-blue-500">reach us here</a> for any queries
        </div>
      </div>

      <div className="mt-auto px-4 py-4 bg-white border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-800 font-bold">Payable Amount</span>
          <span className="text-gray-800 font-bold text-xl">₹{selectedOffer ? formatIndianCurrency(getDiscountedAmount()) : formatIndianCurrency(formattedAmount)}</span>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium">
          Proceed to Pay
        </button>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md p-0 rounded-xl">
          <div className="relative">
            <button 
              onClick={() => setShowSuccessDialog(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <div className="pt-10 pb-8 px-6 text-center">
              <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-pink-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 14L15 8M9.5 8.5H9.51M14.5 13.5H14.51M19 21L17.5 19.5M19 21L21 19.5M19 21V16.5M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 12.6477 21.9398 13.2815 21.8245 13.8973M5 7.8335C3.75566 9.15082 3 10.9085 3 12.8571C3 16.7033 5.60771 19.8105 9.22572 20.7622" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <h3 className="text-2xl font-semibold mb-2">
                '{selectedOffer?.code}' applied
              </h3>
              
              <p className="text-gray-600 text-lg">
                Yay! You will earn a Cult.fit voucher worth ₹{selectedOffer?.discount} on this payment.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface OfferCardProps {
  offer: Offer;
  onApply: (offer: Offer) => void;
  isDisabled?: boolean;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onApply, isDisabled = false }) => {
  const handleApply = () => {
    if (!isDisabled) {
      onApply(offer);
    }
  };

  return (
    <div className={`bg-white rounded-lg p-4 mb-4 ${isDisabled ? 'bg-gray-100' : ''}`}>
      <div className="flex items-center mb-2">
        {offer.provider === "cult.fit" ? (
          <div className="font-bold flex items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M12 4L14.5 9.5L21 10.5L16.5 14.5L18 21L12 18L6 21L7.5 14.5L3 10.5L9.5 9.5L12 4Z" fill="currentColor"/>
            </svg>
            cult.fit
          </div>
        ) : (
          <div className="font-bold flex items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {offer.provider}
          </div>
        )}
      </div>
      <p className="text-gray-700 mb-1">{offer.description}</p>
      {offer.condition && <p className="text-gray-400 text-sm">{offer.condition}</p>}
      <div className="flex justify-between items-center mt-2">
        <span className="bg-gray-100 px-3 py-1 rounded text-gray-800 font-medium">{offer.code}</span>
        <button 
          onClick={handleApply}
          className={`text-blue-500 font-medium ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isDisabled}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default PaymentSummary;
