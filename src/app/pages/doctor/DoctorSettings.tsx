import { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Globe,
  Shield,
  Palette,
  Save,
  Edit,
  Camera,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

export function DoctorSettings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
      <Card className="p-2 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'preferences' && <PreferenceSettings />}
      </motion.div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>

        {/* Profile Picture */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-2xl font-medium">
              SC
            </div>
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white border-2 border-gray-200 hover:bg-gray-50 transition-all">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Profile Picture</h3>
            <p className="text-sm text-gray-600 mb-3">
              Upload a new profile picture (JPG, PNG, max 5MB)
            </p>
            <Button size="sm" variant="outline" className="rounded-lg">
              <Upload className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                defaultValue="Dr. Sarah Chen"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialization
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                defaultValue="Neurologist"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                defaultValue="sarah.chen@clinivue.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              rows={4}
              defaultValue="Experienced neurologist with 15+ years in medical imaging and AI-assisted diagnostics."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" className="rounded-xl">
            Cancel
          </Button>
          <Button className="rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>

        <div className="space-y-6">
          {/* Change Password */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50"
                  />
                </div>
              </div>
            </div>

            <Button className="mt-4 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700">
              Update Password
            </Button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-600">
                  Add an extra layer of security to your account
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              </label>
            </div>
          </div>

          {/* Session Management */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-1">Active Sessions</h3>
            <p className="text-sm text-gray-600 mb-4">
              Manage devices where you're currently logged in
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Current Device</p>
                    <p className="text-sm text-gray-600">Chrome on MacOS • Last active now</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>

        <div className="space-y-4">
          {[
            {
              title: 'Email Notifications',
              description: 'Receive email updates about patient reports and appointments',
            },
            {
              title: 'Push Notifications',
              description: 'Get push notifications for urgent patient updates',
            },
            {
              title: 'Appointment Reminders',
              description: 'Receive reminders 30 minutes before appointments',
            },
            {
              title: 'Report Completion',
              description: 'Notify when AI analysis reports are completed',
            },
            {
              title: 'Patient Messages',
              description: 'Get notified when patients send you messages',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-white/50 border border-gray-200"
            >
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PreferenceSettings() {
  return (
    <div className="space-y-6">
      <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Application Preferences</h2>

        <div className="space-y-6">
          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50 appearance-none">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['Light', 'Dark', 'Auto'].map((theme) => (
                <button
                  key={theme}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme === 'Light'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 bg-white/50 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{theme}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Format
            </label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>

          {/* Time Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Format
            </label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50">
              <option>12 Hour (AM/PM)</option>
              <option>24 Hour</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" className="rounded-xl">
            Reset to Default
          </Button>
          <Button className="rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </Card>
    </div>
  );
}

function Upload({ className }: { className?: string }) {
  return <Camera className={className} />;
}
