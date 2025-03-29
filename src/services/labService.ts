
interface LabTestRequestBody {
  city: string;
  pincode: string;
  ignoreLoader: boolean;
  category: string;
  loadSubCategories: boolean;
  contractIds: number[];
}

export interface LabTestPackage {
  packageId: number;
  packageName: string;
  packageDescription?: string;
  categoryName: string;
  packagePrice: number;
  discountedPrice: number;
  discountPercentage: number;
  testsCount: number;
  isPopular?: boolean;
  highlights?: string[];
}

export interface LabTestCategory {
  categoryId: number;
  categoryName: string;
  packages: LabTestPackage[];
}

export interface LabTestResponse {
  categories: LabTestCategory[];
  totalPackages: number;
}

// Mock data based on the API response structure
const mockLabTestData: LabTestResponse = {
  categories: [
    {
      categoryId: 1,
      categoryName: "Health Checkup",
      packages: [
        {
          packageId: 101,
          packageName: "Basic Health Checkup",
          packageDescription: "Basic tests for overall health assessment",
          categoryName: "Health Checkup",
          packagePrice: 3999,
          discountedPrice: 2499,
          discountPercentage: 38,
          testsCount: 35,
          isPopular: true,
          highlights: ["Comprehensive Blood Count", "Liver Function Test", "Kidney Function Test"]
        },
        {
          packageId: 102,
          packageName: "Advance Health Checkup",
          packageDescription: "Comprehensive tests for detailed health assessment",
          categoryName: "Health Checkup",
          packagePrice: 5999,
          discountedPrice: 3999,
          discountPercentage: 33,
          testsCount: 55,
          isPopular: false,
          highlights: ["Complete Blood Count", "Lipid Profile", "Thyroid Profile", "Vitamin Deficiency Tests"]
        }
      ]
    },
    {
      categoryId: 2,
      categoryName: "Women's Health",
      packages: [
        {
          packageId: 201,
          packageName: "Women's Health Checkup",
          packageDescription: "Essential tests for women's health",
          categoryName: "Women's Health",
          packagePrice: 4499,
          discountedPrice: 2999,
          discountPercentage: 33,
          testsCount: 40,
          isPopular: true,
          highlights: ["Female Hormone Tests", "Complete Blood Count", "Thyroid Profile"]
        }
      ]
    },
    {
      categoryId: 3,
      categoryName: "Diabetes",
      packages: [
        {
          packageId: 301,
          packageName: "Diabetes Screening",
          packageDescription: "Tests to detect and monitor diabetes",
          categoryName: "Diabetes",
          packagePrice: 2999,
          discountedPrice: 1999,
          discountPercentage: 33,
          testsCount: 25,
          isPopular: false,
          highlights: ["Fasting Blood Sugar", "HbA1c", "Post Prandial Blood Sugar"]
        }
      ]
    }
  ],
  totalPackages: 4
};

export const fetchLabTestPackages = async (): Promise<LabTestResponse> => {
  // In a real application, this would be an API call
  // const response = await fetch('https://www.medibuddy.in/WAPI/Labs/v2/PackagesListing', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'accesstoken': 'your-access-token',
  //     'city': 'Bengaluru',
  //     'pincode': '560029'
  //   },
  //   body: JSON.stringify({
  //     city: 'Bengaluru',
  //     pincode: '560029',
  //     ignoreLoader: true,
  //     category: 'Default',
  //     loadSubCategories: true,
  //     contractIds: [10386, 10389]
  //   })
  // });
  // return await response.json();

  // For now, use mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLabTestData);
    }, 500);
  });
};
