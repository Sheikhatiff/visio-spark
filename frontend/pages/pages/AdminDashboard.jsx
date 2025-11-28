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
  Edit,
  Trash2,
  Send as SendIcon,
  UserPlus,
  Filter,
  MoreVertical
} from "lucide-react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [activeSection, setActiveSection] = useState('users');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  
  // Admin states
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('info');

  // Theme system
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

  // Mock data initialization
  useEffect(() => {
    // Mock users data
    setUsers([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
        joinDate: "2024-01-15",
        lastLogin: "2024-03-20",
        avatar: "JD"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        status: "Active",
        joinDate: "2024-02-10",
        lastLogin: "2024-03-19",
        avatar: "JS"
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        role: "Moderator",
        status: "Inactive",
        joinDate: "2024-01-20",
        lastLogin: "2024-03-15",
        avatar: "MJ"
      },
      {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah@example.com",
        role: "User",
        status: "Active",
        joinDate: "2024-03-01",
        lastLogin: "2024-03-20",
        avatar: "SW"
      }
    ]);

    // Mock notifications
    setNotifications([
      {
        id: 1,
        title: "Welcome to Admin Dashboard",
        message: "Your admin account has been setup successfully",
        time: "2 minutes ago",
        read: false,
        type: "success"
      },
      {
        id: 2,
        title: "Security Update",
        message: "New security features are available",
        time: "1 hour ago",
        read: false,
        type: "warning"
      },
      {
        id: 3,
        title: "Storage Alert",
        message: "System storage is at 75% capacity",
        time: "3 hours ago",
        read: true,
        type: "info"
      }
    ]);

    // Mock chatbot messages
    setChatMessages([
      {
        id: 1,
        text: "Hello! I'm your admin assistant. How can I help you today?",
        isBot: true,
        time: new Date()
      }
    ]);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      isBot: false,
      time: new Date()
    };

    setChatMessages(prev => [...prev, newMessage]);
    setMessageInput('');

    // Mock bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "I understand. How can I assist you with administrative tasks?",
        isBot: true,
        time: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  // Admin functions
  const editUser = (user) => {
    setEditingUser({ ...user });
    setShowUserModal(true);
  };

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const saveUser = () => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      setShowUserModal(false);
      setEditingUser(null);
    }
  };

  const sendNotificationToAll = () => {
    if (!notificationTitle.trim() || !notificationMessage.trim()) {
      alert('Please fill in both title and message');
      return;
    }

    // In a real app, you would send this to your backend
    // For now, we'll just show a success message
    alert(`Notification sent to all users!\nTitle: ${notificationTitle}\nMessage: ${notificationMessage}`);
    
    setShowNotificationModal(false);
    setNotificationTitle('');
    setNotificationMessage('');
    setNotificationType('info');
  };

  const lightTheme = {
    background: "bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50/80",
    card: "bg-white/80 backdrop-blur-sm border-white/20 shadow-xl",
    text: {
      primary: "text-slate-900",
      secondary: "text-slate-600",
    },
    button: {
      primary: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95",
      secondary: "bg-white/80 backdrop-blur-sm border border-slate-200/60 hover:bg-white text-slate-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
    }
  };

  const darkTheme = {
    background: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
    card: "bg-gray-800/60 backdrop-blur-sm border-gray-700/50 shadow-xl",
    text: {
      primary: "text-white",
      secondary: "text-gray-300",
    },
    button: {
      primary: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95",
      secondary: "bg-gray-700/60 backdrop-blur-sm border border-gray-600/50 hover:bg-gray-700 text-gray-300 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const navItems = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!isLoaded) {
    return (
      <div className={`min-h-screen ${theme.background} flex items-center justify-center transition-colors duration-300`}>
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
          <span className={theme.text.primary}>Loading...</span>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className={`min-h-screen ${theme.background} flex items-center justify-center transition-colors duration-300`}>
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className={`text-2xl font-bold mb-2 ${theme.text.primary}`}>Please Sign In</h2>
          <p className={theme.text.secondary}>You need to be signed in to access this dashboard</p>
        </div>
      </div>
    );
  }

  const displayName = user?.fullName || user?.primaryEmailAddress?.emailAddress || "Admin";
  const userInitial = displayName.charAt(0).toUpperCase();
  const unreadCount = notifications.filter(n => !n.read).length;

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${theme.background} transition-colors duration-300`}>
      {/* Header */}
      <header className={`border-b backdrop-blur-lg sticky top-0 z-50 ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700/50 shadow-xl' 
          : 'bg-white/80 border-slate-200/50 shadow-xl'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                }`}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${theme.text.primary}`}>
                    Admin Dashboard
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
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50 backdrop-blur-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 backdrop-blur-sm'
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
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700/50 backdrop-blur-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 backdrop-blur-sm'
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
                  <div className={`absolute right-0 top-12 w-80 rounded-2xl border shadow-2xl backdrop-blur-lg ${
                    isDarkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-slate-200/50'
                  }`}>
                    <div className={`p-4 border-b ${
                      isDarkMode ? 'border-gray-700/50' : 'border-slate-200/50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${theme.text.primary}`}>Notifications</h3>
                        <button
                          onClick={markAllAsRead}
                          className={`text-sm transition-colors duration-300 ${
                            isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-blue-600 hover:text-blue-700'
                          }`}
                        >
                          Mark all read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b transition-all duration-300 hover:scale-[1.01] ${
                            isDarkMode ? 'border-gray-700/50 hover:bg-gray-700/50' : 'border-slate-100/50 hover:bg-slate-50/50'
                          } ${!notification.read ? (isDarkMode ? 'bg-amber-500/10' : 'bg-blue-50/50') : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notification.type === 'success' ? 'bg-green-500' : 
                              notification.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                            }`} />
                            <div className="flex-1">
                              <h4 className={`font-medium ${theme.text.primary}`}>{notification.title}</h4>
                              <p className={`text-sm mt-1 ${theme.text.secondary}`}>{notification.message}</p>
                              <p className={`text-xs mt-2 ${
                                isDarkMode ? 'text-gray-500' : 'text-slate-400'
                              }`}>{notification.time}</p>
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
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50 backdrop-blur-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 backdrop-blur-sm'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <UserButton 
                afterSignOutUrl="/sign-in"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110",
                  }
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className={`rounded-2xl border p-4 transition-all duration-300 flex flex-col flex-shrink-0 h-fit sticky top-32 backdrop-blur-sm ${
            sidebarOpen ? 'w-64' : 'w-20'
          } ${theme.card}`}>
            <div className="flex items-center justify-between mb-6">
              {sidebarOpen && <h2 className={`text-lg font-semibold ${theme.text.primary}`}>Admin Navigation</h2>}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-slate-100/80'
                }`}
              >
                {sidebarOpen ? '«' : '»'}
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
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                        : `text-slate-600 dark:text-gray-300 ${
                            isDarkMode ? 'hover:bg-gray-700/50 hover:text-white' : 'hover:bg-slate-100/80 hover:text-slate-900'
                          }`
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    {sidebarOpen && <span className="ml-3 font-medium text-sm">{item.label}</span>}
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
                      }
                    }}
                  />
                </div>
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${theme.text.primary}`}>{displayName}</p>
                    <p className={`text-xs truncate ${theme.text.secondary}`}>
                      Administrator
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Content Header */}
            <div className={`rounded-2xl border p-6 mb-6 backdrop-blur-sm ${theme.card}`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className={`text-2xl font-bold mb-2 ${theme.text.primary}`}>
                    {navItems.find(item => item.id === activeSection)?.label || 'Admin Dashboard'}
                  </h2>
                  <p className={theme.text.secondary}>
                    {activeSection === 'users' && 'Manage all users and their permissions'}
                    {activeSection === 'notifications' && 'Send notifications to all users'}
                    {activeSection === 'analytics' && 'View system analytics and reports'}
                    {activeSection === 'database' && 'Manage database and backups'}
                    {activeSection === 'security' && 'Security settings and audit logs'}
                    {activeSection === 'settings' && 'System configuration and settings'}
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
                          ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-amber-500'
                          : 'border-slate-200/60 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  
                  {activeSection === 'users' && (
                    <button className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 ${theme.button.primary}`}>
                      <UserPlus className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      Add User
                    </button>
                  )}
                  
                  {activeSection === 'notifications' && (
                    <button 
                      onClick={() => setShowNotificationModal(true)}
                      className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 ${theme.button.primary}`}
                    >
                      <SendIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      Send Notification
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Dynamic Content Area */}
            <div className={`rounded-2xl border backdrop-blur-sm transition-all duration-300 ${theme.card}`}>
              {activeSection === 'users' && (
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${
                          isDarkMode ? 'border-gray-700/50' : 'border-slate-200/50'
                        }`}>
                          <th className="text-left py-3 px-4 font-semibold">User</th>
                          <th className="text-left py-3 px-4 font-semibold">Role</th>
                          <th className="text-left py-3 px-4 font-semibold">Status</th>
                          <th className="text-left py-3 px-4 font-semibold">Join Date</th>
                          <th className="text-left py-3 px-4 font-semibold">Last Login</th>
                          <th className="text-left py-3 px-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr 
                            key={user.id} 
                            className={`border-b transition-all duration-300 hover:scale-[1.01] ${
                              isDarkMode ? 'border-gray-700/50 hover:bg-gray-700/30' : 'border-slate-100/50 hover:bg-slate-50/50'
                            }`}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                                  isDarkMode ? 'bg-amber-500' : 'bg-blue-500'
                                }`}>
                                  {user.avatar}
                                </div>
                                <div>
                                  <p className={`font-medium ${theme.text.primary}`}>{user.name}</p>
                                  <p className={`text-sm ${theme.text.secondary}`}>{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.role === 'Admin' 
                                  ? (isDarkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-700')
                                  : user.role === 'Moderator'
                                  ? (isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700')
                                  : (isDarkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700')
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.status === 'Active'
                                  ? (isDarkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700')
                                  : (isDarkMode ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-700')
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className={`py-3 px-4 ${theme.text.secondary}`}>{user.joinDate}</td>
                            <td className={`py-3 px-4 ${theme.text.secondary}`}>{user.lastLogin}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => editUser(user)}
                                  className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                                    isDarkMode 
                                      ? 'hover:bg-gray-700/50 text-amber-400' 
                                      : 'hover:bg-slate-100/80 text-blue-600'
                                  }`}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteUser(user.id)}
                                  className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                                    isDarkMode 
                                      ? 'hover:bg-gray-700/50 text-red-400' 
                                      : 'hover:bg-slate-100/80 text-red-600'
                                  }`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                          isDarkMode ? 'border-gray-700/50' : 'border-slate-200/50'
                        } ${
                          notification.type === 'success' 
                            ? (isDarkMode ? 'bg-green-500/10' : 'bg-green-50/50')
                            : notification.type === 'warning'
                            ? (isDarkMode ? 'bg-amber-500/10' : 'bg-amber-50/50')
                            : (isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50/50')
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-semibold ${theme.text.primary}`}>{notification.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            notification.type === 'success'
                              ? (isDarkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700')
                              : notification.type === 'warning'
                              ? (isDarkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700')
                              : (isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700')
                          }`}>
                            {notification.type}
                          </span>
                        </div>
                        <p className={`text-sm mb-3 ${theme.text.secondary}`}>{notification.message}</p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-500' : 'text-slate-400'
                        }`}>{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!['users', 'notifications'].includes(activeSection) && (
                <div className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm ${
                    isDarkMode ? 'bg-gray-700/50' : 'bg-slate-100/80'
                  }`}>
                    {React.createElement(navItems.find(item => item.id === activeSection)?.icon || Settings, {
                      className: `w-8 h-8 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-slate-500'}`
                    })}
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${theme.text.primary}`}>
                    {navItems.find(item => item.id === activeSection)?.label} Section
                  </h3>
                  <p className={`max-w-md mx-auto mb-6 ${theme.text.secondary}`}>
                    This is your {activeSection} management area. Build your functionality here.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button className={`px-4 py-2 rounded-lg transition-all duration-300 ${theme.button.secondary}`}>
                      Configure
                    </button>
                    <button className={`px-4 py-2 rounded-lg transition-all duration-300 ${theme.button.primary}`}>
                      Get Started
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {showUserModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-2xl border p-6 backdrop-blur-sm ${theme.card}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${theme.text.primary}`}>Edit User</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-slate-100/80'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text.primary}`}>
                  Name
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-xl text-sm outline-none transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-amber-500'
                      : 'border-slate-200/60 focus:border-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text.primary}`}>
                  Email
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-xl text-sm outline-none transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-amber-500'
                      : 'border-slate-200/60 focus:border-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text.primary}`}>
                  Role
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-xl text-sm outline-none transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700/50 border-gray-600/50 text-white focus:border-amber-500'
                      : 'border-slate-200/60 focus:border-blue-500'
                  }`}
                >
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text.primary}`}>
                  Status
                </label>
                <select
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-xl text-sm outline-none transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700/50 border-gray-600/50 text-white focus:border-amber-500'
                      : 'border-slate-200/60 focus:border-blue-500'
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowUserModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 ${theme.button.secondary}`}
              >
                Cancel
              </button>
              <button
                onClick={saveUser}
                className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 ${theme.button.primary}`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-2xl border p-6 backdrop-blur-sm ${theme.card}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${theme.text.primary}`}>Send Notification</h3>
              <button
                onClick={() => setShowNotificationModal(false)}
                className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-slate-100/80'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text.primary}`}>
                  Notification Type
                </label>
                <select
                  value={notificationType}
                  onChange={(e) => setNotificationType(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl text-sm outline-none transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700/50 border-gray-600/50 text-white focus:border-amber-500'
                      : 'border-slate-200/60 focus:border-blue-500'
                  }`}
                >
                  <option value="info">Information</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text.primary}`}>
                  Title
                </label>
                <input
                  type="text"
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  placeholder="Enter notification title"
                  className={`w-full px-3 py-2 border rounded-xl text-sm outline-none transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-amber-500'
                      : 'border-slate-200/60 focus:border-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text.primary}`}>
                  Message
                </label>
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  placeholder="Enter notification message"
                  rows="4"
                  className={`w-full px-3 py-2 border rounded-xl text-sm outline-none transition-all duration-300 resize-none ${
                    isDarkMode
                      ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-amber-500'
                      : 'border-slate-200/60 focus:border-blue-500'
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNotificationModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 ${theme.button.secondary}`}
              >
                Cancel
              </button>
              <button
                onClick={sendNotificationToAll}
                className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 ${theme.button.primary}`}
              >
                Send to All Users
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-40">
        {showChatbot ? (
          <div className={`w-80 h-96 rounded-2xl border shadow-2xl flex flex-col backdrop-blur-lg ${
            isDarkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-slate-200/50'
          }`}>
            {/* Chat Header */}
            <div className={`p-4 border-b ${
              isDarkMode ? 'border-gray-700/50' : 'border-slate-200/50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  }`}>
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${theme.text.primary}`}>Admin Assistant</h3>
                    <p className={`text-xs ${theme.text.secondary}`}>Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChatbot(false)}
                  className={`p-1 rounded-lg transition-all duration-300 hover:scale-110 ${
                    isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-slate-100/80'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {chatMessages.map(message => (
                <div
                  key={message.id}
                  className={`mb-4 transition-all duration-300 ${message.isBot ? 'text-left' : 'text-right'}`}
                >
                  <div className={`inline-block max-w-[80%] p-3 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] ${
                    message.isBot
                      ? (isDarkMode ? 'bg-gray-700/50 text-white' : 'bg-slate-100/80 text-slate-900')
                      : (isDarkMode ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white')
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className={`text-xs mt-1 ${
                    isDarkMode ? 'text-gray-500' : 'text-slate-400'
                  }`}>
                    {message.time.toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className={`p-4 border-t ${
              isDarkMode ? 'border-gray-700/50' : 'border-slate-200/50'
            }`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className={`flex-1 px-3 py-2 border rounded-xl text-sm outline-none transition-all duration-300 focus:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-amber-500'
                      : 'border-slate-200/60 focus:border-blue-500'
                  }`}
                />
                <button
                  onClick={sendMessage}
                  className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                    isDarkMode
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowChatbot(true)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 ${
              isDarkMode
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
            }`}
          >
            <MessageCircle className="w-6 h-6 text-white transition-transform duration-300 hover:scale-110" />
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

export default AdminDashboard;