import React, { useState, useEffect } from "react";
import {
  FileText,
  Upload,
  Share2,
  Users,
  Key,
  Lock,
  Shield,
  User,
  Search,
  Moon,
  Sun,
  Sparkles,
  Home,
  BarChart3,
  Settings,
  Bell,
  Folder,
  Plus,
  Mail,
  Calendar,
  HardDrive,
  MessageCircle,
  X,
  Send,
  Database,
  Cloud,
  Cpu,
  Globe,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

import { genAi } from "../../src/utils/botHelper.js";

const Dashboard = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [activeSection, setActiveSection] = useState("documents");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Theme system
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Mock notifications
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        title: "Welcome to Dashboard",
        message: "Your account has been setup successfully",
        time: "2 minutes ago",
        read: false,
        type: "success",
      },
      {
        id: 2,
        title: "Security Update",
        message: "New security features are available",
        time: "1 hour ago",
        read: false,
        type: "warning",
      },
      {
        id: 3,
        title: "Storage Alert",
        message: "You've used 80% of your storage",
        time: "3 hours ago",
        read: true,
        type: "info",
      },
    ]);
  }, []);

  // Initial chatbot message
  useEffect(() => {
    setChatMessages([
      {
        id: 1,
        text: "Hello! I'm your AI assistant for Noteworthy - the smart note-taking app. How can I help you with your notes today?",
        isBot: true,
        time: new Date(),
        type: "message",
      },
    ]);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const sendMessage = async () => {
    if (!messageInput.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: messageInput,
      isBot: false,
      time: new Date(),
      type: "message",
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setMessageInput("");
    setIsLoading(true);
    setError(null);

    try {
      // Add loading message
      const loadingMessage = {
        id: Date.now() + 1,
        text: "",
        isBot: true,
        time: new Date(),
        type: "loading",
      };
      setChatMessages((prev) => [...prev, loadingMessage]);

      // Call the AI function
      const aiResponse = await genAi(messageInput);

      // Remove loading message and add AI response
      setChatMessages((prev) =>
        prev
          .filter((msg) => msg.type !== "loading")
          .concat({
            id: Date.now() + 2,
            text:
              aiResponse ||
              "I apologize, but I couldn't generate a response. Please try again.",
            isBot: true,
            time: new Date(),
            type: "message",
          })
      );
    } catch (error) {
      console.error("Chatbot error:", error);

      // Remove loading message and add error message
      setChatMessages((prev) =>
        prev
          .filter((msg) => msg.type !== "loading")
          .concat({
            id: Date.now() + 2,
            text: "I'm sorry, I encountered an error while processing your request. Please try again in a moment.",
            isBot: true,
            time: new Date(),
            type: "error",
          })
      );

      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: 1,
        text: "Hello! I'm your AI assistant for Noteworthy - the smart note-taking app. How can I help you with your notes today?",
        isBot: true,
        time: new Date(),
        type: "message",
      },
    ]);
    setError(null);
  };

  const lightTheme = {
    background: "bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50/80",
    card: "bg-white/80 backdrop-blur-sm border-white/20 shadow-xl",
    text: {
      primary: "text-slate-900",
      secondary: "text-slate-600",
    },
    button: {
      primary:
        "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95",
      secondary:
        "bg-white/80 backdrop-blur-sm border border-slate-200/60 hover:bg-white text-slate-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95",
    },
  };

  const darkTheme = {
    background: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
    card: "bg-gray-800/60 backdrop-blur-sm border-gray-700/50 shadow-xl",
    text: {
      primary: "text-white",
      secondary: "text-gray-300",
    },
    button: {
      primary:
        "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95",
      secondary:
        "bg-gray-700/60 backdrop-blur-sm border border-gray-600/50 hover:bg-gray-700 text-gray-300 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95",
    },
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const navItems = [
    { id: "documents", label: "Documents", icon: FileText },
    { id: "upload", label: "Upload", icon: Upload },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "database", label: "Database", icon: Database },
    { id: "cloud", label: "Cloud Services", icon: Cloud },
    { id: "security", label: "Security", icon: Shield },
    { id: "performance", label: "Performance", icon: Cpu },
    { id: "network", label: "Network", icon: Globe },
    { id: "team", label: "Team", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (!isLoaded) {
    return (
      <div
        className={`min-h-screen ${theme.background} flex items-center justify-center transition-colors duration-300`}
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
          <span className={theme.text.primary}>Loading...</span>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div
        className={`min-h-screen ${theme.background} flex items-center justify-center transition-colors duration-300`}
      >
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className={`text-2xl font-bold mb-2 ${theme.text.primary}`}>
            Please Sign In
          </h2>
          <p className={theme.text.secondary}>
            You need to be signed in to access this dashboard
          </p>
        </div>
      </div>
    );
  }

  const displayName =
    user?.fullName || user?.primaryEmailAddress?.emailAddress || "User";
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      className={`min-h-screen ${theme.background} transition-colors duration-300`}
    >
      {/* Header - unchanged */}
      <header
        className={`border-b backdrop-blur-lg sticky top-0 z-50 ${
          isDarkMode
            ? "bg-gray-900/80 border-gray-700/50 shadow-xl"
            : "bg-white/80 border-slate-200/50 shadow-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                    isDarkMode
                      ? "bg-gradient-to-r from-amber-500 to-orange-500"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500"
                  }`}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${theme.text.primary}`}>
                    Dashboard
                  </h1>
                  <p className={`text-xs ${theme.text.secondary}`}>
                    Welcome back, {displayName}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700/50 backdrop-blur-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 backdrop-blur-sm"
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 relative ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700/50 backdrop-blur-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 backdrop-blur-sm"
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div
                    className={`absolute right-0 top-12 w-80 rounded-2xl border shadow-2xl backdrop-blur-lg ${
                      isDarkMode
                        ? "bg-gray-800/90 border-gray-700/50"
                        : "bg-white/90 border-slate-200/50"
                    }`}
                  >
                    <div
                      className={`p-4 border-b ${
                        isDarkMode
                          ? "border-gray-700/50"
                          : "border-slate-200/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${theme.text.primary}`}>
                          Notifications
                        </h3>
                        <button
                          onClick={markAllAsRead}
                          className={`text-sm transition-colors duration-300 ${
                            isDarkMode
                              ? "text-amber-400 hover:text-amber-300"
                              : "text-blue-600 hover:text-blue-700"
                          }`}
                        >
                          Mark all read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b transition-all duration-300 hover:scale-[1.01] ${
                            isDarkMode
                              ? "border-gray-700/50 hover:bg-gray-700/50"
                              : "border-slate-100/50 hover:bg-slate-50/50"
                          } ${
                            !notification.read
                              ? isDarkMode
                                ? "bg-amber-500/10"
                                : "bg-blue-50/50"
                              : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                notification.type === "success"
                                  ? "bg-green-500"
                                  : notification.type === "warning"
                                  ? "bg-amber-500"
                                  : "bg-blue-500"
                              }`}
                            />
                            <div className="flex-1">
                              <h4
                                className={`font-medium ${theme.text.primary}`}
                              >
                                {notification.title}
                              </h4>
                              <p
                                className={`text-sm mt-1 ${theme.text.secondary}`}
                              >
                                {notification.message}
                              </p>
                              <p
                                className={`text-xs mt-2 ${
                                  isDarkMode
                                    ? "text-gray-500"
                                    : "text-slate-400"
                                }`}
                              >
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700/50 backdrop-blur-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 backdrop-blur-sm"
                }`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <UserButton
                afterSignOutUrl="/sign-in"
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content area - unchanged */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Sidebar - unchanged */}
          <div
            className={`rounded-2xl border p-4 transition-all duration-300 flex flex-col flex-shrink-0 h-fit sticky top-32 backdrop-blur-sm ${
              sidebarOpen ? "w-64" : "w-20"
            } ${theme.card}`}
          >
            <div className="flex items-center justify-between mb-6">
              {sidebarOpen && (
                <h2 className={`text-lg font-semibold ${theme.text.primary}`}>
                  Navigation
                </h2>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-slate-100/80"
                }`}
              >
                {sidebarOpen ? "«" : "»"}
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 group hover:scale-[1.02] hover:translate-x-1 ${
                      activeSection === item.id
                        ? isDarkMode
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                          : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                        : `text-slate-600 dark:text-gray-300 ${
                            isDarkMode
                              ? "hover:bg-gray-700/50 hover:text-white"
                              : "hover:bg-slate-100/80 hover:text-slate-900"
                          }`
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    {sidebarOpen && (
                      <span className="ml-3 font-medium text-sm">
                        {item.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* User Profile */}
            <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold flex-shrink-0 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <UserButton
                    afterSignOutUrl="/sign-in"
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 rounded-xl",
                      },
                    }}
                  />
                </div>
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${theme.text.primary}`}
                    >
                      {displayName}
                    </p>
                    <p className={`text-xs truncate ${theme.text.secondary}`}>
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content - unchanged */}
          <div className="flex-1 min-w-0">
            {/* Content Header */}
            <div
              className={`rounded-2xl border p-6 mb-6 backdrop-blur-sm ${theme.card}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2
                    className={`text-2xl font-bold mb-2 ${theme.text.primary}`}
                  >
                    {navItems.find((item) => item.id === activeSection)
                      ?.label || "Dashboard"}
                  </h2>
                  <p className={theme.text.secondary}>
                    Manage your {activeSection} and related settings
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative group">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-blue-500" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`pl-9 pr-4 py-2.5 border rounded-xl text-sm outline-none transition-all duration-300 w-64 focus:scale-[1.02] ${
                        isDarkMode
                          ? "bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-amber-500"
                          : "border-slate-200/60 focus:border-blue-500"
                      }`}
                    />
                  </div>

                  <button
                    className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 ${theme.button.primary}`}
                  >
                    <Plus className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    Add New
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Content Area */}
            <div
              className={`rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${theme.card}`}
            >
              <div className="text-center">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm ${
                    isDarkMode ? "bg-gray-700/50" : "bg-slate-100/80"
                  }`}
                >
                  {React.createElement(
                    navItems.find((item) => item.id === activeSection)?.icon ||
                      Settings,
                    {
                      className: `w-8 h-8 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-300" : "text-slate-500"
                      }`,
                    }
                  )}
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 ${theme.text.primary}`}
                >
                  {navItems.find((item) => item.id === activeSection)?.label}{" "}
                  Section
                </h3>
                <p className={`max-w-md mx-auto mb-6 ${theme.text.secondary}`}>
                  This is your {activeSection} management area. Build your
                  functionality here.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${theme.button.secondary}`}
                  >
                    Configure
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${theme.button.primary}`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Chatbot */}
      <div className="fixed bottom-6 right-6 z-40">
        {showChatbot ? (
          <div
            className={`w-80 h-96 rounded-2xl border shadow-2xl flex flex-col backdrop-blur-lg ${
              isDarkMode
                ? "bg-gray-800/90 border-gray-700/50"
                : "bg-white/90 border-slate-200/50"
            }`}
          >
            {/* Chat Header */}
            <div
              className={`p-4 border-b ${
                isDarkMode ? "border-gray-700/50" : "border-slate-200/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                      isDarkMode
                        ? "bg-gradient-to-r from-amber-500 to-orange-500"
                        : "bg-gradient-to-r from-blue-500 to-cyan-500"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${theme.text.primary}`}>
                      AI Assistant
                    </h3>
                    <p className={`text-xs ${theme.text.secondary}`}>
                      {isLoading ? "Thinking..." : "Online"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={clearChat}
                    className={`p-1 rounded-lg transition-all duration-300 hover:scale-110 ${
                      isDarkMode
                        ? "hover:bg-gray-700/50"
                        : "hover:bg-slate-100/80"
                    }`}
                    title="Clear chat"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowChatbot(false)}
                    className={`p-1 rounded-lg transition-all duration-300 hover:scale-110 ${
                      isDarkMode
                        ? "hover:bg-gray-700/50"
                        : "hover:bg-slate-100/80"
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 transition-all duration-300 ${
                    message.isBot ? "text-left" : "text-right"
                  }`}
                >
                  <div
                    className={`inline-block max-w-[80%] p-3 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] ${
                      message.isBot
                        ? message.type === "error"
                          ? isDarkMode
                            ? "bg-red-500/20 border border-red-500/30 text-red-200"
                            : "bg-red-50 border border-red-200 text-red-700"
                          : message.type === "loading"
                          ? isDarkMode
                            ? "bg-gray-700/50 text-gray-300"
                            : "bg-slate-100/80 text-slate-600"
                          : isDarkMode
                          ? "bg-gray-700/50 text-white"
                          : "bg-slate-100/80 text-slate-900"
                        : isDarkMode
                        ? "bg-amber-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {message.type === "loading" ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    ) : message.type === "error" ? (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{message.text}</span>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">
                        {message.text}
                      </p>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      isDarkMode ? "text-gray-500" : "text-slate-400"
                    }`}
                  >
                    {message.time.toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div
              className={`p-4 border-t ${
                isDarkMode ? "border-gray-700/50" : "border-slate-200/50"
              }`}
            >
              {error && (
                <div
                  className={`mb-2 p-2 rounded-lg text-xs flex items-center gap-2 ${
                    isDarkMode
                      ? "bg-red-500/20 text-red-200"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>Error: {error}</span>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about our note-taking app..."
                  disabled={isLoading}
                  className={`flex-1 px-3 py-2 border rounded-xl text-sm outline-none transition-all duration-300 focus:scale-[1.02] ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-amber-500 disabled:opacity-50"
                      : "border-slate-200/60 focus:border-blue-500 disabled:opacity-50"
                  }`}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !messageInput.trim()}
                  className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode
                      ? "bg-amber-500 hover:bg-amber-600 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowChatbot(true)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 relative ${
              isDarkMode
                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            }`}
          >
            <MessageCircle className="w-6 h-6 text-white transition-transform duration-300 hover:scale-110" />
            {isLoading && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
            )}
          </button>
        )}
      </div>

      {/* Close notifications when clicking outside */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
