import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminSidebar } from "@/components/AdminSidebar";
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
import SeasonalComparison from "./pages/tours/SeasonalComparison";
import LHoests from "./pages/tours/LHoests";
import OwlFaced from "./pages/tours/OwlFaced";
import Destinations from "./pages/Destinations";
import Itineraries from "./pages/Itineraries";
import Services from "./pages/Services";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import BookingTerms from "./pages/BookingTerms";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBookings from "./pages/admin/Bookings";
import AdminAvailability from "./pages/admin/Availability";
import AdminUsers from "./pages/admin/Users";
import AdminBlogPosts from "./pages/admin/BlogPosts";
import TourVideos from "./pages/admin/TourVideos";
import FAQManagement from "./pages/admin/FAQManagement";
import Testimonials from "./pages/admin/Testimonials";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import VideoGallery from "./pages/VideoGallery";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CookieConsent from "./components/CookieConsent";
import TravelChatbot from "./components/TravelChatbot";

const queryClient = new QueryClient();

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-12 flex items-center border-b">
          <SidebarTrigger className="ml-2" />
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Auth Route */}
            <Route path="/auth" element={<Auth />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <AdminBookings />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/availability"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <AdminAvailability />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <AdminUsers />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blog-posts"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <AdminBlogPosts />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tour-videos"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <TourVideos />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/faq"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <FAQManagement />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/testimonials"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <Testimonials />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* Public Routes */}
            <Route
              path="/*"
              element={
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
                      <Route path="/tours/seasonal-comparison" element={<SeasonalComparison />} />
                      <Route path="/tours/lhoests-monkey" element={<LHoests />} />
                      <Route path="/tours/owl-faced-monkey" element={<OwlFaced />} />
                      <Route path="/destinations" element={<Destinations />} />
                      <Route path="/itineraries" element={<Itineraries />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/terms-and-conditions" element={<TermsConditions />} />
                      <Route path="/booking-terms" element={<BookingTerms />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/videos" element={<VideoGallery />} />
          <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <WhatsAppFloat />
                  <CookieConsent />
                  <TravelChatbot />
                </div>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
