import { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

// Sample reports data
const reportsData = [
  {
    id: 1,
    reportNumber: 'RPT-2026-001',
    patientName: 'Emma Watson',
    scanType: 'Brain MRI',
    date: '2026-03-30',
    generatedBy: 'Dr. Sarah Chen',
    status: 'Completed',
    findings: 'No abnormalities detected',
    confidence: 94,
  },
  {
    id: 2,
    reportNumber: 'RPT-2026-002',
    patientName: 'Michael Chen',
    scanType: 'Chest X-Ray',
    date: '2026-03-29',
    generatedBy: 'Dr. Sarah Chen',
    status: 'Completed',
    findings: 'Possible pneumonia - requires follow-up',
    confidence: 89,
  },
  {
    id: 3,
    reportNumber: 'RPT-2026-003',
    patientName: 'Sarah Johnson',
    scanType: 'CT Scan',
    date: '2026-03-28',
    generatedBy: 'Dr. Sarah Chen',
    status: 'Completed',
    findings: 'Normal findings',
    confidence: 91,
  },
  {
    id: 4,
    reportNumber: 'RPT-2026-004',
    patientName: 'James Wilson',
    scanType: 'Brain MRI',
    date: '2026-03-27',
    generatedBy: 'Dr. Sarah Chen',
    status: 'Pending Review',
    findings: 'Awaiting specialist review',
    confidence: 87,
  },
  {
    id: 5,
    reportNumber: 'RPT-2026-005',
    patientName: 'Lisa Anderson',
    scanType: 'Spinal X-Ray',
    date: '2026-03-26',
    generatedBy: 'Dr. Sarah Chen',
    status: 'Completed',
    findings: 'Mild disc degeneration',
    confidence: 92,
  },
  {
    id: 6,
    reportNumber: 'RPT-2026-006',
    patientName: 'Robert Brown',
    scanType: 'Chest CT',
    date: '2026-03-25',
    generatedBy: 'Dr. Sarah Chen',
    status: 'Completed',
    findings: 'Clear lung fields',
    confidence: 95,
  },
  {
    id: 7,
    reportNumber: 'RPT-2026-007',
    patientName: 'Jennifer Martinez',
    scanType: 'Brain MRI',
    date: '2026-03-24',
    generatedBy: 'Dr. Sarah Chen',
    status: 'Pending Review',
    findings: 'Requires detailed analysis',
    confidence: 85,
  },
  {
    id: 8,
    reportNumber: 'RPT-2026-008',
    patientName: 'David Lee',
    scanType: 'Cardiac CT',
    date: '2026-03-23',
    generatedBy: 'Dr. Sarah Chen',
    status: 'Completed',
    findings: 'Minor calcification detected',
    confidence: 90,
  },
];

const statusColors = {
  'Completed': 'bg-green-100 text-green-700 border-green-200',
  'Pending Review': 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

export function DoctorReports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter reports
  const filteredReports = reportsData.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.scanType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'All' || report.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600">View and manage all generated medical reports</p>
        </div>
        <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg">
          <Download className="w-5 h-5 mr-2" />
          Export All
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Reports</div>
            <FileText className="w-5 h-5 text-teal-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{reportsData.length}</div>
        </Card>
        <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Completed</div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {reportsData.filter((r) => r.status === 'Completed').length}
          </div>
        </Card>
        <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Pending Review</div>
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {reportsData.filter((r) => r.status === 'Pending Review').length}
          </div>
        </Card>
        <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">This Week</div>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {reportsData.filter((r) => new Date(r.date) >= new Date('2026-03-24')).length}
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name, report number, or scan type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {['All', 'Completed', 'Pending Review'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  filterStatus === status
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Reports Grid */}
      <div className="grid gap-4">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Report Icon */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-teal-100 to-blue-100">
                  <FileText className="w-8 h-8 text-teal-600" />
                </div>

                {/* Report Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">{report.reportNumber}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        statusColors[report.status as keyof typeof statusColors]
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{report.patientName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span>{report.scanType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{report.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Confidence: {report.confidence}%</span>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-700">
                    <strong>Findings:</strong> {report.findings}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-xl flex-1 md:flex-none"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 flex-1 md:flex-none"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <Card className="p-12 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No reports found matching your criteria</p>
        </Card>
      )}
    </div>
  );
}
