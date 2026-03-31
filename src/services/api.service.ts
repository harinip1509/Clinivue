// ============================================
// Mock API Service for Backend Integration
// This simulates real API calls with delays
// Replace with actual fetch calls to backend
// ============================================

import type {
  APIResponse,
  Patient,
  MedicalReport,
  MedicalScan,
  ScanAnalysis,
  ReportAnalysis,
  ChatMessage,
  ChatResponse,
  DashboardStats,
  HealthMetrics,
  Appointment,
  UploadResponse,
} from '../types/api';

// Simulated API delay
const API_DELAY = 1000;

// Helper function to simulate API calls
const simulateAPI = <T>(data: T, delay = API_DELAY): Promise<APIResponse<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data,
        status: 'success',
        error: null,
        message: 'Success',
      });
    }, delay);
  });
};

// Helper function to simulate API errors
const simulateAPIError = (errorMessage: string): Promise<APIResponse<null>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: null,
        status: 'error',
        error: errorMessage,
        message: 'Error occurred',
      });
    }, API_DELAY);
  });
};

// ============================================
// Mock Database
// ============================================

export const mockPatients: Patient[] = [
  {
    id: 'P-12345',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    age: 40,
    gender: 'Male',
    bloodType: 'O+',
    height: '5\'10"',
    weight: '180 lbs',
    address: '123 Health Street, Medical City, MC 12345',
    emergencyContact: 'Jane Smith - +1 (555) 987-6543',
    allergies: ['Penicillin', 'Peanuts', 'Pollen'],
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
    ],
    medicalHistory: [
      { condition: 'Hypertension', year: '2020', status: 'Controlled' },
      { condition: 'Type 2 Diabetes', year: '2018', status: 'Managed' },
    ],
  },
];

export const mockReports: MedicalReport[] = [
  {
    id: '1',
    title: 'Complete Blood Count (CBC)',
    type: 'Lab Report',
    date: '2026-03-28',
    status: 'Analyzed',
    summary: 'Cholesterol slightly elevated, other values normal',
    doctor: 'Dr. Sarah Johnson',
    pages: 5,
    priority: 'attention',
  },
  {
    id: '2',
    title: 'Brain MRI Scan',
    type: 'Imaging',
    date: '2026-03-25',
    status: 'Analyzed',
    summary: 'No abnormalities detected',
    doctor: 'Dr. Michael Chen',
    pages: 12,
    priority: 'normal',
  },
  {
    id: '3',
    title: 'Cardiology Consultation Report',
    type: 'Consultation',
    date: '2026-03-20',
    status: 'Analyzed',
    summary: 'Heart function within normal range',
    doctor: 'Dr. Emily Rodriguez',
    pages: 3,
    priority: 'normal',
  },
];

export const mockScans: MedicalScan[] = [
  {
    id: 'SCAN-001',
    patientId: 'P-12345',
    scanType: 'Brain MRI',
    uploadDate: '2026-03-31',
    status: 'Completed',
  },
  {
    id: 'SCAN-002',
    patientId: 'P-12345',
    scanType: 'Chest X-Ray',
    uploadDate: '2026-03-25',
    status: 'Completed',
  },
];

// ============================================
// API Service Functions
// ============================================

