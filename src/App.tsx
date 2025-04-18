
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import Practices from "@/pages/Practices";
import PracticeDetail from "@/pages/PracticeDetail";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import Gallery from "@/pages/Gallery";
import Testimonials from "@/pages/Testimonials";
import Limits from "@/pages/Limits";
import NotFound from "@/pages/NotFound";
import ContactForms from "@/pages/Admin/ContactForms";
import ContactFormDetail from "@/pages/Admin/ContactFormDetail";
import { AdminProvider } from "@/contexts/AdminContext";
import { initializeFirebase } from "./lib/firebase";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const App = () => {
  useEffect(() => {
    // Initialize Firebase data if needed
    initializeFirebase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
            <Navigation />
            <main className="pt-16 pb-12 flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/pratiques" element={<Practices />} />
                <Route path="/pratiques/:id" element={<PracticeDetail />} />
                <Route path="/tarifs" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/galerie" element={<Gallery />} />
                <Route path="/temoignages" element={<Testimonials />} />
                <Route path="/limites" element={<Limits />} />
                <Route path="/admin/contact-forms" element={<ContactForms />} />
                <Route path="/admin/contact-forms/:id" element={<ContactFormDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      </AdminProvider>
    </QueryClientProvider>
  );
};

export default App;
