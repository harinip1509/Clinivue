import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Upload,
  Brain,
  Activity,
  Users,
  TrendingUp,
  Clock,
  FileText,
  AlertCircle,
  Calendar,
  BarChart3,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const stats = [
  {
    label: 'Total Scans',
    value: '1,247',
    change: '+12.5%',
    trend: 'up',
    icon: Brain,
    color: '#14b8a6',
  },
  {
    label: 'AI Analyses',
    value: '892',
    change: '+8.3%',
    trend: 'up',
    icon: Activity,
    color: '#3b82f6',
  },
  {
    label: 'Active Patients',
    value: '324',
    change: '+5.2%',
    trend: 'up',
    icon: Users,
    color: '#8b5cf6',
  },
  {
    label: 'Pending Reports',
    value: '18',
    change: '-2.1%',
    trend: 'down',
    icon: FileText,
    color: '#f59e0b',
  },
];

// Patient growth data (line chart)
const patientGrowthData = [
  { month: 'Jan', patients: 45 },
  { month: 'Feb', patients: 52 },
  { month: 'Mar', patients: 61 },
  { month: 'Apr', patients: 70 },
  { month: 'May', patients: 85 },
  { month: 'Jun', patients: 98 },
  { month: 'Jul', patients: 110 },
  { month: 'Aug', patients: 125 },
  { month: 'Sep', patients: 142 },
  { month: 'Oct', patients: 158 },
  { month: 'Nov', patients: 175 },
  { month: 'Dec', patients: 190 },
];

// Department distribution data (pie chart)
const departmentData = [
  { name: 'Neurology', value: 120, color: '#14b8a6' },
  { name: 'Cardiology', value: 85, color: '#3b82f6' },
  { name: 'Orthopedics', value: 65, color: '#8b5cf6' },
  { name: 'Radiology', value: 54, color: '#ec4899' },
];

// Weekly appointments data (bar chart)
const appointmentsData = [
  { day: 'Mon', appointments: 12 },
  { day: 'Tue', appointments: 15 },
  { day: 'Wed', appointments: 18 },
  { day: 'Thu', appointments: 14 },
  { day: 'Fri', appointments: 20 },
  { day: 'Sat', appointments: 8 },
  { day: 'Sun', appointments: 5 },
];

const recentScans = [
  {
    id: '1',
    patientName: 'Emma Watson',
    scanType: 'Brain MRI',
    date: '2026-03-30',
    status: 'Completed',
    confidence: 94,
    diagnosis: 'No abnormalities detected',
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    scanType: 'Chest X-Ray',
    date: '2026-03-29',
    status: 'Completed',
    confidence: 89,
    diagnosis: 'Possible pneumonia',
  },
  {
    id: '3',
    patientName: 'Sarah Johnson',
    scanType: 'CT Scan',
    date: '2026-03-29',
    status: 'Completed',
    confidence: 91,
    diagnosis: 'Normal findings',
  },
];

const pendingActions = [
  {
    id: '1',
    action: 'Review MRI Analysis',
    patient: 'James Wilson',
    priority: 'high',
    time: '15 mins ago',
  },
  {
    id: '2',
    action: 'Generate Report',
    patient: 'Lisa Anderson',
    priority: 'medium',
    time: '1 hour ago',
  },
  {
    id: '3',
    action: 'Patient Consultation',
    patient: 'Robert Brown',
    priority: 'low',
    time: '2 hours ago',
  },
];

export function DoctorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good Morning, Dr. Chen 👋
          </h1>
          <p className="text-gray-600">Here's what's happening with your patients today</p>
        </div>
        <Button
          onClick={() => navigate('/doctor/upload')}
          className="h-12 px-6 rounded-xl bg-[#14b8a6] hover:bg-[#0f766e] text-white shadow-lg"
        >
          <Upload className="w-5 h-5 mr-2" />
          Upload New Scan
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: stat.color }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                  stat.trend === 'up'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                <TrendingUp
                  className={`w-3 h-3 ${stat.trend === 'down' ? 'rotate-180' : ''}`}
                />
                {stat.change}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Patient Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Patient Growth</h2>
              <p className="text-sm text-gray-600">Monthly patient registrations over time</p>
            </div>
            <BarChart3 className="w-8 h-8 text-teal-500" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={patientGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="patients"
                stroke="#14b8a6"
                strokeWidth={3}
                dot={{ fill: '#14b8a6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly Appointments Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Weekly Appointments</h2>
              <p className="text-sm text-gray-600">Daily appointment distribution</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={appointmentsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="appointments" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Department Distribution & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Department Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {departmentData.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dept.color }}
                  ></div>
                  <span className="text-gray-700">{dept.name}</span>
                </div>
                <span className="font-medium text-gray-900">{dept.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Scans */}
        <div className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Scans</h2>
              <Button
                variant="ghost"
                className="text-teal-600 hover:text-teal-700"
                onClick={() => navigate('/doctor/patients')}
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentScans.map((scan) => (
                <motion.div
                  key={scan.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => navigate(`/doctor/analysis/${scan.id}`)}
                  className="p-4 rounded-xl border border-gray-200 hover:border-teal-300 bg-white/50 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#14b8a6] flex items-center justify-center text-white font-medium">
                        {scan.patientName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{scan.patientName}</p>
                        <p className="text-sm text-gray-500">{scan.scanType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {scan.confidence}%
                        </span>
                        <div className="px-2 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-medium">
                          {scan.status}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {scan.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Brain className="w-4 h-4" />
                    <span>{scan.diagnosis}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg"
      >
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-bold text-gray-900">Pending Actions</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {pendingActions.map((action) => (
            <div
              key={action.id}
              className="p-4 rounded-xl border border-gray-200 bg-white/50 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium text-gray-900 text-sm">{action.action}</p>
                <span
                  className={`px-2 py-0.5 rounded-lg text-xs font-medium ${
                    action.priority === 'high'
                      ? 'bg-red-100 text-red-700'
                      : action.priority === 'medium'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {action.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{action.patient}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {action.time}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}