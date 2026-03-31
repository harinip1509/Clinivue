import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  FileText,
  BookOpen,
  MessageSquare,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Heart,
  AlertCircle,
  CheckCircle,
  Info,
  Sparkles,
  Eye,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

// Simulated AI report analysis data
const reportAnalysis = {
  reportTitle: 'Complete Blood Count (CBC) Test Results',
  patientName: 'John Doe',
  uploadDate: '2026-03-31',
  pages: 5,
  status: 'attention', // 'normal', 'attention', 'critical'
  simpleSummary:
    'Your blood test results show that most of your blood counts are within normal range. However, your cholesterol levels are slightly elevated, which means there is more fat in your blood than ideal. This is manageable with diet and lifestyle changes.',
  keyFindings: [
    {
      title: 'Red Blood Cells',
      value: '4.8 million/mcL',
      status: 'normal',
      explanation: 'Red blood cells carry oxygen throughout your body. Your count is healthy and normal.',
      normalRange: '4.5-5.5 million/mcL',
    },
    {
      title: 'White Blood Cells',
      value: '7,200/mcL',
      status: 'normal',
      explanation: 'White blood cells help fight infections. Your immune system is working well.',
      normalRange: '4,000-11,000/mcL',
    },
    {
      title: 'Cholesterol',
      value: '225 mg/dL',
      status: 'attention',
      explanation: 'Total cholesterol is a bit high. Aim for below 200 mg/dL. This can be improved with a healthier diet and regular exercise.',
      normalRange: 'Below 200 mg/dL',
    },
    {
      title: 'Blood Sugar (Glucose)',
      value: '95 mg/dL',
      status: 'normal',
      explanation: 'Your blood sugar is in a healthy range, indicating good glucose control.',
      normalRange: '70-100 mg/dL',
    },
  ],
  medicalTerms: [
    {
      term: 'Hemoglobin (Hb)',
      simpleExplanation: 'A protein in red blood cells that carries oxygen from your lungs to the rest of your body.',
    },
    {
      term: 'Platelets',
      simpleExplanation: 'Tiny blood cells that help your blood clot when you get a cut or injury.',
    },
    {
      term: 'LDL Cholesterol',
      simpleExplanation: 'Often called "bad cholesterol" - high levels can increase heart disease risk.',
    },
    {
      term: 'HDL Cholesterol',
      simpleExplanation: 'Often called "good cholesterol" - helps remove bad cholesterol from your blood.',
    },
  ],
  recommendations: [
    'Consider adopting a heart-healthy diet low in saturated fats',
    'Engage in at least 30 minutes of moderate exercise most days',
    'Schedule a follow-up cholesterol test in 3 months',
    'Discuss with your doctor about dietary supplements if needed',
  ],
  whatThisMeans:
    'Overall, your blood test shows you are in good health! The slightly high cholesterol is a common issue that can be easily managed. With some simple lifestyle changes like eating more fruits and vegetables, reducing fatty foods, and staying active, you can bring your cholesterol down to a healthy level. There is no immediate cause for concern, but it\'s important to make these changes to maintain good heart health.',
};

const statusConfig = {
  normal: {
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    icon: CheckCircle,
    label: 'All Clear',
  },
  attention: {
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700',
    icon: AlertCircle,
    label: 'Needs Attention',
  },
  critical: {
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    icon: AlertCircle,
    label: 'Requires Action',
  },
};

