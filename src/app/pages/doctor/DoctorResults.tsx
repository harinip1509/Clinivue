import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { 
  Download, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  Brain,
  Activity,
  TrendingUp,
  Eye,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export function DoctorResults() {
  const navigate = useNavigate();
  const { scanId } = useParams();
  const [activeTab, setActiveTab] = useState<"overview" | "details" | "explanation">("overview");

  // Mock AI analysis results
  const analysis = {
    diagnosis: "Benign Brain Tumor",
    confidence: 92,
    severity: "moderate",
    patient: "Michael Brown",
    patientId: "P-2024-5678",
    scanType: "Brain MRI",
    scanDate: "March 30, 2026",
    findings: [
      "Small mass detected in left frontal lobe",
      "Size: approximately 12mm in diameter",
      "Well-defined borders suggesting benign nature",
      "No surrounding edema detected",
      "No mass effect on adjacent structures"
    ],
    recommendations: [
      "Follow-up MRI in 3 months to monitor growth",
      "Consider neurosurgical consultation",
      "Monitor for neurological symptoms",
      "No immediate intervention required"
    ],
    keyMetrics: [
      { label: "Tumor Size", value: "12mm", status: "moderate" },
      { label: "Growth Rate", value: "Stable", status: "good" },
      { label: "Edema", value: "None", status: "good" },
      { label: "Mass Effect", value: "Minimal", status: "good" }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/doctor")}
            variant="outline"
            className="rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Analysis Results</h1>
            <p className="text-gray-600">Scan ID: {scanId}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate(`/doctor/report/${scanId}`)}
            className="rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button
            variant="outline"
            className="rounded-xl"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Patient Info Banner */}
      <Card className="p-6 backdrop-blur-xl bg-gradient-to-r from-teal-50 to-blue-50 border-white/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {analysis.patient.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{analysis.patient}</h2>
              <p className="text-gray-600">Patient ID: {analysis.patientId}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Scan Type</div>
            <div className="font-semibold text-gray-900">{analysis.scanType}</div>
            <div className="text-sm text-gray-500">{analysis.scanDate}</div>
          </div>
        </div>
      </Card>

      {/* Main Diagnosis Card */}
      <Card className="p-8 backdrop-blur-xl bg-white/70 border-white/50 shadow-xl">
        <div className="flex items-start gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100"
          >
            <AlertTriangle className="w-12 h-12 text-orange-600" />
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm font-semibold text-gray-600 mb-2">AI DIAGNOSIS</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{analysis.diagnosis}</h2>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    analysis.severity === "critical" ? "bg-red-100 text-red-700" :
                    analysis.severity === "moderate" ? "bg-orange-100 text-orange-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {analysis.severity.charAt(0).toUpperCase() + analysis.severity.slice(1)} Priority
                  </span>
                </div>
              </div>

              {/* Confidence Score */}
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
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 352" }}
                      animate={{ strokeDasharray: `${(analysis.confidence / 100) * 352} 352` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#0891b2" />
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
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: "overview", label: "Overview", icon: Eye },
          { id: "details", label: "Detailed Findings", icon: Activity },
          { id: "explanation", label: "AI Explanation", icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                activeTab === tab.id
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "overview" && (
            <>
              {/* Scan Visualization */}
              <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-teal-600" />
                  Scan with AI Heatmap
                </h3>
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 aspect-video flex items-center justify-center">
                  {/* Mock Brain Scan with Heatmap Overlay */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-red-500/20"></div>
                    <Brain className="w-32 h-32 text-teal-400 opacity-50" />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute top-1/3 left-1/3 w-20 h-20 rounded-full bg-red-500/60 blur-xl"
                    />
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-2 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs">
                    🔴 Detected Anomaly Region
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Red overlay indicates the region of interest detected by AI. The highlighted area shows a {analysis.diagnosis.toLowerCase()} in the left frontal lobe.
                </p>
              </Card>

              {/* Key Metrics */}
              <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Metrics</h3>
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
                        {metric.status === "good" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                        )}
                      </div>
                      <div className="text-xl font-bold text-gray-900">{metric.value}</div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {activeTab === "details" && (
            <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Findings</h3>
              <div className="space-y-3">
                {analysis.findings.map((finding, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200"
                  >
                    <div className="w-2 h-2 rounded-full bg-teal-500 mt-2"></div>
                    <p className="flex-1 text-gray-700">{finding}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "explanation" && (
            <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI Explanation (Plain Language)
              </h3>
              <div className="prose prose-sm max-w-none space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Our AI system has analyzed the brain MRI scan and identified a small mass in the left frontal lobe. This mass measures approximately 12 millimeters in diameter.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>What does this mean?</strong> The mass appears to have well-defined borders, which is typically a characteristic of benign (non-cancerous) tumors. There's no swelling (edema) around the mass, and it's not pushing on nearby brain structures, which are both positive signs.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Why is the AI confident?</strong> The AI model has analyzed thousands of similar brain scans and can recognize patterns that distinguish between different types of brain masses. The confidence score of {analysis.confidence}% indicates high certainty in this assessment.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>What are the visual indicators?</strong> In the heatmap visualization, you can see the red overlay highlighting the exact location of the detected mass. The intensity of the color corresponds to the AI's confidence in that specific region.
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recommendations */}
          <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-purple-50 to-pink-50 border-white/50 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Recommendations
            </h3>
            <div className="space-y-3">
              {analysis.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700 flex-1">{rec}</p>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <Button
                onClick={() => navigate(`/doctor/report/${scanId}`)}
                className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Full Report
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={() => navigate("/doctor/upload")}
              >
                Upload Another Scan
              </Button>
            </div>
          </Card>

          {/* Disclaimer */}
          <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
            <p className="text-xs text-yellow-800">
              ⚠️ <strong>Important:</strong> AI analysis is a diagnostic aid and should not replace professional medical judgment. Always consult with qualified medical professionals for final diagnosis and treatment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}