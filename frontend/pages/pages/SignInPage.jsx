// src/pages/SignInPage.js
import React, { useState, useEffect } from "react";
import { SignIn } from "@clerk/clerk-react";
import { Shield, Sparkles, Check, Lock, Sun, Moon } from "lucide-react";

export default function SignInPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Light theme styles
  const lightTheme = {
    background: "bg-gradient-to-br from-slate-50 via-white to-cyan-50",
    backgroundShapes: [
      "bg-gradient-to-br from-emerald-200/30 to-cyan-200/30",
      "bg-gradient-to-tr from-blue-200/30 to-purple-200/30"
    ],
    text: {
      primary: "text-slate-900",
      secondary: "text-slate-600",
      gradient: "bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600"
    },
    cards: {
      background: "bg-white",
      border: "border-slate-200",
      hoverBorder: "hover:border-emerald-200"
    },
    icons: {
      background: "bg-gradient-to-br from-emerald-100 to-cyan-100",
      color: "text-emerald-600"
    }
  };

  // Dark theme styles
  const darkTheme = {
    background: "bg-gray-900",
    backgroundShapes: [
      "bg-gradient-to-br from-amber-900/20 to-orange-900/20",
      "bg-gradient-to-tr from-yellow-900/20 to-amber-900/20"
    ],
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      gradient: "bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400"
    },
    cards: {
      background: "bg-gray-800/90 backdrop-blur-sm",
      border: "border-gray-700",
      hoverBorder: "hover:border-amber-500/50"
    },
    icons: {
      background: "bg-gradient-to-br from-amber-900/50 to-orange-900/50",
      color: "text-amber-400"
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <div className={`min-h-screen ${theme.background} p-4 flex items-center justify-center transition-colors duration-300 relative overflow-hidden`}>
      
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          isDarkMode 
            ? 'bg-amber-500 hover:bg-amber-600 text-white' 
            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
        } shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95`}
      >
        {isDarkMode ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
      </button>

      {/* Background gradient shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 ${theme.backgroundShapes[0]} rounded-full blur-3xl transition-all duration-500`}></div>
        <div className={`absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 ${theme.backgroundShapes[1]} rounded-full blur-3xl transition-all duration-500`}></div>
        
        {/* Dark mode floating shapes */}
        {isDarkMode && (
          <>
            <div className="absolute top-4 left-4 w-12 h-12 md:top-10 md:left-10 md:w-20 md:h-20 bg-amber-900 rounded-full opacity-15 animate-float transition-all duration-500"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 md:bottom-10 md:right-10 md:w-24 md:h-24 bg-orange-900 rounded-full opacity-15 animate-float transition-all duration-500" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-10 h-10 md:w-16 md:h-16 bg-yellow-900 rounded-full opacity-15 animate-float transition-all duration-500" style={{ animationDelay: '4s' }}></div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center justify-center h-full">
          
          {/* LEFT — Text + Features Section - Hidden on mobile */}
          <div className="hidden lg:block space-y-4 max-h-[600px] overflow-hidden">
            <div className="space-y-3">
              <h1 className="text-3xl xl:text-4xl font-bold leading-tight">
                <span className={`bg-clip-text text-transparent ${theme.text.gradient}`}>
                  Welcome back,
                </span>
                <br />
                <span className={theme.text.primary}>sign in securely</span>
              </h1>
              <p className={`text-base leading-relaxed ${theme.text.secondary}`}>
                Access your account with enterprise-grade security and a smooth
                sign-in experience. Continue where you left off.
              </p>
            </div>

            {/* Compact features list */}
            <div className="space-y-2">
              {[
                { icon: Shield, title: "Protected Sessions", desc: "Every login is encrypted and secured." },
                { icon: Sparkles, title: "One-click Sign In", desc: "Use Google, GitHub or LinkedIn instantly." },
                { icon: Check, title: "Always in Sync", desc: "Your data stays consistent across devices." }
              ].map((i, index) => (
                <div key={index} className={`flex items-start gap-3 p-3 ${theme.cards.background} rounded-xl border ${theme.cards.border} ${theme.cards.hoverBorder} transition-all duration-300`}>
                  <div className={`w-10 h-10 rounded-lg ${theme.icons.background} flex items-center justify-center border ${
                    isDarkMode ? 'border-amber-500/20' : 'border-transparent'
                  }`}>
                    <i.icon className={`w-5 h-5 ${theme.icons.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm mb-1 ${theme.text.primary}`}>{i.title}</h3>
                    <p className={`text-xs ${theme.text.secondary}`}>{i.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini feature highlight - Compact */}
            <div className={`pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-slate-200'} transition-colors duration-300`}>
              <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>When you sign in, you get:</p>
              <div className="grid grid-cols-2 gap-1">
                {["Secure Account Access", "Synced Preferences", "Fast Support", "Real-time Activity"].map((f, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      isDarkMode 
                        ? 'bg-amber-900/50 border border-amber-500/20' 
                        : 'bg-emerald-100'
                    } transition-colors duration-300 flex-shrink-0`}>
                      <Check className={`w-2 h-2 ${
                        isDarkMode ? 'text-amber-400' : 'text-emerald-600'
                      } transition-colors duration-300`} />
                    </div>
                    <span className={`text-xs ${theme.text.secondary} transition-colors duration-300 truncate`}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile-only header */}
          <div className="lg:hidden text-center mb-4">
            <div className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-2 shadow-lg border ${
              isDarkMode ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400/30' : 'bg-gradient-to-r from-emerald-500 to-cyan-500 border-emerald-400/30'
            }`}>
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-xl font-bold ${theme.text.primary} mb-1`}>Welcome back</h1>
            <p className={`text-sm ${theme.text.secondary}`}>Sign in to continue</p>
          </div>

          {/* RIGHT — Clerk SignIn UI - Compact */}
          <div className={`rounded-2xl lg:rounded-3xl shadow-2xl border p-4 lg:p-6 xl:p-8 w-full max-w-md mx-auto backdrop-blur-sm transition-all duration-300 h-fit ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-700' 
              : 'bg-white border-slate-200'
          }`}>
            <SignIn
              path="/sign-in"
              routing="path"
              signUpUrl="/sign-up"
              afterSignInUrl="/dashboard"
              appearance={{
                elements: {
                  card: "bg-transparent shadow-none w-full",
                  headerTitle: `text-xl lg:text-2xl font-bold bg-clip-text text-transparent ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-amber-400 to-orange-400' 
                      : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900'
                  } transition-all duration-300`,
                  headerSubtitle: `text-xs lg:text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`,

                  socialButtonsBlockButton: `border rounded-lg lg:rounded-xl py-2 lg:py-3 transition-all font-medium text-xs lg:text-sm ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 hover:border-amber-500 hover:bg-gray-600 text-gray-300'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`,
                  socialButtonsBlockButtonText: "font-medium",

                  dividerLine: isDarkMode ? "bg-gray-700" : "bg-slate-200",
                  dividerText: `text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`,

                  formFieldLabel: `text-xs lg:text-sm font-semibold ${
                    isDarkMode ? 'text-gray-300' : 'text-slate-700'
                  }`,
                  formFieldInput: `border rounded-lg lg:rounded-xl px-3 lg:px-4 py-2 lg:py-3 text-sm transition-all ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:bg-gray-600/50'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                  }`,

                  formButtonPrimary: `font-semibold rounded-lg lg:rounded-xl py-2.5 lg:py-3.5 text-sm transition-all ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                      : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white'
                  }`,

                  footerActionText: `text-xs lg:text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-600'
                  }`,
                  footerActionLink: `font-semibold transition-colors duration-200 text-xs lg:text-sm ${
                    isDarkMode 
                      ? 'text-amber-400 hover:text-amber-300' 
                      : 'text-emerald-600 hover:text-emerald-700'
                  }`,

                  formFieldInputShowPasswordButton: `transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-amber-400' : 'text-slate-400 hover:text-emerald-600'
                  }`,
                  identityPreviewText: `text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`,
                  identityPreviewEditButton: `transition-colors text-xs lg:text-sm ${
                    isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-emerald-600 hover:text-emerald-700'
                  }`,

                  alert: isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : "bg-slate-100 border-slate-200 text-slate-700",
                  alertText: isDarkMode ? "text-gray-300" : "text-slate-700",

                  footer: isDarkMode ? "border-gray-700" : "border-slate-200",
                  footerPagesLink: `transition-colors text-xs lg:text-sm ${
                    isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-emerald-600 hover:text-emerald-700'
                  }`,

                  formResendCodeLink: `transition-colors text-xs lg:text-sm ${
                    isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-emerald-600 hover:text-emerald-700'
                  }`,
                },
                layout: {
                  socialButtonsPlacement: "top",
                  socialButtonsVariant: "blockButton",
                  shimmer: true,
                },
                variables: {
                  colorPrimary: isDarkMode ? "#f59e0b" : "#10b981",
                  colorBackground: isDarkMode ? "#1f2937" : "#ffffff",
                  colorInputBackground: isDarkMode ? "#374151" : "#ffffff",
                  colorInputText: isDarkMode ? "#f9fafb" : "#1f2937",
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(2deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}