export const apiService = {
  // Authentication
  login: async (email: string, password: string): Promise<APIResponse<{ token: string; user: any }>> => {
    return simulateAPI({
      token: 'mock-jwt-token',
      user: { id: '1', email, role: 'patient' },
    });
  },

  // Patients
  getPatients: async (): Promise<APIResponse<Patient[]>> => {
    return simulateAPI(mockPatients);
  },

  getPatient: async (id: string): Promise<APIResponse<Patient>> => {
    const patient = mockPatients.find((p) => p.id === id);
    if (!patient) {
      return simulateAPIError('Patient not found');
    }
    return simulateAPI(patient);
  },

  updatePatient: async (id: string, data: Partial<Patient>): Promise<APIResponse<Patient>> => {
    const patientIndex = mockPatients.findIndex((p) => p.id === id);
    if (patientIndex === -1) {
      return simulateAPIError('Patient not found');
    }
    mockPatients[patientIndex] = { ...mockPatients[patientIndex], ...data };
    return simulateAPI(mockPatients[patientIndex]);
  },

  // Reports
  getReports: async (): Promise<APIResponse<MedicalReport[]>> => {
    return simulateAPI(mockReports);
  },

  getReport: async (id: string): Promise<APIResponse<MedicalReport>> => {
    const report = mockReports.find((r) => r.id === id);
    if (!report) {
      return simulateAPIError('Report not found');
    }
    return simulateAPI(report);
  },

  uploadReport: async (file: File, metadata: any): Promise<APIResponse<UploadResponse>> => {
    return simulateAPI({
      success: true,
      fileId: `REPORT-${Date.now()}`,
      message: 'Report uploaded successfully',
      processingStatus: 'queued',
    }, 2000);
  },

  analyzeReport: async (reportId: string): Promise<APIResponse<ReportAnalysis>> => {
    const analysis: ReportAnalysis = {
      reportId,
      reportTitle: 'Complete Blood Count (CBC) Test Results',
      analysisDate: new Date().toISOString(),
      status: 'attention',
      simpleSummary: 'Your blood test results show that most of your blood counts are within normal range. However, your cholesterol levels are slightly elevated.',
      keyFindings: [
        {
          title: 'Red Blood Cells',
          value: '4.8 million/mcL',
          status: 'normal',
          explanation: 'Red blood cells carry oxygen throughout your body. Your count is healthy and normal.',
          normalRange: '4.5-5.5 million/mcL',
        },
        {
          title: 'Cholesterol',
          value: '225 mg/dL',
          status: 'attention',
          explanation: 'Total cholesterol is a bit high. Aim for below 200 mg/dL.',
          normalRange: 'Below 200 mg/dL',
        },
      ],
      medicalTerms: [
        {
          term: 'Hemoglobin (Hb)',
          simpleExplanation: 'A protein in red blood cells that carries oxygen from your lungs to the rest of your body.',
        },
      ],
      recommendations: [
        'Consider adopting a heart-healthy diet low in saturated fats',
        'Engage in at least 30 minutes of moderate exercise most days',
      ],
      whatThisMeans: 'Overall, your blood test shows you are in good health! The slightly high cholesterol is a common issue that can be easily managed.',
    };
    return simulateAPI(analysis, 2500);
  },

  // Scans
  getScans: async (): Promise<APIResponse<MedicalScan[]>> => {
    return simulateAPI(mockScans);
  },

  getScan: async (id: string): Promise<APIResponse<MedicalScan>> => {
    const scan = mockScans.find((s) => s.id === id);
    if (!scan) {
      return simulateAPIError('Scan not found');
    }
    return simulateAPI(scan);
  },

  uploadScan: async (file: File, metadata: any): Promise<APIResponse<UploadResponse>> => {
    return simulateAPI({
      success: true,
      fileId: `SCAN-${Date.now()}`,
      message: 'Scan uploaded successfully',
      processingStatus: 'queued',
    }, 2000);
  },

  analyzeScan: async (scanId: string): Promise<APIResponse<ScanAnalysis>> => {
    const analysis: ScanAnalysis = {
      scanId,
      scanType: 'Brain MRI',
      analysisDate: new Date().toISOString(),
      diagnosis: 'No Abnormalities Detected',
      confidence: 94,
      riskLevel: 'low',
      status: 'normal',
      summary: 'The brain MRI scan shows normal brain structure with no signs of tumors, lesions, or abnormal growths.',
      keyFindings: [
        {
          title: 'Brain Structure',
          status: 'normal',
          description: 'All major brain structures appear normal in size and position.',
        },
        {
          title: 'White Matter',
          status: 'normal',
          description: 'No white matter lesions or abnormalities detected.',
        },
      ],
      recommendations: [
        'Continue routine health monitoring',
        'No immediate follow-up required',
      ],
      aiExplanation: 'The AI model analyzed 156 different features across the brain scan, comparing them with a database of over 500,000 similar scans.',
      detectedAbnormalities: [],
    };
    return simulateAPI(analysis, 3000);
  },

  // Chat
  sendChatMessage: async (message: string, context?: any): Promise<APIResponse<ChatResponse>> => {
    const response: ChatResponse = {
      message: generateAIResponse(message),
      confidence: 0.92,
      sources: ['Medical Database', 'Patient Records'],
      timestamp: new Date().toISOString(),
    };
    return simulateAPI(response, 1500);
  },

  getChatHistory: async (patientId: string): Promise<APIResponse<ChatMessage[]>> => {
    return simulateAPI([], 500);
  },

  // Dashboard
  getDashboardStats: async (userRole: 'doctor' | 'patient'): Promise<APIResponse<DashboardStats>> => {
    const stats: DashboardStats = userRole === 'doctor'
      ? {
          totalPatients: 248,
          totalScans: 156,
          pendingReviews: 12,
          completedToday: 8,
        }
      : {
          totalReports: 12,
          analyzedReports: 8,
          needsAttention: 2,
          healthScore: 94,
        };
    return simulateAPI(stats, 800);
  },

  getRecentAppointments: async (): Promise<APIResponse<Appointment[]>> => {
    const appointments: Appointment[] = [
      {
        id: '1',
        doctor: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        date: 'April 5, 2026',
        time: '10:30 AM',
        type: 'Follow-up',
        status: 'Scheduled',
      },
    ];
    return simulateAPI(appointments, 600);
  },

  // Health Metrics
  getHealthMetrics: async (patientId: string): Promise<APIResponse<HealthMetrics>> => {
    const metrics: HealthMetrics = {
      bloodPressure: {
        systolic: 118,
        diastolic: 76,
        unit: 'mm Hg',
        status: 'normal',
        lastUpdated: '2026-03-31',
      },
      heartRate: {
        value: 72,
        unit: 'bpm',
        status: 'normal',
        lastUpdated: '2026-03-31',
      },
      bloodSugar: {
        value: 95,
        unit: 'mg/dL',
        status: 'normal',
        lastUpdated: '2026-03-31',
      },
      cholesterol: {
        total: 225,
        ldl: 150,
        hdl: 45,
        unit: 'mg/dL',
        status: 'attention',
        lastUpdated: '2026-03-28',
      },
    };
    return simulateAPI(metrics, 700);
  },
};

// Helper function to generate AI responses
function generateAIResponse(question: string): string {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('cholesterol')) {
    return "Based on your recent blood test, your total cholesterol is 225 mg/dL, which is slightly elevated. The ideal level is below 200 mg/dL. Consider eating more fiber-rich foods and exercising regularly.";
  }
  
  if (lowerQuestion.includes('blood test')) {
    return "Your recent CBC shows most values are normal. Your cholesterol needs attention, but it's manageable with lifestyle changes.";
  }

  return "I'm here to help you understand your health better! Feel free to ask me about your medical reports, test results, or any health concerns.";
}
