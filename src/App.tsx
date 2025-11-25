import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Tours from "./pages/Tours";
import GorillaTrekking from "./pages/tours/GorillaTrekking";
import GoldenMonkey from "./pages/tours/GoldenMonkey";
import Chimpanzee from "./pages/tours/Chimpanzee";
import Colobus from "./pages/tours/Colobus";
import CanopyWalkway from "./pages/tours/CanopyWalkway";
import DianFosseyHike from "./pages/tours/DianFosseyHike";
import AkageraSafari from "./pages/tours/AkageraSafari";
import KigaliTour from "./pages/tours/KigaliTour";
import Destinations from "./pages/Destinations";
import Itineraries from "./pages/Itineraries";
import Services from "./pages/Services";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import BookingTerms from "./pages/BookingTerms";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CookieConsent from "./components/CookieConsent";
import TravelChatbot from "./components/TravelChatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/gorilla-trekking" element={<GorillaTrekking />} />
              <Route path="/tours/golden-monkey" element={<GoldenMonkey />} />
              <Route path="/tours/chimpanzee" element={<Chimpanzee />} />
              <Route path="/tours/colobus-monkey" element={<Colobus />} />
              <Route path="/tours/canopy-walkway" element={<CanopyWalkway />} />
              <Route path="/tours/dian-fossey-hike" element={<DianFosseyHike />} />
              <Route path="/tours/akagera-safari" element={<AkageraSafari />} />
              <Route path="/tours/kigali-city-tour" element={<KigaliTour />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/itineraries" element={<Itineraries />} />
              <Route path="/services" element={<Services />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
              <Route path="/booking-terms" element={<BookingTerms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
          <CookieConsent />
          <TravelChatbot />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
