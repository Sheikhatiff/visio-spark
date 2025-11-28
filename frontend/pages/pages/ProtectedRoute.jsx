// src/components/ProtectedRoute.jsx
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // Check if the user is the admin
  const isAdmin = user.primaryEmailAddress?.emailAddress === 'ininsico@gmail.com';

  if (isAdmin) {
    return <Navigate to="/admindashboard" replace />;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};

export default ProtectedRoute;