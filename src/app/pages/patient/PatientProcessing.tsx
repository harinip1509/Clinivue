import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Sparkles, Loader2, CheckCircle } from "lucide-react";
import { Card } from "../../components/ui/card";

export function PatientProcessing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate AI processing for 4 seconds
    const timer = setTimeout(() => {
      navigate("/patient/results/report-new-001");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const processingSteps = [
    { label: "Uploading your files", delay: 0 },
    { label: "Reading medical data", delay: 800 },
    { label: "Analyzing with AI", delay: 1600 },
    { label: "Generating insights", delay: 2400 },
    { label: "Preparing explanation", delay: 3200 },
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full p-12 backdrop-blur-xl bg-white/70 border-white/50 shadow-2xl">
        <div className="text-center">
          {/* Animated Icon */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-8"
          >
            <Sparkles className="w-12 h-12 text-blue-600" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            AI is Analyzing Your Report
          </h1>
          <p className="text-gray-600 mb-12">
            Please wait while we process your medical files and generate personalized insights...
          </p>

          {/* Processing Steps */}
          <div className="space-y-4 mb-12">
            {processingSteps.map((step, index) => (
              <ProcessingStep 
                key={index} 
                label={step.label} 
                delay={step.delay}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              />
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-sm text-gray-600 mt-3"
            >
              Almost done...
            </motion.div>
          </div>

          {/* Fun Facts */}
          <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
            <p className="text-sm text-gray-700">
              💡 <strong>Did you know?</strong> Our AI can analyze medical reports 10x faster than traditional methods!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ProcessingStep({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000 }}
      className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200"
    >
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: (delay / 1000) + 0.3 }}
        >
          <CheckCircle className="w-5 h-5 text-blue-600" />
        </motion.div>
        <span className="text-gray-900 font-medium">{label}</span>
      </div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: delay / 1000 }}
      >
        <Loader2 className="w-5 h-5 text-blue-600" />
      </motion.div>
    </motion.div>
  );
}