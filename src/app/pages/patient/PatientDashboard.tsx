import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Upload,
  FileText,
  MessageCircle,
  Activity,
  Clock,
  TrendingUp,
  AlertCircle,
  Heart,
  Brain,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { LoadingState } from '../../components/LoadingState';
import { ErrorState } from '../../components/ErrorState';
import { EmptyState } from '../../components/EmptyState';
import { apiService } from '../../../services/api.service';
import type { DashboardStats, MedicalReport, Appointment, APIStatus } from '../../../types/api';

export function PatientDashboard() {
  const navigate = useNavigate();
  
  // API State Management
  const [statsStatus, setStatsStatus] = useState<APIStatus>('loading');
  const [reportsStatus, setReportsStatus] = useState<APIStatus>('loading');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentReports, setRecentReports] = useState<MedicalReport[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Fetch dashboard data on mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      setStatsStatus('loading');
      const statsResponse = await apiService.getDashboardStats('patient');
      if (statsResponse.status === 'success' && statsResponse.data) {
        setStats(statsResponse.data);
        setStatsStatus('success');
      }

      // Fetch reports
      setReportsStatus('loading');
      const reportsResponse = await apiService.getReports();
      if (reportsResponse.status === 'success' && reportsResponse.data) {
        setRecentReports(reportsResponse.data.slice(0, 3));
        setReportsStatus('success');
      }

      // Fetch appointments
      const appointmentsResponse = await apiService.getRecentAppointments();
      if (appointmentsResponse.status === 'success' && appointmentsResponse.data) {
        setAppointments(appointmentsResponse.data);
      }
    } catch (error) {
      setStatsStatus('error');
      setReportsStatus('error');
    }
  };

  const statCards = [
    {
      label: 'Total Reports',
      value: stats?.totalReports || 0,
      change: '+3 this month',
      icon: FileText,
      color: '#14b8a6',
    },
    {
      label: 'AI Analyses',
      value: stats?.analyzedReports || 0,
      change: '+2 this week',
      icon: Brain,
      color: '#3b82f6',
    },
    {
      label: 'Health Score',
      value: `${stats?.healthScore || 0}%`,
      change: 'Excellent',
      icon: Heart,
      color: '#10b981',
    },
    {
      label: 'Next Checkup',
      value: '5 days',
      change: 'April 5, 2026',
      icon: Calendar,
      color: '#06b6d4',
    },
  ];

  const quickActions = [
    {
      title: 'Upload Report',
      description: 'Get AI analysis instantly',
      icon: Upload,
      color: '#14b8a6',
      action: '/patient/upload',
    },
    {
      title: 'Ask AI Assistant',
      description: 'Get answers to your questions',
      icon: MessageCircle,
      color: '#3b82f6',
      action: '/patient/chat',
    },
    {
      title: 'View Reports',
      description: 'Access all your medical reports',
      icon: FileText,
      color: '#10b981',
      action: '/patient/reports',
    },
  ];

  const healthInsights = [
    {
      title: 'Cholesterol Level',
      status: 'attention' as const,
      message: 'Slightly elevated - consider diet changes',
      icon: Activity,
    },
    {
      title: 'Blood Pressure',
      status: 'normal' as const,
      message: 'Within healthy range',
      icon: Heart,
    },
    {
      title: 'Blood Sugar',
      status: 'normal' as const,
      message: 'Glucose levels are optimal',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600">Here's your health overview and recent activity</p>
        </div>
        <Button
          onClick={() => navigate('/patient/upload')}
          className="h-12 px-6 rounded-xl bg-[#14b8a6] hover:bg-[#0f766e] text-white shadow-lg"
        >
          <Upload className="w-5 h-5 mr-2" />
          Upload Report
        </Button>
      </div>

      {/* Stats Grid */}
      {statsStatus === 'loading' ? (
        <Card className="backdrop-blur-xl bg-white/80 border-white/50 shadow-lg p-8">
          <LoadingState message="Loading statistics..." />
        </Card>
      ) : statsStatus === 'error' ? (
        <Card className="backdrop-blur-xl bg-white/80 border-white/50 shadow-lg p-8">
          <ErrorState message="Failed to load statistics" onRetry={fetchDashboardData} />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden backdrop-blur-xl bg-white/80 border-white/50 shadow-lg hover:shadow-xl transition-all p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                    style={{ backgroundColor: stat.color }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-700">{stat.label}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate(action.action)}
            className="cursor-pointer"
          >
            <Card className="backdrop-blur-xl bg-white/80 border-white/50 shadow-lg hover:shadow-xl transition-all p-6">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md mb-4"
                style={{ backgroundColor: action.color }}
              >
                <action.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Reports & Appointments */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="backdrop-blur-xl bg-white/80 border-white/50 shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Reports</h2>
              <Button
                variant="ghost"
                onClick={() => navigate('/patient/reports')}
                className="text-[#14b8a6] hover:text-[#0f766e]"
              >
                View All
              </Button>
            </div>

            {reportsStatus === 'loading' ? (
              <LoadingState message="Loading reports..." size="sm" />
            ) : reportsStatus === 'error' ? (
              <ErrorState message="Failed to load reports" onRetry={fetchDashboardData} />
            ) : recentReports.length === 0 ? (
              <EmptyState
                icon="file"
                title="No reports yet"
                description="Upload your first medical report to get started"
              />
            ) : (
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    onClick={() => navigate(`/patient/analysis/${report.id}`)}
                    className="p-4 rounded-xl border-2 border-gray-200 bg-white/50 hover:border-[#14b8a6] hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{report.title}</h3>
                        <p className="text-sm text-gray-600">{report.summary}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report.status === 'Analyzed'
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {report.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {report.date}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="backdrop-blur-xl bg-white/80 border-white/50 shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
              <Calendar className="w-5 h-5 text-[#14b8a6]" />
            </div>
            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 rounded-xl bg-teal-50/50 border-2 border-teal-100"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#14b8a6] flex items-center justify-center text-white font-medium">
                      {appointment.doctor.split(' ')[1].charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{appointment.doctor}</h3>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    </div>
                    <span className="px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700">
                      {appointment.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-700">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {appointment.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {appointment.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Health Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="backdrop-blur-xl bg-teal-50/30 border-white/50 shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#14b8a6]" />
            Health Insights
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {healthInsights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`p-2 rounded-lg ${
                      insight.status === 'normal' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}
                  >
                    <insight.icon
                      className={`w-5 h-5 ${
                        insight.status === 'normal' ? 'text-green-700' : 'text-yellow-700'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{insight.title}</h3>
                    <p className="text-sm text-gray-600">{insight.message}</p>
                  </div>
                  {insight.status === 'normal' ? (
                    <CheckCircle className="w-5 h-5 text-[#10b981]" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[#f59e0b]" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* AI Assistant CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={() => navigate('/patient/chat')}
        className="cursor-pointer"
      >
        <Card className="relative overflow-hidden backdrop-blur-xl bg-[#14b8a6] border-white/50 shadow-xl p-8 text-white">
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Have Questions About Your Health?</h2>
              <p className="text-white/90 mb-4">
                Chat with our AI Assistant for instant answers and explanations
              </p>
              <Button className="bg-white text-[#14b8a6] hover:bg-white/90">
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Chatting
              </Button>
            </div>
            <MessageCircle className="w-32 h-32 text-white/20" />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}