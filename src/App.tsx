
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SelectService from "./pages/SelectService";
import Pharmacy from "./pages/Pharmacy";
import Hospitalization from "./pages/Hospitalization";
import Consultation from "./pages/Consultation";
import LabTest from "./pages/LabTest";
import Scanner from "./pages/Scanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/select-service" element={<SelectService />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/hospitalization" element={<Hospitalization />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/lab-test" element={<LabTest />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
