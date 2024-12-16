import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import StorePage from "./pages/StorePage";
import OrdersPage from "./pages/OrdersPage";
import RedeemPage from "./pages/RedeemPage";
import DownloadPage from "./pages/DownloadPage";
import GuidesPage from "./pages/GuidesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/redeem" element={<RedeemPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/guides" element={<GuidesPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;