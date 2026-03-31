import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Upload, X, FileImage, FileText, Zap, Sparkles } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export function PatientUpload() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleAnalyze = () => {
    if (selectedFiles.length > 0) {
      navigate("/patient/analysis/1"); // Navigate to new analysis page
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-100 mb-4"
        >
          <Upload className="w-10 h-10 text-[#14b8a6]" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Medical Reports</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload your medical scans, reports, or prescriptions for AI-powered analysis and easy-to-understand explanations
        </p>
      </div>

      {/* Upload Area */}
      <Card className="p-8 backdrop-blur-xl bg-white/70 border-white/50 shadow-xl">
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          whileHover={{ scale: 1.01 }}
          className={`relative border-2 border-dashed rounded-2xl p-16 transition-all ${
            isDragging
              ? "border-teal-500 bg-teal-50"
              : "border-gray-300 bg-white"
          }`}
        >
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="text-center">
            <motion.div
              animate={{ y: isDragging ? -10 : 0 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-teal-100 mb-6"
            >
              <Upload className="w-12 h-12 text-[#14b8a6]" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {isDragging ? "Drop your files here" : "Drag & drop your files here"}
            </h3>
            <p className="text-gray-600 mb-6">or click to browse from your device</p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <FileImage className="w-4 h-4" />
                Images (JPG, PNG)
              </span>
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Documents (PDF)
              </span>
            </div>
          </div>
        </motion.div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Selected Files ({selectedFiles.length})</h3>
              <button
                onClick={() => setSelectedFiles([])}
                className="text-sm text-red-600 hover:text-red-700 font-semibold"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-3">
              {selectedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {file.type.startsWith("image/") ? (
                      <FileImage className="w-5 h-5 text-blue-600" />
                    ) : (
                      <FileText className="w-5 h-5 text-purple-600" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{file.name}</div>
                      <div className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex gap-4"
          >
            <Button
              onClick={handleAnalyze}
              className="flex-1 h-14 rounded-xl bg-[#14b8a6] hover:bg-[#0f766e] text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Analyze with AI
            </Button>
            <Button
              onClick={() => navigate("/patient")}
              variant="outline"
              className="px-8 h-14 rounded-xl"
            >
              Cancel
            </Button>
          </motion.div>
        )}
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 backdrop-blur-xl bg-teal-50/50 border-white/50">
          <Sparkles className="w-8 h-8 text-[#14b8a6] mb-3" />
          <h3 className="font-bold text-gray-900 mb-2">AI-Powered Analysis</h3>
          <p className="text-sm text-gray-600">
            Our advanced AI will analyze your reports and provide easy-to-understand insights
          </p>
        </Card>

        <Card className="p-6 backdrop-blur-xl bg-cyan-50/50 border-white/50">
          <FileText className="w-8 h-8 text-[#06b6d4] mb-3" />
          <h3 className="font-bold text-gray-900 mb-2">Simple Explanations</h3>
          <p className="text-sm text-gray-600">
            Get medical jargon translated into plain language you can understand
          </p>
        </Card>

        <Card className="p-6 backdrop-blur-xl bg-blue-50/50 border-white/50">
          <Upload className="w-8 h-8 text-[#3b82f6] mb-3" />
          <h3 className="font-bold text-gray-900 mb-2">Secure & Private</h3>
          <p className="text-sm text-gray-600">
            Your medical data is encrypted and stored securely with full privacy protection
          </p>
        </Card>
      </div>

      {/* Tips */}
      <Card className="p-6 backdrop-blur-xl bg-yellow-50/50 border-yellow-200">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          💡 Tips for Best Results
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span>Ensure images are clear and well-lit</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span>Upload the complete report (all pages if multiple)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span>PDF format works best for multi-page documents</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span>You can upload multiple files at once</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}