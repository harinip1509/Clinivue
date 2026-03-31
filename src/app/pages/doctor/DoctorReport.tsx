import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { Download, Printer, Share2, ArrowLeft, Brain, FileText } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import logoImage from "../../../assets/logo.png";
export function DoctorReport() {
  const navigate = useNavigate();
  const { scanId } = useParams();

  const reportData = {
    reportId: "RPT-2026-001234",
    date: "March 30, 2026",
    patient: {
      name: "Michael Brown",
      id: "P-2024-5678",
      age: "45",
      gender: "Male",
      dob: "January 15, 1981"
    },
    doctor: {
      name: "Dr. Sarah Chen",
      specialty: "Neurologist",
      license: "MD-78945"
    },
    scan: {
      type: "Brain MRI",
      date: "March 30, 2026",
      id: scanId
    },
    diagnosis: {
      primary: "Benign Brain Tumor",
      confidence: 92,
      location: "Left Frontal Lobe",
      size: "12mm diameter"
    },
    findings: [
      "Small mass detected in left frontal lobe measuring approximately 12mm in diameter",
      "Well-defined borders suggesting benign nature",
      "No surrounding edema detected",
      "No mass effect on adjacent structures",
      "Normal ventricular system and sulci",
      "No midline shift observed"
    ],
    aiAnalysis: {
      model: "Clinivue Neural Network v3.2",
      processingTime: "3.4 seconds",
      confidence: "92%",
      anomalyDetected: true
    },
    recommendations: [
      "Follow-up MRI in 3 months to monitor growth",
      "Consider neurosurgical consultation for evaluation",
      "Monitor for any neurological symptoms (headaches, vision changes, seizures)",
      "No immediate surgical intervention required at this time"
    ]
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => navigate(`/doctor/results/${scanId}`)}
          variant="outline"
          className="rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button className="rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Report Document */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* Report Header */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img src={logoImage} alt="Clinivue" className="w-16 h-16 bg-white rounded-xl p-2" />
              <div>
                <h1 className="text-2xl font-bold">Clinivue</h1>
                <p className="text-teal-100 text-sm">AI-Powered Medical Imaging Platform</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-teal-100">Report ID</div>
              <div className="font-bold">{reportData.reportId}</div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-4">
            <div className="text-3xl font-bold mb-2">Medical Imaging Analysis Report</div>
            <div className="text-teal-100">Generated on {reportData.date}</div>
          </div>
        </div>

        {/* Report Body */}
        <div className="p-8 space-y-8">
          {/* Patient Information */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b-2 border-teal-500">
              <FileText className="w-5 h-5 text-teal-600" />
              Patient Information
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Full Name</div>
                  <div className="font-semibold text-gray-900">{reportData.patient.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Patient ID</div>
                  <div className="font-semibold text-gray-900">{reportData.patient.id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Date of Birth</div>
                  <div className="font-semibold text-gray-900">{reportData.patient.dob}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Age</div>
                  <div className="font-semibold text-gray-900">{reportData.patient.age} years</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Gender</div>
                  <div className="font-semibold text-gray-900">{reportData.patient.gender}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Scan Date</div>
                  <div className="font-semibold text-gray-900">{reportData.scan.date}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Examination Details */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b-2 border-teal-500">
              <Brain className="w-5 h-5 text-teal-600" />
              Examination Details
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Scan Type</div>
                <div className="font-semibold text-gray-900">{reportData.scan.type}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Scan ID</div>
                <div className="font-semibold text-gray-900">{reportData.scan.id}</div>
              </div>
            </div>
          </section>

          {/* AI Analysis Results */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
              AI Analysis Results
            </h2>
            
            {/* Primary Diagnosis */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-2">PRIMARY DIAGNOSIS</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{reportData.diagnosis.primary}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-700">
                      <strong>Location:</strong> {reportData.diagnosis.location}
                    </span>
                    <span className="text-gray-700">
                      <strong>Size:</strong> {reportData.diagnosis.size}
                    </span>
                  </div>
                </div>
                <div className="text-center px-6 py-3 rounded-xl bg-white shadow-sm">
                  <div className="text-3xl font-bold text-teal-600">{reportData.diagnosis.confidence}%</div>
                  <div className="text-xs text-gray-600">Confidence</div>
                </div>
              </div>
            </div>

            {/* AI Model Information */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="text-sm text-gray-600">AI Model</div>
                <div className="font-semibold text-gray-900 text-sm">{reportData.aiAnalysis.model}</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="text-sm text-gray-600">Processing Time</div>
                <div className="font-semibold text-gray-900">{reportData.aiAnalysis.processingTime}</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="text-sm text-gray-600">Anomaly Status</div>
                <div className="font-semibold text-orange-600">Detected</div>
              </div>
            </div>
          </section>

          {/* Detailed Findings */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
              Detailed Findings
            </h2>
            <div className="space-y-2">
              {reportData.findings.map((finding, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="flex-1 text-gray-700">{finding}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Scan Visualization Placeholder */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
              Scan Visualization with AI Heatmap
            </h2>
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 aspect-video flex items-center justify-center">
              <Brain className="w-32 h-32 text-teal-400 opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-red-500/20"></div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute top-1/3 left-1/3 w-24 h-24 rounded-full bg-red-500/60 blur-2xl"
              />
              <div className="absolute bottom-4 left-4 px-4 py-2 rounded-lg bg-black/50 backdrop-blur-sm text-white text-sm">
                AI-detected anomaly region highlighted in red
              </div>
            </div>
          </section>

          {/* Recommendations */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
              Medical Recommendations
            </h2>
            <div className="space-y-3">
              {reportData.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
                  <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="flex-1 text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Physician Signature */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
              Reviewing Physician
            </h2>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-lg font-bold text-gray-900">{reportData.doctor.name}</div>
                <div className="text-gray-600">{reportData.doctor.specialty}</div>
                <div className="text-sm text-gray-500">License: {reportData.doctor.license}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Digital Signature</div>
                <div className="mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold">
                  Verified
                </div>
                <div className="text-xs text-gray-500 mt-1">{reportData.date}</div>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="border-t-2 border-gray-200 pt-6">
            <div className="p-6 rounded-xl bg-yellow-50 border border-yellow-200">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">⚠️ Important Disclaimer</h3>
              <p className="text-xs text-gray-700 leading-relaxed">
                This report is generated using AI-powered medical imaging analysis as a diagnostic aid. 
                The AI analysis should be used in conjunction with clinical judgment and is not intended 
                to replace professional medical evaluation. All findings should be reviewed and confirmed 
                by qualified medical professionals. Clinivue and its AI systems are FDA-approved for 
                diagnostic assistance purposes only.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 pt-6 border-t border-gray-200">
            <p>This is an electronically generated report by Clinivue AI Medical Imaging Platform</p>
            <p className="mt-1">Report ID: {reportData.reportId} | Generated: {reportData.date}</p>
            <p className="mt-2">© 2026 Clinivue. All rights reserved.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}