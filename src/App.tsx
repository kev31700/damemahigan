
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";
import Index from "@/pages/Index";
import Practices from "@/pages/Practices";
import PracticeDetail from "@/pages/PracticeDetail";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import Gallery from "@/pages/Gallery";
import Testimonials from "@/pages/Testimonials";
import Limits from "@/pages/Limits";
import NotFound from "@/pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Navigation />
          <main className="pt-16 pb-12">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/practices" element={<Practices />} />
              <Route path="/practices/:id" element={<PracticeDetail />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/limits" element={<Limits />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
