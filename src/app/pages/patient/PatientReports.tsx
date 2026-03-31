import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Upload,
  ChevronDown,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';

const reports = [
  {
    id: '1',
    title: 'Complete Blood Count (CBC)',
    type: 'Lab Report',
    date: '2026-03-28',
    status: 'Analyzed',
    summary: 'Cholesterol slightly elevated, other values normal',
    doctor: 'Dr. Sarah Johnson',
    pages: 5,
    priority: 'attention',
  },
  {
    id: '2',
    title: 'Brain MRI Scan',
    type: 'Imaging',
    date: '2026-03-25',
    status: 'Analyzed',
    summary: 'No abnormalities detected',
    doctor: 'Dr. Michael Chen',
    pages: 12,
    priority: 'normal',
  },
  {
    id: '3',
    title: 'Cardiology Consultation Report',
    type: 'Consultation',
    date: '2026-03-20',
    status: 'Analyzed',
    summary: 'Heart function within normal range',
    doctor: 'Dr. Emily Rodriguez',
    pages: 3,
    priority: 'normal',
  },
  {
    id: '4',
    title: 'Thyroid Function Test',
    type: 'Lab Report',
    date: '2026-03-15',
    status: 'Analyzed',
    summary: 'TSH levels normal, T3/T4 balanced',
    doctor: 'Dr. Sarah Johnson',
    pages: 2,
    priority: 'normal',
  },
  {
    id: '5',
    title: 'Chest X-Ray',
    type: 'Imaging',
    date: '2026-03-10',
    status: 'Analyzed',
    summary: 'Clear lungs, no abnormalities',
    doctor: 'Dr. Michael Chen',
    pages: 1,
    priority: 'normal',
  },
  {
    id: '6',
    title: 'Lipid Panel',
    type: 'Lab Report',
    date: '2026-03-05',
    status: 'Analyzed',
    summary: 'HDL slightly low, recommend diet adjustment',
    doctor: 'Dr. Sarah Johnson',
    pages: 4,
    priority: 'attention',
  },
  {
    id: '7',
    title: 'Kidney Function Test',
    type: 'Lab Report',
    date: '2026-02-28',
    status: 'Analyzed',
    summary: 'All kidney markers normal',
    doctor: 'Dr. Sarah Johnson',
    pages: 3,
    priority: 'normal',
  },
  {
    id: '8',
    title: 'Annual Physical Examination',
    type: 'General',
    date: '2026-02-15',
    status: 'Analyzed',
    summary: 'Overall health good, minor recommendations',
    doctor: 'Dr. Emily Rodriguez',
    pages: 8,
    priority: 'normal',
  },
];

const filterOptions = ['All Reports', 'Lab Report', 'Imaging', 'Consultation', 'General'];
const statusOptions = ['All Status', 'Analyzed', 'Pending', 'Action Required'];

export function PatientReports() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Reports');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'All Reports' || report.type === selectedFilter;
    const matchesStatus =
      selectedStatus === 'All Status' || report.status === selectedStatus;
    return matchesSearch && matchesFilter && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Reports</h1>
          <p className="text-gray-600">
            View and manage all your medical reports with AI explanations
          </p>
        </div>
        <Button
          onClick={() => navigate('/patient/upload')}
          className="h-12 px-6 rounded-xl bg-[#14b8a6] hover:bg-[#0f766e] text-white shadow-lg"
        >
          <Upload className="w-5 h-5 mr-2" />
          Upload New Report
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="backdrop-blur-xl bg-white/80 border-white/50 shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#14b8a6] flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              <p className="text-sm text-gray-600">Total Reports</p>
            </div>
          </div>
        </Card>

        <Card className="backdrop-blur-xl bg-white/80 border-white/50 shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#10b981] flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter((r) => r.status === 'Analyzed').length}
              </p>
              <p className="text-sm text-gray-600">Analyzed</p>
            </div>
          </div>
        </Card>

        <Card className="backdrop-blur-xl bg-white/80 border-white/50 shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#f59e0b] flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter((r) => r.priority === 'attention').length}
              </p>
              <p className="text-sm text-gray-600">Need Attention</p>
            </div>
          </div>
        </Card>

        <Card className="backdrop-blur-xl bg-white/80 border-white/50 shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#3b82f6] flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">This Month</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="backdrop-blur-xl bg-white/80 border-white/50 shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search reports by title, doctor, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="h-12 px-4 rounded-xl"
              >
                <Filter className="w-5 h-5 mr-2" />
                {selectedFilter}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              {showFilterMenu && (
                <div className="absolute top-14 right-0 w-48 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-10">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedFilter(option);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-all ${
                        selectedFilter === option ? 'bg-teal-50 text-teal-700' : 'text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <Card className="backdrop-blur-xl bg-white/70 border-white/50 shadow-xl p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </Card>
        ) : (
          filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="backdrop-blur-xl bg-white/70 border-white/50 shadow-xl hover:shadow-2xl transition-all p-6">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#14b8a6] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {report.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{report.summary}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {report.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {report.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {report.pages} pages
                          </span>
                          <span>•</span>
                          <span>{report.doctor}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            report.status === 'Analyzed'
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                          }`}
                        >
                          {report.status}
                        </span>
                        {report.priority === 'attention' && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Needs Attention
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => navigate(`/patient/analysis/${report.id}`)}
                        className="h-10 px-4 rounded-xl bg-[#14b8a6] hover:bg-[#0f766e] text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View AI Analysis
                      </Button>
                      <Button
                        variant="outline"
                        className="h-10 px-4 rounded-xl"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}