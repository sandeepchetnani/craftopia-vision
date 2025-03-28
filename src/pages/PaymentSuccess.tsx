
import React from "react";
import { X, Check } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface PaymentSuccessProps {}

const PaymentSuccess: React.FC<PaymentSuccessProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentData = location.state?.paymentData || {
    merchantName: "Business Name Pvt Ltd.",
    merchantEmail: "businessname@okaxis",
    paymentAmount: "2,400",
    transactionId: "234567890123",
    paymentMode: "UPI"
  };

  const currentDate = new Date();
  const formattedDate = format(currentDate, "hh:mm a 'on' dd-MMM-yyyy");

  const handleClose = () => {
    navigate("/");
  };

  const handleUploadInvoice = () => {
    // This would handle the invoice upload functionality
    console.log("Upload invoice clicked");
  };

  const handleUploadPrescription = () => {
    // This would handle the prescription upload functionality
    console.log("Upload prescription clicked");
  };

  return (
    <div className="max-w-md mx-auto bg-[#f8fafc] min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-4 py-4 flex justify-end">
          <button onClick={handleClose} className="p-1">
            <X size={24} className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check size={30} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold text-green-700 mb-1">Payment Successful</h1>
          <p className="text-gray-500">{formattedDate}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-lg font-semibold">{paymentData.merchantName}</h2>
              <p className="text-gray-500 text-sm">{paymentData.merchantEmail}</p>
            </div>
            <div className="text-xl font-bold">₹{paymentData.paymentAmount}</div>
          </div>
          <div className="h-px bg-gray-200 my-3"></div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Transaction ID</span>
            <span className="font-medium">{paymentData.transactionId}</span>
          </div>
          <div className="h-px bg-gray-200 my-3"></div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Payment Mode</span>
            <span className="font-medium">{paymentData.paymentMode}</span>
          </div>
        </div>

        <div className="mt-6 mb-8">
          <h2 className="text-center text-xl font-bold mb-3">EARN BUDDY COINS!</h2>
          <p className="text-center mb-4">Upload Invoice & Prescription</p>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <img
              src="/lovable-uploads/362c566c-f9ec-47d0-980a-4e43b1d7470f.png"
              alt="Prescription"
              className="w-full max-w-xs mx-auto"
            />
          </div>
          
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 py-6 mb-4"
            onClick={handleUploadInvoice}
          >
            Upload Invoice
          </Button>
          
          <div className="text-center">
            <p className="text-gray-700 mb-2">No Invoice?</p>
            <Link 
              to="#" 
              className="text-blue-600 font-medium" 
              onClick={handleUploadPrescription}
            >
              Upload Prescription
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
