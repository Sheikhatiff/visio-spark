import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import Dashboard from "../pages/pages/Dashboard";
import SignInPage from "../pages/pages/SignInPage";
import SignUpPage from "../pages/pages/SignUpPage";
import AuthLanding from "../pages/pages/AuthLanding";
import HackathonLanding from "../pages/pages/Landingpage";
import FeaturesPage from "../pages/pages/Howitworks";
import Features from "../pages/pages/Features";
import Contact from "../pages/pages/Contact";
import AdminDashboard from "../pages/pages/AdminDashboard";

// Component to handle dashboard selection
const DashboardSelector = () => {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  console.log('👑 DashboardSelector - User:', user);
  console.log('👑 User email:', user?.primaryEmailAddress?.emailAddress);

  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'ininsico@gmail.com';
  
  console.log('👑 Is admin:', isAdmin);

  return isAdmin ? <AdminDashboard /> : <Dashboard />;
};

// Wrapper for SignInPage that redirects if already signed in
const SignInPageWrapper = () => {
  const { isSignedIn, isLoaded } = useUser();
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
      </div>
    );
  }
  
  if (isSignedIn) {
    console.log('✅ User already signed in, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  return <SignInPage />;
};

// Wrapper for SignUpPage that redirects if already signed in  
const SignUpPageWrapper = () => {
  const { isSignedIn, isLoaded } = useUser();
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
      </div>
    );
  }
  
  if (isSignedIn) {
    console.log('✅ User already signed in, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  return <SignUpPage />;
};

// Protected admin route component
const AdminDashboardWithProtection = () => {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking admin access...</p>
        </div>
      </div>
    );
  }

  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'ininsico@gmail.com';

  if (!isAdmin) {
    console.log('🚫 Admin access denied, redirecting to regular dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  return <AdminDashboard />;
};

// FIXED: Add this component to handle the root route properly
const RootRouteHandler = () => {
  const { isSignedIn, isLoaded } = useUser();
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
      </div>
    );
  }
  
  // If user is signed in, redirect to dashboard from root
  if (isSignedIn) {
    console.log('🏠 Root route - User signed in, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  // If not signed in, show landing page
  return <HackathonLanding />;
};

function App() {
  return (
    <Routes>
      {/* Root route with proper signed-in check */}
      <Route path='/' element={<RootRouteHandler />} />
      
      {/* Public routes */}
      <Route path='/howitworks' element={<FeaturesPage />} />
      <Route path='/features' element={<Features />} />
      <Route path='/contact' element={<Contact />} />
      
      {/* Auth routes with redirect wrappers */}
      <Route path="/sign-in/*" element={<SignInPageWrapper />} />
      <Route path="/sign-up/*" element={<SignUpPageWrapper />} />

      {/* Protected routes - THESE MUST COME AFTER PUBLIC ROUTES */}
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <DashboardSelector />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      {/* Admin dashboard with additional protection */}
      <Route
        path="/admindashboard"
        element={
          <>
            <SignedIn>
              <AdminDashboardWithProtection />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      {/* Fallback - keep this last */}
      <Route path="*" element={<AuthLanding />} />
    </Routes>
  );
}

export default App;