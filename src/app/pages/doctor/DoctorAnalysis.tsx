import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Brain,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Activity,
  TrendingUp,
  FileText,
  Sparkles,
  Eye,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

// Simulated AI analysis data
const analysisData = {
  scanType: 'Brain MRI',
  patientName: 'Emma Watson',
  patientId: 'P-12847',
  uploadDate: '2026-03-31',
  status: 'normal', // 'normal', 'attention', 'critical'
  confidence: 94,
  diagnosis: 'No Abnormalities Detected',
  summary: 'The brain MRI scan shows normal brain structure with no signs of tumors, lesions, or abnormal growths. All major brain regions appear healthy and properly developed.',
  keyFindings: [
    {
      title: 'Brain Structure',
      status: 'normal',
      description: 'All major brain structures including cerebrum, cerebellum, and brain stem appear normal in size and position.',
    },
    {
      title: 'White Matter',
      status: 'normal',
      description: 'No white matter lesions or abnormalities detected.',
    },
    {
      title: 'Ventricles',
      status: 'normal',
      description: 'Ventricular system is normal in size and configuration.',
    },
    {
      title: 'Blood Vessels',
      status: 'normal',
      description: 'No signs of aneurysm or vascular malformations.',
    },
  ],
  recommendations: [
    'Continue routine health monitoring',
    'No immediate follow-up required',
    'Maintain healthy lifestyle habits',
  ],
  aiExplanation: 'The AI model analyzed 156 different features across the brain scan, comparing them with a database of over 500,000 similar scans. The analysis focused on identifying tumors, lesions, hemorrhages, and structural abnormalities. The high confidence score indicates a very reliable result.',
};

const statusConfig = {
  normal: {
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    icon: CheckCircle,
    label: 'Normal',
  },
  attention: {
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700',
    icon: AlertTriangle,
    label: 'Attention Needed',
  },
  critical: {
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    icon: XCircle,
    label: 'Critical',
  },
};

export function DoctorAnalysis() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [zoom, setZoom] = useState(100);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showAIExplanation, setShowAIExplanation] = useState(false);

  const status = analysisData.status as keyof typeof statusConfig;
  const StatusIcon = statusConfig[status].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-8">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/doctor')}
                variant="outline"
                className="rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Scan Analysis</h1>
                <p className="text-sm text-gray-600">
                  {analysisData.patientName} • {analysisData.patientId}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-xl">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download Report
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
                <h2 className="text-2xl font-bold text-gray-900">{analysisData.diagnosis}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[status].bgColor} ${statusConfig[status].textColor} border ${statusConfig[status].borderColor}`}>
                  {statusConfig[status].label}
                </span>
              </div>
              <p className="text-gray-600">{analysisData.summary}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Upload Date</div>
              <div className="font-medium text-gray-900">{analysisData.uploadDate}</div>
            </div>
          </div>
        </motion.div>

        {/* Main Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Image Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-xl sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-teal-600" />
                  Scan Preview
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                    className="rounded-lg"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium text-gray-600 min-w-[60px] text-center">
                    {zoom}%
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                    className="rounded-lg"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-lg">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Mock Brain Scan Display */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
                <div
                  className="transition-transform duration-300"
                  style={{ transform: `scale(${zoom / 100})` }}
                >
                  <div className="w-96 h-96 relative">
                    {/* Mock Brain Scan - Using a placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Brain className="w-32 h-32 text-teal-400 mx-auto mb-4 opacity-50" />
                        <p className="text-sm text-gray-400">Brain MRI Scan</p>
                        <p className="text-xs text-gray-500 mt-1">Axial View • T1 Weighted</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Processing Overlay Indicator */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-500/90 backdrop-blur-sm text-white text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    AI Analyzed
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="text-xs text-gray-600 mb-1">Resolution</div>
                  <div className="font-medium text-gray-900">512x512</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="text-xs text-gray-600 mb-1">Format</div>
                  <div className="font-medium text-gray-900">DICOM</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="text-xs text-gray-600 mb-1">Size</div>
                  <div className="font-medium text-gray-900">2.4 MB</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Side - AI Analysis Results */}
          <div className="space-y-6">
            {/* Confidence Score */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-teal-600" />
                  AI Confidence Score
                </h3>
                <div className="flex items-center gap-8">
                  {/* Circular Progress */}
                  <div className="relative w-40 h-40">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        fill="none"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="url(#gradient)"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 70}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                        animate={{
                          strokeDashoffset: 2 * Math.PI * 70 * (1 - analysisData.confidence / 100),
                        }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#14b8a6" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, type: 'spring' }}
                          className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"
                        >
                          {analysisData.confidence}%
                        </motion.div>
                        <div className="text-xs text-gray-600 mt-1">Confidence</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Accuracy</span>
                          <span className="text-sm font-medium text-gray-900">Excellent</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${analysisData.confidence}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-gradient-to-r from-teal-500 to-blue-600"
                          />
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <div className="text-xs text-gray-600 mb-2">Model Performance</div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-900">
                            98.5% validation accuracy
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowAIExplanation(!showAIExplanation)}
                  className="w-full mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-teal-600 hover:text-teal-700 transition-colors"
                >
                  <span className="font-medium">How was this calculated?</span>
                  {showAIExplanation ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                <AnimatePresence>
                  {showAIExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 p-4 rounded-xl bg-teal-50 border border-teal-200"
                    >
                      <p className="text-sm text-gray-700">{analysisData.aiExplanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                  <FileText className="w-5 h-5 text-teal-600" />
                  Key Findings
                </h3>
                <div className="space-y-3">
                  {analysisData.keyFindings.map((finding, index) => {
                    const findingStatus = finding.status as keyof typeof statusConfig;
                    const FindingIcon = statusConfig[findingStatus].icon;
                    const isExpanded = expandedSection === finding.title;

                    return (
                      <motion.div
                        key={finding.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="group"
                      >
                        <button
                          onClick={() =>
                            setExpandedSection(isExpanded ? null : finding.title)
                          }
                          className="w-full p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-teal-300 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${statusConfig[findingStatus].bgColor}`}
                            >
                              <FindingIcon
                                className={`w-5 h-5 ${statusConfig[findingStatus].textColor}`}
                              />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="font-medium text-gray-900">{finding.title}</div>
                            </div>
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
                                <p className="text-sm text-gray-600">{finding.description}</p>
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

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-teal-50 to-blue-50 border-white/50 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {analysisData.recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/70 backdrop-blur-sm"
                    >
                      <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{rec}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
