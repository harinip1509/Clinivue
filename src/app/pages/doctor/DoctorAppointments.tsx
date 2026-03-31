import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  Plus,
  Video,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

// Sample appointments data
const appointmentsData = [
  {
    id: 1,
    patientName: 'Emma Watson',
    type: 'Follow-up',
    date: '2026-04-05',
    time: '09:00 AM',
    duration: '30 min',
    mode: 'In-Person',
    status: 'Confirmed',
    reason: 'Brain MRI results discussion',
    location: 'Room 204',
  },
  {
    id: 2,
    patientName: 'Michael Chen',
    type: 'Consultation',
    date: '2026-04-05',
    time: '10:00 AM',
    duration: '45 min',
    mode: 'Video',
    status: 'Confirmed',
    reason: 'Chest X-Ray consultation',
    location: 'Online',
  },
  {
    id: 3,
    patientName: 'Sarah Johnson',
    type: 'Check-up',
    date: '2026-04-05',
    time: '11:30 AM',
    duration: '30 min',
    mode: 'In-Person',
    status: 'Pending',
    reason: 'Routine health check',
    location: 'Room 301',
  },
  {
    id: 4,
    patientName: 'James Wilson',
    type: 'Urgent',
    date: '2026-04-05',
    time: '02:00 PM',
    duration: '60 min',
    mode: 'In-Person',
    status: 'Confirmed',
    reason: 'MRI analysis review',
    location: 'Room 105',
  },
  {
    id: 5,
    patientName: 'Lisa Anderson',
    type: 'Follow-up',
    date: '2026-04-06',
    time: '09:30 AM',
    duration: '30 min',
    mode: 'Video',
    status: 'Confirmed',
    reason: 'Treatment progress review',
    location: 'Online',
  },
  {
    id: 6,
    patientName: 'Robert Brown',
    type: 'Consultation',
    date: '2026-04-06',
    time: '11:00 AM',
    duration: '45 min',
    mode: 'In-Person',
    status: 'Cancelled',
    reason: 'General consultation',
    location: 'Room 204',
  },
  {
    id: 7,
    patientName: 'Jennifer Martinez',
    type: 'Check-up',
    date: '2026-04-07',
    time: '10:00 AM',
    duration: '30 min',
    mode: 'In-Person',
    status: 'Pending',
    reason: 'Post-treatment checkup',
    location: 'Room 301',
  },
  {
    id: 8,
    patientName: 'David Lee',
    type: 'Follow-up',
    date: '2026-04-07',
    time: '03:00 PM',
    duration: '30 min',
    mode: 'Video',
    status: 'Confirmed',
    reason: 'Cardiac CT follow-up',
    location: 'Online',
  },
];

const statusConfig = {
  Confirmed: {
    color: 'bg-green-100 text-green-700 border-green-200',
    icon: CheckCircle,
  },
  Pending: {
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    icon: AlertCircle,
  },
  Cancelled: {
    color: 'bg-red-100 text-red-700 border-red-200',
    icon: XCircle,
  },
};

const typeColors = {
  'Follow-up': 'bg-blue-100 text-blue-700',
  'Consultation': 'bg-purple-100 text-purple-700',
  'Check-up': 'bg-teal-100 text-teal-700',
  'Urgent': 'bg-red-100 text-red-700',
};

export function DoctorAppointments() {
  const [selectedDate, setSelectedDate] = useState('2026-04-05');
  const [filterType, setFilterType] = useState('All');

  // Filter appointments
  const filteredAppointments = appointmentsData.filter((appointment) => {
    const matchesDate = appointment.date === selectedDate;
    const matchesType = filterType === 'All' || appointment.type === filterType;
    return matchesDate && matchesType;
  });

  // Get unique dates for date selector
  const uniqueDates = Array.from(new Set(appointmentsData.map((a) => a.date))).sort();

  // Calculate stats
  const todayStats = {
    total: appointmentsData.filter((a) => a.date === selectedDate).length,
    confirmed: appointmentsData.filter(
      (a) => a.date === selectedDate && a.status === 'Confirmed'
    ).length,
    pending: appointmentsData.filter(
      (a) => a.date === selectedDate && a.status === 'Pending'
    ).length,
    video: appointmentsData.filter(
      (a) => a.date === selectedDate && a.mode === 'Video'
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
          <p className="text-gray-600">Manage your schedule and patient appointments</p>
        </div>
        <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg">
          <Plus className="w-5 h-5 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Today</div>
            <Calendar className="w-5 h-5 text-teal-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{todayStats.total}</div>
        </Card>
        <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Confirmed</div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">{todayStats.confirmed}</div>
        </Card>
        <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Pending</div>
            <AlertCircle className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-yellow-600">{todayStats.pending}</div>
        </Card>
        <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Video Calls</div>
            <Video className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{todayStats.video}</div>
        </Card>
      </div>

      {/* Date and Type Filters */}
      <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Date Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {uniqueDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedDate === date
                      ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Type
            </label>
            <div className="flex gap-2 flex-wrap">
              {['All', 'Follow-up', 'Consultation', 'Check-up', 'Urgent'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterType === type
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment, index) => {
            const StatusIcon = statusConfig[appointment.status as keyof typeof statusConfig].icon;
            return (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Time */}
                    <div className="flex items-center gap-3 md:w-32">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-teal-100 to-blue-100">
                        <Clock className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{appointment.time}</div>
                        <div className="text-sm text-gray-500">{appointment.duration}</div>
                      </div>
                    </div>

                    {/* Patient Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-medium">
                          {appointment.patientName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {appointment.patientName}
                          </div>
                          <div className="text-sm text-gray-500">{appointment.reason}</div>
                        </div>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          typeColors[appointment.type as keyof typeof typeColors]
                        }`}
                      >
                        {appointment.type}
                      </span>
                    </div>

                    {/* Mode and Location */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {appointment.mode === 'Video' ? (
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          <span>{appointment.mode}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{appointment.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 ${
                          statusConfig[appointment.status as keyof typeof statusConfig].color
                        }`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {appointment.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {appointment.mode === 'Video' && appointment.status === 'Confirmed' && (
                        <Button
                          size="sm"
                          className="rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Join
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="rounded-lg">
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })
        ) : (
          <Card className="p-12 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No appointments scheduled for this date</p>
          </Card>
        )}
      </div>
    </div>
  );
}
