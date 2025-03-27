
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface QRData {
  merchantName?: string;
  merchantEmail?: string;
  paymentType?: string;
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>("0");
  const [qrData, setQrData] = useState<QRData>({
    merchantName: "Business Name Pvt. ltd.",
    merchantEmail: "businessname@okaxis",
    paymentType: "Medicine"
  });

  useEffect(() => {
    // Extract data from location state if available
    if (location.state?.qrData) {
      try {
        const parsedData = typeof location.state.qrData === 'string' 
          ? parseQRData(location.state.qrData)
          : location.state.qrData;
        
        setQrData({
          ...qrData,
          ...parsedData
        });
      } catch (error) {
        console.error("Error parsing QR data:", error);
      }
    }
  }, [location.state]);

  const parseQRData = (qrString: string): QRData => {
    // This is a simple parser - in reality, you'd have more sophisticated parsing based on QR format
    const data: QRData = {};
    
    if (qrString.includes('name=')) {
      const nameMatch = qrString.match(/name=([^&]*)/);
      data.merchantName = nameMatch ? nameMatch[1] : "Business Name Pvt. ltd.";
    }
    
    if (qrString.includes('@')) {
      const emailMatch = qrString.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
      data.merchantEmail = emailMatch ? emailMatch[0] : "businessname@okaxis";
    }
    
    return data;
  };

  const formatCurrency = (value: string): string => {
    // Remove existing commas
    let numericValue = value.replace(/,/g, "");
    
    // Handle decimal part
    const parts = numericValue.split(".");
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? "." + parts[1] : "";
    
    // Add commas to integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return formattedInteger + decimalPart;
  };

  const handleConfirm = () => {
    // In a real app, this would handle the payment processing
    alert(`Payment of ₹${amount} confirmed for ${qrData.merchantName}`);
    navigate("/");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9.]/g, '');
    if (input === '' || input === '.') {
      setAmount('0');
      return;
    }
    
    if (input.includes('.')) {
      const parts = input.split('.');
      if (parts[1].length > 2) return; // Allow only 2 decimal places
    }
    
    setAmount(input);
  };

  return (
    <div className="max-w-md mx-auto bg-[#f8fafc] min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-4 py-4 flex items-center">
          <Link to="/hospitalization" className="mr-4">
            <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">Pay</h1>
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
            <div className="text-blue-500 font-medium">Paying for {qrData.paymentType}</div>
            <div className="text-gray-900 font-semibold text-lg">{qrData.merchantName}</div>
            <div className="text-gray-500 text-sm">{qrData.merchantEmail}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between">
        <div className="w-full text-center">
          <p className="text-gray-500 mb-2">ENTER AMOUNT</p>
          <div className="relative w-full flex justify-center mb-2">
            <div className="flex items-center">
              <span className="text-5xl font-bold mr-2">₹</span>
              <input
                type="text"
                className="text-5xl font-bold bg-transparent border-none outline-none text-center"
                value={formatCurrency(amount)}
                onChange={handleAmountChange}
              />
            </div>
          </div>
          <div className="w-48 h-px bg-gray-300 mx-auto"></div>
        </div>

        <div className="w-full px-4 mb-4">
          <Button 
            onClick={handleConfirm}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-lg font-medium rounded-lg mb-8"
          >
            Confirm to Apply Offer
          </Button>

          <div className="bg-green-50 rounded-xl p-4 flex items-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 16.5L6 12.5L7.4 11.1L10 13.7L16.6 7.1L18 8.5L10 16.5Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="text-green-800 font-medium text-lg">
              Earn Rewards on<br/>Healthcare Payments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
