import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Upload, FileImage, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export function DoctorUpload() {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [scanType, setScanType] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
  };

  const handleAnalyze = () => {
    if (uploadedFile && patientName && patientId && scanType) {
      navigate('/doctor/analysis/1'); // Navigate to new analysis page
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Medical Scan</h1>
        <p className="text-gray-600">
          Upload MRI, X-ray, CT scan, or other medical images for AI analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          {/* Drag and Drop Area */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Upload Scan</h2>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                dragActive
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-300 hover:border-teal-400 bg-gray-50'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleChange}
                accept="image/*"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#14b8a6] flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-1">
                      Drop your files here or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports: JPEG, PNG, DICOM (Max 50MB)
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Patient Information */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  placeholder="Enter patient name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="mt-2 h-11 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  placeholder="Enter patient ID"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="mt-2 h-11 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="scanType">Scan Type</Label>
                <select
                  id="scanType"
                  value={scanType}
                  onChange={(e) => setScanType(e.target.value)}
                  className="mt-2 w-full h-11 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="">Select scan type</option>
                  <option value="Brain MRI">Brain MRI</option>
                  <option value="Chest X-Ray">Chest X-Ray</option>
                  <option value="CT Scan">CT Scan</option>
                  <option value="Ultrasound">Ultrasound</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>

            {uploadedFile && previewUrl ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="relative rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-80 object-cover"
                  />
                  <button
                    onClick={removeFile}
                    className="absolute top-3 right-3 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <FileImage className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-80 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-400">
                  <FileImage className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p>No file uploaded</p>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Info */}
          <div className="bg-[#0ea5e9] rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">AI Analysis Information</h3>
                <p className="text-sm opacity-90">
                  Our AI will analyze the uploaded scan and provide:
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm ml-9">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                Detailed diagnosis with confidence score
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                Highlighted areas of concern
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                Explainable AI insights
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                Downloadable medical report
              </li>
            </ul>
          </div>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={!uploadedFile || !patientName || !patientId || !scanType}
            className="w-full h-12 rounded-xl bg-[#14b8a6] hover:bg-[#0f766e] text-white font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start AI Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}