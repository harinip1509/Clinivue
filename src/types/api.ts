// ============================================
// API Response Types for Backend Integration
// ============================================

export type APIStatus = 'idle' | 'loading' | 'success' | 'error';

export interface APIResponse<T> {
  data: T | null;
  status: APIStatus;
  error: string | null;
  message?: string;
}

// ============================================
// Patient Types
// ============================================

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  height: string;
  weight: string;
  address: string;
  emergencyContact: string;
  allergies: string[];
  medications: Medication[];
  medicalHistory: MedicalHistoryItem[];
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate?: string;
}

export interface MedicalHistoryItem {
  condition: string;
  year: string;
  status: 'Active' | 'Controlled' | 'Managed' | 'Resolved';
}

// ============================================
// Health Metrics Types
// ============================================

export interface HealthMetrics {
  bloodPressure: {
    systolic: number;
    diastolic: number;
    unit: string;
    status: 'normal' | 'attention' | 'critical';
    lastUpdated: string;
  };
  heartRate: {
    value: number;
    unit: string;
    status: 'normal' | 'attention' | 'critical';
    lastUpdated: string;
  };
  bloodSugar: {
    value: number;
    unit: string;
    status: 'normal' | 'attention' | 'critical';
    lastUpdated: string;
  };
  cholesterol: {
    total: number;
    ldl?: number;
    hdl?: number;
    unit: string;
    status: 'normal' | 'attention' | 'critical';
    lastUpdated: string;
  };
}

// ============================================
// Medical Report Types
// ============================================

export interface MedicalReport {
  id: string;
  title: string;
  type: 'Lab Report' | 'Imaging' | 'Consultation' | 'General';
  date: string;
  status: 'Pending' | 'Analyzed' | 'Action Required';
  summary: string;
  doctor: string;
  pages: number;
  priority: 'normal' | 'attention' | 'critical';
  fileUrl?: string;
  aiAnalysis?: ReportAnalysis;
}

export interface ReportAnalysis {
  reportId: string;
  reportTitle: string;
  analysisDate: string;
  status: 'normal' | 'attention' | 'critical';
  simpleSummary: string;
  keyFindings: KeyFinding[];
  medicalTerms: MedicalTerm[];
  recommendations: string[];
  whatThisMeans: string;
}

export interface KeyFinding {
  title: string;
  value: string;
  status: 'normal' | 'attention' | 'critical';
  explanation: string;
  normalRange: string;
}

export interface MedicalTerm {
  term: string;
  simpleExplanation: string;
}

// ============================================
// Medical Scan Types (Image-based AI)
// ============================================

export interface MedicalScan {
  id: string;
  patientId: string;
  scanType: 'Brain MRI' | 'Chest X-Ray' | 'CT Scan' | 'Ultrasound' | 'Other';
  uploadDate: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  fileUrl?: string;
  aiAnalysis?: ScanAnalysis;
}

export interface ScanAnalysis {
  scanId: string;
  scanType: string;
  analysisDate: string;
  diagnosis: string;
  confidence: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high';
  status: 'normal' | 'attention' | 'critical';
  summary: string;
  keyFindings: ScanFinding[];
  recommendations: string[];
  aiExplanation: string;
  detectedAbnormalities: Abnormality[];
}

export interface ScanFinding {
  title: string;
  status: 'normal' | 'attention' | 'critical';
  description: string;
}

export interface Abnormality {
  type: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  description: string;
}

// ============================================
// Chat / AI Assistant Types
// ============================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: FileAttachment[];
}

export interface FileAttachment {
  name: string;
  type: string;
  size: string;
  url?: string;
}

export interface ChatRequest {
  message: string;
  context?: {
    patientId?: string;
    reportId?: string;
    scanId?: string;
  };
  attachments?: File[];
}

export interface ChatResponse {
  message: string;
  confidence?: number;
  sources?: string[];
  timestamp: string;
}

// ============================================
// Dashboard Stats Types
// ============================================

export interface DashboardStats {
  totalPatients?: number;
  totalScans?: number;
  pendingReviews?: number;
  completedToday?: number;
  totalReports?: number;
  analyzedReports?: number;
  needsAttention?: number;
  healthScore?: number;
}

export interface Appointment {
  id: string;
  patientId?: string;
  patientName?: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

// ============================================
// Upload Types
// ============================================

export interface UploadRequest {
  file: File;
  type: 'scan' | 'report';
  metadata: {
    patientId?: string;
    patientName?: string;
    scanType?: string;
    reportType?: string;
    notes?: string;
  };
}

export interface UploadResponse {
  success: boolean;
  fileId: string;
  message: string;
  processingStatus: 'queued' | 'processing' | 'completed' | 'failed';
}

// ============================================
// Doctor-Specific Types
// ============================================

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  licenseNumber: string;
  phone: string;
  department: string;
  patientsCount?: number;
  scansReviewed?: number;
}

// ============================================
// API Endpoints Structure (for reference)
// ============================================

export interface APIEndpoints {
  // Authentication
  login: '/api/auth/login';
  logout: '/api/auth/logout';
  
  // Patients
  getPatients: '/api/patients';
  getPatient: '/api/patients/:id';
  updatePatient: '/api/patients/:id';
  
  // Reports
  getReports: '/api/reports';
  getReport: '/api/reports/:id';
  uploadReport: '/api/reports/upload';
  analyzeReport: '/api/reports/:id/analyze';
  
  // Scans
  getScans: '/api/scans';
  getScan: '/api/scans/:id';
  uploadScan: '/api/scans/upload';
  analyzeScan: '/api/scans/:id/analyze';
  
  // Chat
  sendMessage: '/api/chat';
  getChatHistory: '/api/chat/history';
  
  // Dashboard
  getDashboardStats: '/api/dashboard/stats';
  getRecentActivity: '/api/dashboard/activity';
  
  // Health Metrics
  getHealthMetrics: '/api/health-metrics/:patientId';
  updateHealthMetrics: '/api/health-metrics/:patientId';
}

// ============================================
// Utility Types
// ============================================

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export interface FilterOptions {
  searchQuery?: string;
  type?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
