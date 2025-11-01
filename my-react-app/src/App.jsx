import { Toaster } from "./component/ui/toaster.jsx";
import { Toaster as Sonner } from "./component/ui/sonner.jsx";
import { TooltipProvider } from "./component/ui/tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/Login.jsx";
import NGODashboard from "./pages/NGODashboard.jsx";
import DonorDashboard from "./pages/DonorDashboard.jsx";
import Volunteer from "./pages/Volunteer.jsx";
import Index from "./pages/Index.jsx";
import Navbar from "./component/layout/Navbar.jsx";
import Footer from "./component/layout/Footer.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import FAQ from "./pages/FAQ.jsx";
import "./index.css";
 // fixed path



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/ngo-dashboard" element={<NGODashboard/>} />
                <Route path="/donor-dashboard" element={<DonorDashboard/>} />
                <Route path="/volunteer" element={<Volunteer/>} />
                <Route path="/leaderboard" element={<Leaderboard/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/faq" element={<FAQ/>} />
                {/* Add more routes here */}
              </Routes>
            </main>
            <Footer/>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
