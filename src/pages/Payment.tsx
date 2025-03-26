
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
  const [amount, setAmount] = useState<string>("");
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

  const handleNumberPress = (num: string) => {
    if (amount.includes(".") && amount.split(".")[1].length >= 2) return;
    
    setAmount((prev) => {
      // Don't allow multiple zeros at start
      if (prev === "0" && num === "0") return prev;
      // Replace the initial zero
      if (prev === "0" && num !== ".") return num;
      return prev + num;
    });
  };

  const handleSpecialKey = (key: string) => {
    switch (key) {
      case "backspace":
        setAmount((prev) => prev.slice(0, -1) || "0");
        break;
      case "decimal":
        if (!amount.includes(".")) {
          setAmount((prev) => prev + ".");
        }
        break;
      case "clear":
        setAmount("0");
        break;
    }
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
          <div className="text-5xl font-bold mb-2 relative w-full flex justify-center">
            <span className="absolute left-1/2 -translate-x-[140%]">₹</span>
            <span>{formatCurrency(amount)}</span>
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

      {/* Number Pad */}
      <div className="grid grid-cols-4 gap-1 bg-gray-100 mt-auto">
        <button onClick={() => handleNumberPress("1")} className="py-4 bg-white text-2xl font-medium">
          1
        </button>
        <button onClick={() => handleNumberPress("2")} className="py-4 bg-white text-2xl font-medium">
          2 <span className="text-xs text-gray-400">ABC</span>
        </button>
        <button onClick={() => handleNumberPress("3")} className="py-4 bg-white text-2xl font-medium">
          3 <span className="text-xs text-gray-400">DEF</span>
        </button>
        <button onClick={() => handleSpecialKey("clear")} className="py-4 bg-gray-200 text-2xl font-medium text-gray-500">
          −
        </button>

        <button onClick={() => handleNumberPress("4")} className="py-4 bg-white text-2xl font-medium">
          4 <span className="text-xs text-gray-400">GHI</span>
        </button>
        <button onClick={() => handleNumberPress("5")} className="py-4 bg-white text-2xl font-medium">
          5 <span className="text-xs text-gray-400">JKL</span>
        </button>
        <button onClick={() => handleNumberPress("6")} className="py-4 bg-white text-2xl font-medium">
          6 <span className="text-xs text-gray-400">MNO</span>
        </button>
        <button onClick={() => handleSpecialKey("clear")} className="py-4 bg-gray-200 text-2xl font-medium text-gray-500">
          ⌫
        </button>

        <button onClick={() => handleNumberPress("7")} className="py-4 bg-white text-2xl font-medium">
          7 <span className="text-xs text-gray-400">PQRS</span>
        </button>
        <button onClick={() => handleNumberPress("8")} className="py-4 bg-white text-2xl font-medium">
          8 <span className="text-xs text-gray-400">TUV</span>
        </button>
        <button onClick={() => handleNumberPress("9")} className="py-4 bg-white text-2xl font-medium">
          9 <span className="text-xs text-gray-400">WXYZ</span>
        </button>
        <button onClick={() => handleSpecialKey("backspace")} className="py-4 bg-gray-200 text-2xl font-medium text-gray-500 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z" fill="currentColor"/>
          </svg>
        </button>

        <button onClick={() => handleNumberPress("*")} className="py-4 bg-white text-2xl font-medium">
          * #
        </button>
        <button onClick={() => handleNumberPress("0")} className="py-4 bg-white text-2xl font-medium">
          0 <span className="text-xs text-gray-400">+</span>
        </button>
        <button onClick={() => handleSpecialKey("decimal")} className="py-4 bg-white text-2xl font-medium">
          .
        </button>
        <button className="py-4 bg-gray-200 text-2xl font-medium text-gray-500">
          →
        </button>
      </div>
    </div>
  );
};

export default Payment;
