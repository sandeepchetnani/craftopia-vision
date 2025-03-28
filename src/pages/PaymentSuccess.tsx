
import React, { useState } from "react";
import { X, Check, Upload, FileImage } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface PaymentSuccessProps {}

const PaymentSuccess: React.FC<PaymentSuccessProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
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
    // Create a file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.accept = "image/*,.pdf";
    
    // Handle file selection
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const newFiles = Array.from(target.files);
        setUploadedFiles(prev => [...prev, ...newFiles]);
        
        toast({
          title: "Files Uploaded Successfully",
          description: `${newFiles.length} file(s) uploaded`,
        });
      }
    };
    
    // Trigger click on the file input
    fileInput.click();
  };

  const handleUploadPrescription = () => {
    // Create a file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.accept = "image/*,.pdf";
    
    // Handle file selection
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const newFiles = Array.from(target.files);
        setUploadedFiles(prev => [...prev, ...newFiles]);
        
        toast({
          title: "Files Uploaded Successfully",
          description: `${newFiles.length} file(s) uploaded`,
        });
      }
    };
    
    // Trigger click on the file input
    fileInput.click();
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
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
          
          {uploadedFiles.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="font-medium mb-3">Uploaded Files ({uploadedFiles.length})</h3>
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center gap-2">
                      <FileImage size={20} className="text-blue-600" />
                      <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 py-6 mb-4 flex items-center justify-center gap-2"
            onClick={handleUploadInvoice}
          >
            <Upload size={20} />
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
