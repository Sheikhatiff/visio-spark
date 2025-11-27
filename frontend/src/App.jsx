import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Dashboard from "../pages/pages/Dashboard";
import SignInPage from "../pages/pages/SignInPage";
import SignUpPage from "../pages/pages/SignUpPage";
import AuthLanding from "../pages/pages/AuthLanding";
function App() {
  return (
    <Routes>
      {/* Root and custom auth page */}
      <Route path="/" element={<AuthLanding />} />
      <Route path="/auth" element={<AuthLanding />} />

      {/* Clerk auth pages */}
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />

      {/* Protected page */}
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<AuthLanding />} />
    </Routes>
  );
}

export default App;
