import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  Download,
  Edit,
  Trash2,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

// Sample patient data (backend-friendly structure)
const patientsData = [
  {
    id: 1,
    name: 'Emma Watson',
    age: 34,
    gender: 'Female',
    condition: 'Brain MRI - Normal',
    status: 'Active',
    email: 'emma.watson@email.com',
    phone: '+1 (555) 123-4567',
    lastVisit: '2026-03-30',
    nextAppointment: '2026-04-15',
  },
  {
    id: 2,
    name: 'Michael Chen',
    age: 45,
    gender: 'Male',
    condition: 'Chest X-Ray - Monitoring',
    status: 'Monitoring',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    lastVisit: '2026-03-29',
    nextAppointment: '2026-04-10',
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    age: 29,
    gender: 'Female',
    condition: 'CT Scan - Normal',
    status: 'Active',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 345-6789',
    lastVisit: '2026-03-28',
    nextAppointment: '2026-04-20',
  },
  {
    id: 4,
    name: 'James Wilson',
    age: 52,
    gender: 'Male',
    condition: 'Brain MRI - Pending Review',
    status: 'Pending',
    email: 'james.w@email.com',
    phone: '+1 (555) 456-7890',
    lastVisit: '2026-03-27',
    nextAppointment: '2026-04-05',
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    age: 41,
    gender: 'Female',
    condition: 'Spinal X-Ray - Treatment',
    status: 'Treatment',
    email: 'lisa.anderson@email.com',
    phone: '+1 (555) 567-8901',
    lastVisit: '2026-03-26',
    nextAppointment: '2026-04-08',
  },
  {
    id: 6,
    name: 'Robert Brown',
    age: 38,
    gender: 'Male',
    condition: 'Chest CT - Normal',
    status: 'Active',
    email: 'robert.b@email.com',
    phone: '+1 (555) 678-9012',
    lastVisit: '2026-03-25',
    nextAppointment: '2026-04-18',
  },
  {
    id: 7,
    name: 'Jennifer Martinez',
    age: 31,
    gender: 'Female',
    condition: 'Brain MRI - Monitoring',
    status: 'Monitoring',
    email: 'jennifer.m@email.com',
    phone: '+1 (555) 789-0123',
    lastVisit: '2026-03-24',
    nextAppointment: '2026-04-12',
  },
  {
    id: 8,
    name: 'David Lee',
    age: 47,
    gender: 'Male',
    condition: 'Cardiac CT - Treatment',
    status: 'Treatment',
    email: 'david.lee@email.com',
    phone: '+1 (555) 890-1234',
    lastVisit: '2026-03-23',
    nextAppointment: '2026-04-06',
  },
  {
    id: 9,
    name: 'Maria Garcia',
    age: 36,
    gender: 'Female',
    condition: 'Chest X-Ray - Normal',
    status: 'Active',
    email: 'maria.garcia@email.com',
    phone: '+1 (555) 901-2345',
    lastVisit: '2026-03-22',
    nextAppointment: '2026-04-22',
  },
  {
    id: 10,
    name: 'Thomas White',
    age: 55,
    gender: 'Male',
    condition: 'Brain MRI - Pending Review',
    status: 'Pending',
    email: 'thomas.w@email.com',
    phone: '+1 (555) 012-3456',
    lastVisit: '2026-03-21',
    nextAppointment: '2026-04-04',
  },
  {
    id: 11,
    name: 'Jessica Taylor',
    age: 28,
    gender: 'Female',
    condition: 'Spinal MRI - Normal',
    status: 'Active',
    email: 'jessica.t@email.com',
    phone: '+1 (555) 123-0987',
    lastVisit: '2026-03-20',
    nextAppointment: '2026-04-25',
  },
  {
    id: 12,
    name: 'Christopher Moore',
    age: 43,
    gender: 'Male',
    condition: 'CT Scan - Monitoring',
    status: 'Monitoring',
    email: 'chris.moore@email.com',
    phone: '+1 (555) 234-0987',
    lastVisit: '2026-03-19',
    nextAppointment: '2026-04-14',
  },
];

const statusColors = {
  Active: 'bg-green-100 text-green-700 border-green-200',
  Monitoring: 'bg-blue-100 text-blue-700 border-blue-200',
  Treatment: 'bg-orange-100 text-orange-700 border-orange-200',
  Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

export function DoctorPatients() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Filter patients based on search and status
  const filteredPatients = patientsData.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'All' || patient.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patients</h1>
          <p className="text-gray-600">
            Manage and view all patient records and information
          </p>
        </div>
        <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg">
          <Plus className="w-5 h-5 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, condition, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50"
            />
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-xl"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </Button>

          {/* Export Button */}
          <Button variant="outline" className="rounded-xl">
            <Download className="w-5 h-5 mr-2" />
            Export
          </Button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
              {['All', 'Active', 'Monitoring', 'Treatment', 'Pending'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <div className="text-sm text-gray-600 mb-1">Total Patients</div>
          <div className="text-2xl font-bold text-gray-900">{patientsData.length}</div>
        </Card>
        <Card className="p-4 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <div className="text-sm text-gray-600 mb-1">Active</div>
          <div className="text-2xl font-bold text-green-600">
            {patientsData.filter((p) => p.status === 'Active').length}
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <div className="text-sm text-gray-600 mb-1">In Treatment</div>
          <div className="text-2xl font-bold text-orange-600">
            {patientsData.filter((p) => p.status === 'Treatment').length}
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <div className="text-sm text-gray-600 mb-1">Pending Review</div>
          <div className="text-2xl font-bold text-yellow-600">
            {patientsData.filter((p) => p.status === 'Pending').length}
          </div>
        </Card>
      </div>

      {/* Patients Table */}
      <Card className="backdrop-blur-xl bg-white/70 border-white/50 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Age/Gender
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.map((patient, index) => (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-teal-50/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-medium">
                        {patient.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">ID: #{patient.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.age} years</div>
                    <div className="text-sm text-gray-500">{patient.gender}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">{patient.condition}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        statusColors[patient.status as keyof typeof statusColors]
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-xs">{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-xs">{patient.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{patient.lastVisit}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Next: {patient.nextAppointment}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/doctor/results/${patient.id}`)}
                        className="p-2 rounded-lg hover:bg-teal-50 text-teal-600 transition-all"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-all"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all"
                        title="More Options"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No patients found matching your criteria</p>
          </div>
        )}
      </Card>
    </div>
  );
}
