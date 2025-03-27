
import React from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface PaymentSummaryProps {}

interface SummaryData {
  merchantName?: string;
  merchantEmail?: string;
  paymentType?: string;
  amount?: string;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = () => {
  const location = useLocation();
  const summaryData: SummaryData = location.state?.summaryData || {
    merchantName: "Business Name Pvt. ltd.",
    merchantEmail: "businessname@okaxis",
    paymentType: "Medicine",
    amount: "2400"
  };

  const formattedAmount = summaryData.amount
    ? summaryData.amount.replace(/,/g, "")
    : "0";
  
  // Format as Indian currency with commas
  const formatIndianCurrency = (amount: string) => {
    const number = parseFloat(amount);
    return new Intl.NumberFormat('en-IN').format(number);
  };

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

      <div className="px-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Offers Available</h2>
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
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

      <div className="px-4 flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Bill Breakdown</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total MRP</span>
            <span className="font-medium">₹{formatIndianCurrency(formattedAmount)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Reward Voucher [FLASH 20]</span>
            <span className="font-medium text-green-600">₹500</span>
          </div>
          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total Amount</span>
            <span className="font-medium">₹{formatIndianCurrency(formattedAmount)}</span>
          </div>
          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-semibold">Payable Amount</span>
            <span className="font-semibold">₹{formatIndianCurrency(formattedAmount)}</span>
          </div>
        </div>
      </div>

      <div className="mt-auto px-4 py-4 bg-white border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-800 font-bold">Payable Amount</span>
          <span className="text-gray-800 font-bold text-xl">₹{formatIndianCurrency(formattedAmount)}</span>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentSummary;
