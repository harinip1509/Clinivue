import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Upload,
  MessageCircle,
  FileText,
  LogOut,
  Bell,
  User,
  Settings,
  ChevronDown,
  Activity,
  Calendar,
  X,
  AlertCircle,
  CheckCircle,
  Info,
} from 'lucide-react';
import clinivueLogo from '../../assets/logo.png';
const navigation = [
  { name: 'Home', href: '/patient', icon: Home },
  { name: 'Upload', href: '/patient/upload', icon: Upload },
  { name: 'AI Assistant', href: '/patient/chat', icon: MessageCircle },
  { name: 'Reports', href: '/patient/reports', icon: FileText },
];

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    type: 'urgent',
    title: 'Immediate Action Required',
    message: 'Your recent MRI scan shows abnormalities that need attention',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    type: 'success',
    title: 'Lab Results Ready',
    message: 'Your blood test results are now available',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: 3,
    type: 'info',
    title: 'Upcoming Appointment',
    message: 'Reminder: Checkup scheduled for March 31, 2026',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 4,
    type: 'info',
    title: 'Prescription Refill',
    message: 'Your prescription will expire in 7 days',
    time: '2 days ago',
    unread: false,
  },
];

export function PatientLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const isActive = (href: string) => {
    if (href === '/patient') {
      return location.pathname === '/patient';
    }
    return location.pathname.startsWith(href);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-50 border-red-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-teal-50/30">
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 z-50 shadow-lg">
        <div className="flex justify-around items-center py-2">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.name} to={item.href}>
                <div
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                    active ? 'text-[#14b8a6]' : 'text-gray-600'
                  }`}
                >
                  <item.icon className={`w-6 h-6 ${active ? 'scale-110' : ''}`} />
                  <span className="text-xs font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 z-40 shadow-sm">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center gap-3">
              <img 
                src={clinivueLogo} 
                alt="Clinivue" 
                className="h-10 w-auto object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-[#14b8a6]">
                  Clinivue
                </h1>
                <p className="text-xs text-gray-500">Multimodal Healthcare</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link key={item.name} to={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      active
                        ? 'bg-[#14b8a6] text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Quick Stats */}
          <div className="p-4 border-t border-gray-200/50">
            <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100">
              <p className="text-xs text-gray-600 mb-3">Quick Stats</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Health Score
                  </span>
                  <span className="font-bold text-[#14b8a6]">94%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Next Checkup
                  </span>
                  <span className="font-medium text-gray-900">5 days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 space-y-2 border-t border-gray-200/50">
            <Link to="/patient/profile">
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 w-full transition-all">
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </button>
            </Link>
            <Link to="/">
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 w-full transition-all">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:ml-72 pb-20 md:pb-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <div className="flex items-center gap-3">
              <img src={clinivueLogo} alt="Clinivue" className="h-8 w-auto object-contain md:hidden" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Welcome back!</h2>
                <p className="text-sm text-gray-500">How can we help you today?</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button
                className="relative p-2 rounded-xl hover:bg-gray-100 transition-all"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-6 h-6 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full animate-pulse"></span>
                )}
              </button>

              {/* Profile Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:bg-gray-50 rounded-xl pr-2 py-2 transition-all"
                >
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">John Smith</p>
                    <p className="text-xs text-gray-500">P-12345</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#14b8a6] flex items-center justify-center text-white font-medium">
                    JS
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      showProfileMenu ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Profile Menu */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-16 w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 p-4 z-50"
                    >
                      <div className="pb-4 border-b border-gray-200 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-[#14b8a6] flex items-center justify-center text-white font-medium text-lg">
                            JS
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">John Smith</p>
                            <p className="text-xs text-gray-500">john.smith@email.com</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            navigate('/patient/profile');
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
                        >
                          <User className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">View Profile</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
                          <Settings className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">Settings</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
                          <Activity className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">Health Overview</span>
                        </button>
                      </div>

                      <div className="pt-4 border-t border-gray-200 mt-4">
                        <button
                          onClick={() => navigate('/')}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Notifications Modal */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 p-4 w-96 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-all"
                  onClick={() => setShowNotifications(false)}
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-xl ${getNotificationBg(notification.type)}`}
                  >
                    <div className="flex items-center gap-3">
                      {getNotificationIcon(notification.type)}
                      <div>
                        <p className="font-medium text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-500">{notification.message}</p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}