
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { LabTestPackage } from '../services/labService';
import { Link } from 'react-router-dom';

interface LabPackageCardProps {
  package: LabTestPackage;
}

const LabPackageCard: React.FC<LabPackageCardProps> = ({ package: labPackage }) => {
  return (
    <Card className="overflow-hidden mb-4 border-gray-200">
      {labPackage.isPopular && (
        <div className="bg-yellow-500 text-white text-xs px-3 py-1 absolute right-0 top-0 rounded-bl-md flex items-center">
          <Star size={12} className="mr-1" /> Popular
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800">{labPackage.packageName}</CardTitle>
        {labPackage.packageDescription && (
          <CardDescription className="text-sm text-gray-600">
            {labPackage.packageDescription}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-gray-500 text-sm">Includes</span>
            <p className="font-medium">{labPackage.testsCount} Tests</p>
          </div>
          <div className="text-right">
            <div className="flex items-center">
              <span className="text-gray-500 line-through text-sm mr-2">₹{labPackage.packagePrice}</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                {labPackage.discountPercentage}% OFF
              </span>
            </div>
            <p className="font-bold text-lg">₹{labPackage.discountedPrice}</p>
          </div>
        </div>
        
        {labPackage.highlights && labPackage.highlights.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Highlights</h4>
            <div className="space-y-1">
              {labPackage.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start">
                  <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Link to="/payment" className="w-full">
          <Button className="w-full bg-pink-600 hover:bg-pink-700">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LabPackageCard;
