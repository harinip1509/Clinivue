import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  FileText, 
  MessageCircle, 
  CheckCircle, 
  AlertTriangle,
  Heart,
  Activity,
  Sparkles,
  Download,
  Share2
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export function PatientResults() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock analysis results
  const analysis = {
    reportName: "Brain MRI Scan",
    date: "March 30, 2026",
    status: "completed",
    summary: "Your brain scan shows normal results with no significant abnormalities detected.",
    confidence: 94,
    findings: [
      {
        title: "Overall Brain Health",
        status: "good",
        description: "No abnormalities or concerning areas detected in your brain scan",
        icon: CheckCircle,
        color: "green"
      },
      {
        title: "Brain Structure",
        status: "good",
        description: "All brain structures appear normal and well-defined",
        icon: Activity,
        color: "green"
      },
      {
        title: "Follow-up Recommended",
        status: "info",
        description: "Regular check-up recommended in 12 months",
        icon: AlertTriangle,
        color: "blue"
      }
    ],
    simpleExplanation: {
      whatWeFound: "We analyzed your brain MRI scan and compared it with thousands of similar scans. Your brain structures all appear normal and healthy.",
      whatItMeans: "This is great news! No tumors, lesions, or abnormalities were detected. Your brain tissue looks healthy and shows no signs of damage or disease.",
      nextSteps: "Continue your regular health routine. We recommend a follow-up scan in 12 months as part of routine monitoring. If you experience any new symptoms like headaches, vision changes, or dizziness, please contact your doctor immediately."
    },
    keyMetrics: [
      { label: "Brain Volume", value: "Normal", status: "good" },
      { label: "White Matter", value: "Healthy", status: "good" },
      { label: "Gray Matter", value: "Normal", status: "good" },
      { label: "Ventricles", value: "Normal Size", status: "good" }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => navigate("/patient")}
          variant="outline"
          className="rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate("/patient/chat")}
            variant="outline"
            className="rounded-xl"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Ask AI Assistant
          </Button>
          <Button
            variant="outline"
            className="rounded-xl"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="p-8 backdrop-blur-xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-white/50 shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-2">ANALYSIS COMPLETE</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{analysis.reportName}</h1>
              <p className="text-lg text-gray-700 mb-3">{analysis.summary}</p>
              <div className="text-sm text-gray-600">{analysis.date}</div>
            </div>
          </div>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative inline-flex items-center justify-center"
            >
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradientGreen)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 352" }}
                  animate={{ strokeDasharray: `${(analysis.confidence / 100) * 352} 352` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-gray-900">{analysis.confidence}%</div>
                <div className="text-xs text-gray-600">Confidence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Findings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Findings */}
          <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">What We Found</h2>
            <div className="space-y-4">
              {analysis.findings.map((finding, index) => {
                const Icon = finding.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-5 rounded-xl border-2 ${
                      finding.color === "green"
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                        : "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${
                        finding.color === "green" ? "bg-green-100" : "bg-blue-100"
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          finding.color === "green" ? "text-green-600" : "text-blue-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">{finding.title}</h3>
                        <p className="text-gray-700">{finding.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Simple Explanation */}
          <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Simple Explanation
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">📋 What We Found</h3>
                <p className="text-gray-700 leading-relaxed">{analysis.simpleExplanation.whatWeFound}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">💡 What It Means</h3>
                <p className="text-gray-700 leading-relaxed">{analysis.simpleExplanation.whatItMeans}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">🎯 Next Steps</h3>
                <p className="text-gray-700 leading-relaxed">{analysis.simpleExplanation.nextSteps}</p>
              </div>
            </div>
          </Card>

          {/* Key Metrics */}
          <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Key Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              {analysis.keyMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">{metric.label}</div>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ask AI Assistant */}
          <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-blue-50 to-purple-50 border-white/50 shadow-lg">
            <MessageCircle className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Have Questions?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Chat with our AI assistant to get answers about your report in simple terms
            </p>
            <Button
              onClick={() => navigate("/patient/chat")}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Ask AI Assistant
            </Button>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full rounded-xl justify-start"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Full Report
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl justify-start"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl justify-start"
                onClick={() => navigate("/patient/upload")}
              >
                Upload Another
              </Button>
            </div>
          </Card>

          {/* Disclaimer */}
          <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
            <p className="text-xs text-yellow-800">
              ⚠️ <strong>Important:</strong> This AI analysis is for informational purposes only. Always consult with your healthcare provider for medical advice and decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}