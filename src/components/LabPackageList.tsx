
import React, { useState } from 'react';
import { LabTestCategory } from '../services/labService';
import LabPackageCard from './LabPackageCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LabPackageListProps {
  categories: LabTestCategory[];
}

const LabPackageList: React.FC<LabPackageListProps> = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories.length > 0 ? categories[0].categoryId.toString() : ""
  );

  return (
    <div className="mt-2">
      <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="bg-gray-100 p-1 w-max min-w-full">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.categoryId} 
                value={category.categoryId.toString()}
                className="px-3 py-1 text-xs whitespace-nowrap"
              >
                {category.categoryName}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent key={category.categoryId} value={category.categoryId.toString()} className="mt-2">
            <div className="space-y-3">
              {category.packages.map((pkg) => (
                <LabPackageCard key={pkg.packageId} package={pkg} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LabPackageList;
