import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from './components/Dashboard';
import About from './components/About';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                ProgressTracker <span className="text-[#b066ff] text-4xl font-['Poppins',sans-serif]">AKALIBRE</span>
              </h1>
              <nav>
                <Link to="/" className="text-gray-600 hover:text-gray-900 mr-4">Home</Link>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              </nav>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
      <Toaster />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;