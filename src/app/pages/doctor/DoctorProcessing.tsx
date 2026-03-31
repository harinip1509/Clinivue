import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Brain, CheckCircle, Loader } from 'lucide-react';

const analysisSteps = [
  { label: 'Uploading scan...', status: 'complete' },
  { label: 'Preprocessing image...', status: 'complete' },
  { label: 'Running AI analysis...', status: 'active' },
  { label: 'Generating insights...', status: 'pending' },
  { label: 'Creating report...', status: 'pending' },
];

export function DoctorProcessing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      navigate('/doctor/results/1');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 border border-gray-200/50 shadow-2xl text-center">
          {/* Animated Brain Icon */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#14b8a6] flex items-center justify-center shadow-lg"
          >
            <Brain className="w-12 h-12 text-white" />
          </motion.div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            AI Analysis in Progress
          </h2>
          <p className="text-gray-600 mb-8">
            Our advanced AI is analyzing your medical scan. This may take a few moments.
          </p>

          {/* Progress Steps */}
          <div className="space-y-4 mb-8">
            {analysisSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  step.status === 'complete'
                    ? 'bg-green-50 border border-green-200'
                    : step.status === 'active'
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex-shrink-0">
                  {step.status === 'complete' ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : step.status === 'active' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Loader className="w-6 h-6 text-blue-500" />
                    </motion.div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                  )}
                </div>
                <span
                  className={`font-medium ${
                    step.status === 'complete'
                      ? 'text-green-700'
                      : step.status === 'active'
                      ? 'text-blue-700'
                      : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Loading Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'easeInOut' }}
              className="absolute top-0 left-0 h-full bg-[#14b8a6] rounded-full"
            />
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Please do not close this window...
          </p>
        </div>
      </motion.div>
    </div>
  );
}