import { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Heart,
  Activity,
  Droplet,
  TrendingUp,
  Save,
  Edit,
  Camera,
  Shield,
  Bell,
  Lock,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    age: 40,
    gender: 'Male',
    bloodType: 'O+',
    height: '5\'10"',
    weight: '180 lbs',
    address: '123 Health Street, Medical City, MC 12345',
    emergencyContact: 'Jane Smith - +1 (555) 987-6543',
  });

  const healthMetrics = [
    {
      label: 'Blood Pressure',
      value: '118/76',
      unit: 'mm Hg',
      status: 'normal',
      icon: Heart,
      color: '#10b981',
    },
    {
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'normal',
      icon: Activity,
      color: '#ef4444',
    },
    {
      label: 'Blood Sugar',
      value: '95',
      unit: 'mg/dL',
      status: 'normal',
      icon: Droplet,
      color: '#3b82f6',
    },
    {
      label: 'Cholesterol',
      value: '225',
      unit: 'mg/dL',
      status: 'attention',
      icon: TrendingUp,
      color: '#f59e0b',
    },
  ];

  const medicalHistory = [
    { condition: 'Hypertension', year: '2020', status: 'Controlled' },
    { condition: 'Type 2 Diabetes', year: '2018', status: 'Managed' },
    { condition: 'Seasonal Allergies', year: '2015', status: 'Ongoing' },
  ];

  const allergies = ['Penicillin', 'Peanuts', 'Pollen'];
  const medications = [
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your personal and health information</p>
      </div>

      {/* Profile Card */}
      <Card className="backdrop-blur-xl bg-white/70 border-white/50 shadow-xl p-8">
        <div className="flex items-start gap-8">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-[#14b8a6] flex items-center justify-center text-white text-4xl font-bold">
              {profileData.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {profileData.name}
                </h2>
                <p className="text-gray-600">Patient ID: P12345</p>
              </div>
              <Button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`rounded-xl ${
                  isEditing
                    ? 'bg-[#14b8a6] hover:bg-[#0f766e] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-600 text-sm mb-1">Email</Label>
                {isEditing ? (
                  <Input
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="rounded-xl"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-900">
                    <Mail className="w-4 h-4" />
                    <span>{profileData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-gray-600 text-sm mb-1">Phone</Label>
                {isEditing ? (
                  <Input
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="rounded-xl"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-900">
                    <Phone className="w-4 h-4" />
                    <span>{profileData.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-gray-600 text-sm mb-1">Date of Birth</Label>
                <div className="flex items-center gap-2 text-gray-900">
                  <Calendar className="w-4 h-4" />
                  <span>{profileData.dateOfBirth}</span>
                  <span className="text-gray-500">({profileData.age} years old)</span>
                </div>
              </div>

              <div>
                <Label className="text-gray-600 text-sm mb-1">Gender</Label>
                <div className="flex items-center gap-2 text-gray-900">
                  <User className="w-4 h-4" />
                  <span>{profileData.gender}</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <Label className="text-gray-600 text-sm mb-1">Address</Label>
                {isEditing ? (
                  <Input
                    value={profileData.address}
                    onChange={(e) =>
                      setProfileData({ ...profileData, address: e.target.value })
                    }
                    className="rounded-xl"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-900">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Health Metrics */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Health Metrics</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {healthMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="backdrop-blur-xl bg-white/70 border-white/50 shadow-xl p-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: metric.color }}
                >
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                    <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
                  </p>
                  <span
                    className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${
                      metric.status === 'normal'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {metric.status === 'normal' ? 'Normal' : 'Needs Attention'}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Medical Information */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Medical History */}
        <Card className="backdrop-blur-xl bg-white/70 border-white/50 shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Medical History</h2>
          <div className="space-y-3">
            {medicalHistory.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-teal-50/50 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.condition}</h3>
                    <p className="text-sm text-gray-600">Since {item.year}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Allergies & Medications */}
        <div className="space-y-6">
          <Card className="backdrop-blur-xl bg-white/70 border-white/50 shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Allergies</h2>
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 font-medium"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/70 border-white/50 shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Current Medications</h2>
            <div className="space-y-3">
              {medications.map((med, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl border border-gray-200 bg-white/50"
                >
                  <h3 className="font-medium text-gray-900">{med.name}</h3>
                  <p className="text-sm text-gray-600">
                    {med.dosage} • {med.frequency}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="backdrop-blur-xl bg-white/70 border-white/50 shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Physical Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Blood Type</span>
              <span className="font-medium text-gray-900">{profileData.bloodType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Height</span>
              <span className="font-medium text-gray-900">{profileData.height}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weight</span>
              <span className="font-medium text-gray-900">{profileData.weight}</span>
            </div>
          </div>
        </Card>

        <Card className="backdrop-blur-xl bg-white/70 border-white/50 shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Emergency Contact</h3>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-gray-900 font-medium">{profileData.emergencyContact}</p>
          </div>
        </Card>
      </div>

      {/* Settings */}
      <Card className="backdrop-blur-xl bg-white/70 border-white/50 shadow-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-teal-300 hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Notifications</span>
            </div>
            <span className="text-sm text-gray-500">Configure alerts</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-teal-300 hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Privacy & Security</span>
            </div>
            <span className="text-sm text-gray-500">Manage access</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-teal-300 hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Data & Privacy</span>
            </div>
            <span className="text-sm text-gray-500">View settings</span>
          </button>
        </div>
      </Card>
    </div>
  );
}