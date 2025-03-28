
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PaymentProcessing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentData = location.state?.paymentData;

  useEffect(() => {
    // Simulate payment processing time (2 seconds)
    const timer = setTimeout(() => {
      navigate("/payment-success", { state: { paymentData } });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, paymentData]);

  return (
    <div className="max-w-md mx-auto bg-[#f8fafc] min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <Loader2 size={48} className="animate-spin text-green-600 mx-auto mb-4" />
        <h1 className="text-xl font-semibold mb-2">Processing Payment</h1>
        <p className="text-gray-600">Please wait while we confirm your transaction...</p>
      </div>
    </div>
  );
};

export default PaymentProcessing;