export function PatientAnalysis() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const status = reportAnalysis.status as keyof typeof statusConfig;
  const StatusIcon = statusConfig[status].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 pb-8">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/patient/reports')}
                variant="outline"
                className="rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Report Explanation</h1>
                <p className="text-sm text-gray-600">Easy-to-understand summary of your medical report</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-xl">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${statusConfig[status].bgColor} ${statusConfig[status].borderColor} border-2 rounded-2xl p-6 mb-8`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-full bg-gradient-to-br ${statusConfig[status].color} shadow-lg`}>
              <StatusIcon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-gray-900">Report Analyzed</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[status].bgColor} ${statusConfig[status].textColor} border ${statusConfig[status].borderColor}`}>
                  {statusConfig[status].label}
                </span>
              </div>
              <p className="text-gray-600">{reportAnalysis.reportTitle}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Pages</div>
              <div className="font-medium text-gray-900">{reportAnalysis.pages} pages</div>
            </div>
          </div>
        </motion.div>

        {/* Main Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - PDF Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-xl sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-teal-600" />
                  Original Report
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>Page {currentPage} of {reportAnalysis.pages}</span>
                </div>
              </div>

              {/* Mock PDF Viewer */}
              <div className="relative bg-white rounded-xl border-2 border-gray-200 overflow-hidden aspect-[8.5/11]">
                <div className="p-8 space-y-4">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                  
                  <div className="pt-4">
                    <div className="h-4 bg-gray-700 rounded w-2/3 mb-3"></div>
                    <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                  </div>

                  <div className="pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-gray-100 rounded border border-gray-300"></div>
                      <div className="h-20 bg-gray-100 rounded border border-gray-300"></div>
                    </div>
                  </div>
                </div>

                {/* AI Processing Overlay */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-500/90 backdrop-blur-sm text-white text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    AI Explained
                  </div>
                </div>
              </div>

              {/* Page Navigation */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg"
                >
                  Previous
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: reportAnalysis.pages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                        currentPage === i + 1
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(reportAnalysis.pages, currentPage + 1))}
                  disabled={currentPage === reportAnalysis.pages}
                  className="rounded-lg"
                >
                  Next
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Right Side - AI Explanation */}
          <div className="space-y-6">
            {/* Simple Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-teal-50 to-blue-50 border-white/50 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-teal-600" />
                  In Simple Words
                </h3>
                <p className="text-gray-700 leading-relaxed">{reportAnalysis.simpleSummary}</p>
              </Card>
            </motion.div>

            {/* Key Findings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-teal-600" />
                  Your Test Results Explained
                </h3>
                <div className="space-y-4">
                  {reportAnalysis.keyFindings.map((finding, index) => {
                    const findingStatus = finding.status as keyof typeof statusConfig;
                    const FindingIcon = statusConfig[findingStatus].icon;

                    return (
                      <motion.div
                        key={finding.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="p-4 rounded-xl border-2 border-gray-200 bg-white hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${statusConfig[findingStatus].bgColor} flex-shrink-0`}>
                            <FindingIcon className={`w-5 h-5 ${statusConfig[findingStatus].textColor}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-gray-900">{finding.title}</h4>
                              <span className="font-bold text-teal-600">{finding.value}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{finding.explanation}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Info className="w-3 h-3" />
                              <span>Normal range: {finding.normalRange}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Medical Terms Explained */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  Medical Terms Made Easy
                </h3>
                <div className="space-y-3">
                  {reportAnalysis.medicalTerms.map((term, index) => {
                    const isExpanded = expandedTerm === term.term;

                    return (
                      <motion.div
                        key={term.term}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <button
                          onClick={() => setExpandedTerm(isExpanded ? null : term.term)}
                          className="w-full p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-teal-300 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{term.term}</span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            </motion.div>
                          </div>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 pt-3 border-t border-gray-200 text-left"
                              >
                                <p className="text-sm text-gray-600">{term.simpleExplanation}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* What This Means for You */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-purple-50 to-pink-50 border-white/50 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  What This Means for You
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">{reportAnalysis.whatThisMeans}</p>
              </Card>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Next Steps</h3>
                <div className="space-y-3">
                  {reportAnalysis.recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-teal-50 to-blue-50"
                    >
                      <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{rec}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Chat with AI Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={() => navigate('/patient/chat')}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-xl"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Have Questions? Chat with AI Assistant
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}