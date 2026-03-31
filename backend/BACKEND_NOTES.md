# Backend Implementation Notes

## Overview

This document outlines the implementation decisions, assumptions, and integration notes for the Clinivue Flask backend.

## Architecture Decisions

### 1. Database Design
- **PostgreSQL**: Chosen for production readiness, ACID compliance, and scalability
- **SQLAlchemy ORM**: Provides abstraction, relationships, and migration support
- **Separate Profile Tables**: Patient and doctor profiles are in separate tables for extensibility

### 2. Authentication
- **JWT Tokens**: Stateless authentication with access and refresh tokens
- **Role-Based Access**: Three roles (patient, doctor, admin) with different permissions
- **Password Hashing**: bcrypt for secure password storage

### 3. File Upload System
- **Organized Storage**: Files stored in categorized directories (reports/, scans/)
- **Validation**: File type and size restrictions
- **Metadata Storage**: File paths and metadata stored in database

### 4. AI Service Abstraction
- **Mock Implementation**: All AI features currently use mock responses
- **Provider Agnostic**: Easy to switch between OpenAI, Anthropic, or custom models
- **Structured Output**: Consistent JSON format for all AI responses

## Assumptions Made

### 1. Frontend Integration
- Frontend will handle token storage and refresh logic
- API responses follow the existing mock service structure
- File uploads will be handled via FormData

### 2. Data Models
- Patient profiles include comprehensive medical information
- Doctor profiles include professional credentials
- Medical reports and scans are linked to patients
- AI analyses are stored separately for auditability

### 3. Security
- All sensitive operations require authentication
- Patients can only access their own data
- Doctors can access all patient data
- File uploads are validated for type and size

### 4. AI Features
- AI responses are not medical diagnoses
- All AI outputs include appropriate disclaimers
- Mock responses provide realistic data for development

## Frontend Integration Changes Required

### 1. Authentication Service Replacement

Replace `src/app/services/mockAuth.ts` with API calls:

```typescript
// New auth service structure
export const authService = {
  async register(email: string, password: string, name: string, role: string) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role })
    });
    return response.json();
  },

  async login(email: string, password: string, role: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async getCurrentUser() {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    const response = await fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    return data.success ? data.user : null;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
};
```

### 2. API Service Updates

Update `src/services/api.service.ts` to use real endpoints:

```typescript
// Replace mock implementations with real API calls
const apiService = {
  // Authentication - now handled by authService

  // Patients
  async getPatients() {
    return await authenticatedFetch('/api/patients');
  },

  async getPatient(id: string) {
    return await authenticatedFetch(`/api/patients/${id}`);
  },

  // Reports
  async getReports() {
    return await authenticatedFetch('/api/reports');
  },

  async uploadReport(file: File, metadata: any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', metadata.title || 'Medical Report');
    formData.append('report_type', metadata.reportType || 'General');
    formData.append('doctor', metadata.doctor || '');

    return await authenticatedFetch('/api/reports/upload', {
      method: 'POST',
      body: formData,
      headers: {} // Let browser set content-type for FormData
    });
  },

  async analyzeReport(reportId: string) {
    return await authenticatedFetch(`/api/reports/${reportId}/analyze`, {
      method: 'POST'
    });
  },

  // Scans
  async getScans() {
    return await authenticatedFetch('/api/scans');
  },

  async uploadScan(file: File, metadata: any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('scan_type', metadata.scanType || 'Other');

    return await authenticatedFetch('/api/scans/upload', {
      method: 'POST',
      body: formData,
      headers: {}
    });
  },

  async analyzeScan(scanId: string) {
    return await authenticatedFetch(`/api/scans/${scanId}/analyze`, {
      method: 'POST'
    });
  },

  // Chat
  async sendChatMessage(message: string, context?: any) {
    return await authenticatedFetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context })
    });
  }
};

// Helper function for authenticated requests
async function authenticatedFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers
  };

  const response = await fetch(endpoint, {
    ...options,
    headers
  });

  // Handle token expiration
  if (response.status === 401) {
    // Try to refresh token or redirect to login
    authService.logout();
    window.location.href = '/login';
    throw new Error('Authentication expired');
  }

  const data = await response.json();
  return {
    data: data.data || null,
    status: data.success ? 'success' : 'error',
    error: data.error || null,
    message: data.message || ''
  };
}
```

### 3. Type Updates

Update API types in `src/types/api.ts` to match backend responses:

```typescript
// Update APIResponse to match backend format
export interface APIResponse<T> {
  data: T | null;
  status: 'success' | 'error';
  error: string | null;
  message?: string;
}

// Update User interface to include profile
export interface User {
  id: number;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  is_active: boolean;
  profile?: Patient | Doctor;
  created_at: string;
  updated_at: string;
}
```

### 4. Environment Configuration

Add backend URL to frontend environment:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Database Schema

### Core Tables
- `users`: Authentication and basic user info
- `patient_profiles`: Extended patient information
- `doctor_profiles`: Extended doctor information
- `medical_reports`: Patient medical reports
- `report_explanations`: AI-generated report explanations
- `scan_uploads`: Medical scan files
- `ai_analyses`: AI analysis results

### Relationships
- User → PatientProfile/DoctorProfile (1:1)
- PatientProfile → MedicalReport/ScanUpload (1:many)
- MedicalReport → ReportExplanation (1:many)
- ScanUpload → AIAnalysis (1:many)

## Security Considerations

### 1. Authentication
- JWT tokens expire in 15 minutes (access) and 30 days (refresh)
- Passwords hashed with bcrypt
- Role-based route protection

### 2. File Upload Security
- File type validation
- Size limits (16MB)
- Secure filename generation
- Organized directory structure

### 3. API Security
- Input validation on all endpoints
- SQL injection prevention via SQLAlchemy
- CORS configuration for frontend domains

## Performance Optimizations

### 1. Database
- Indexes on frequently queried fields
- Efficient queries with proper joins
- Connection pooling for production

### 2. File Handling
- Streaming file uploads
- Background processing for AI analysis (future)
- CDN integration for production (future)

## Future Enhancements

### 1. Real AI Integration
- OpenAI GPT-4 for text analysis
- Computer vision models for scan analysis
- Custom fine-tuned models for medical domain

### 2. Advanced Features
- Appointment scheduling
- Real-time chat with WebSocket
- Push notifications
- Multi-language support

### 3. Production Features
- Rate limiting
- Request logging
- Monitoring and metrics
- Backup and recovery

## Testing Strategy

### Unit Tests
- Model methods and business logic
- Utility functions
- AI service mocking

### Integration Tests
- API endpoints
- Authentication flow
- File upload process

### End-to-End Tests
- Complete user workflows
- Frontend-backend integration

## Deployment Considerations

### Development
- SQLite for quick setup
- Local file storage
- Mock AI services

### Production
- PostgreSQL database
- Cloud storage (AWS S3, etc.)
- Real AI API integrations
- Docker containerization
- Load balancing
- SSL/TLS encryption

## Monitoring and Maintenance

### Logs
- Application logs with structured format
- Error tracking and alerting
- Performance monitoring

### Backups
- Database backups
- File storage backups
- Configuration backups

### Updates
- Database migrations for schema changes
- API versioning for breaking changes
- Feature flags for gradual rollouts

## Support and Documentation

### API Documentation
- OpenAPI/Swagger specification
- Interactive API documentation
- Example requests and responses

### Developer Documentation
- Code documentation with docstrings
- Architecture diagrams
- Deployment guides

This backend provides a solid foundation for the Clinivue application with room for growth and production deployment.