
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouteTransition } from "@/components/ui/animations";
import { Layout } from "@/components/layout/Layout";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Metrics from "./pages/Metrics";
import MetricDetail from "./pages/MetricDetail";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={
                <RouteTransition>
                  <Index />
                </RouteTransition>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <RouteTransition>
                  <Dashboard />
                </RouteTransition>
              } 
            />
            <Route 
              path="/metrics" 
              element={
                <RouteTransition>
                  <Metrics />
                </RouteTransition>
              } 
            />
            <Route 
              path="/metrics/:id" 
              element={
                <RouteTransition>
                  <MetricDetail />
                </RouteTransition>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <RouteTransition>
                  <Profile />
                </RouteTransition>
              } 
            />
            <Route 
              path="/login" 
              element={
                <RouteTransition>
                  <Login />
                </RouteTransition>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <RouteTransition>
                  <SignUp />
                </RouteTransition>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
