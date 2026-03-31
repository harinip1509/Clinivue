import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  LayoutDashboard,
  Upload,
  FileText,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Calendar,
  User,
  Mail,
  Phone,
  Edit,
  ChevronDown,
} from 'lucide-react';
import clinivueLogo from '../../assets/logo.png';

const navigation = [
  { name: 'Dashboard', href: '/doctor', icon: LayoutDashboard },
  { name: 'Patients', href: '/doctor/patients', icon: Users },
  { name: 'Appointments', href: '/doctor/appointments', icon: Calendar },
  { name: 'Reports', href: '/doctor/reports', icon: FileText },
  { name: 'Settings', href: '/doctor/settings', icon: Settings },
];

export function DoctorLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeNav, setActiveNav] = useState('/doctor');

  // Set active nav based on clicks, not just location
  const handleNavClick = (href: string) => {
    setActiveNav(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white/70 backdrop-blur-lg border-r border-gray-200/50 z-40">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center gap-3">
              <img src={clinivueLogo} alt="Clinivue" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Clinivue
                </h1>
                <p className="text-xs text-gray-500">Doctor Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = activeNav === item.href;
              return (
                <Link key={item.name} to={item.href} onClick={() => handleNavClick(item.href)}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg'
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

          {/* Bottom Actions */}
          <div className="p-4 space-y-2 border-t border-gray-200/50">
            <button
              onClick={() => navigate('/doctor/upload')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:from-teal-600 hover:to-blue-700 w-full transition-all shadow-lg"
            >
              <Upload className="w-5 h-5" />
              <span className="font-medium">Upload Scan</span>
            </button>
            <Link to="/">
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 w-full transition-all">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-72">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-lg border-b border-gray-200/50">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients, reports..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-all">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:bg-gray-50 rounded-xl p-2 transition-all"
                >
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Dr. Sarah Chen</p>
                    <p className="text-xs text-gray-500">Neurologist</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-medium">
                    SC
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      showProfileDropdown ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="p-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-medium">
                            SC
                          </div>
                          <div>
                            <p className="font-medium">Dr. Sarah Chen</p>
                            <p className="text-sm text-teal-50">Neurologist</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">sarah.chen@clinivue.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">Admin / Doctor</span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200">
                        <button
                          onClick={() => {
                            navigate('/doctor/profile');
                            setShowProfileDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit Profile</span>
                        </button>
                        <Link to="/" onClick={() => setShowProfileDropdown(false)}>
                          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all">
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}