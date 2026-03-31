# Clinivue Backend

A production-ready Flask backend for the Clinivue medical application, providing authentication, file uploads, AI-powered medical analysis, and comprehensive API endpoints for both patients and doctors.

## Features

- **Authentication System**: JWT-based authentication with role-based access control
- **User Management**: Separate profiles for patients and doctors
- **Medical Reports**: Upload, store, and analyze medical reports
- **Medical Scans**: Upload and AI-analyze medical imaging
- **AI Integration**: Mock AI services for report explanation and scan analysis
- **File Upload**: Secure file handling with validation
- **RESTful APIs**: Comprehensive API endpoints for frontend integration

## Tech Stack

- **Framework**: Flask 2.3.3
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: Flask-JWT-Extended
- **Migrations**: Flask-Migrate
- **Validation**: Marshmallow
- **Password Hashing**: bcrypt
- **CORS**: Flask-CORS

## Quick Start

### Prerequisites

- Python 3.8+
- PostgreSQL (or SQLite for development)

### Installation

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Initialize database:**
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

6. **Seed database with sample data:**
   ```bash
   python seed.py
   ```

7. **Run the application:**
   ```bash
   python run.py
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user info

### Patients
- `GET /api/patients` - Get all patients (doctor only)
- `GET /api/patients/{id}` - Get patient profile
- `PUT /api/patients/{id}` - Update patient profile

### Doctors
- `GET /api/doctors/profile` - Get doctor profile
- `PUT /api/doctors/profile` - Update doctor profile
- `GET /api/doctors/dashboard/stats` - Get dashboard stats

### Reports
- `GET /api/reports` - Get reports
- `GET /api/reports/{id}` - Get specific report
- `POST /api/reports/upload` - Upload report
- `POST /api/reports/{id}/analyze` - Analyze report with AI

### Scans
- `GET /api/scans` - Get scans
- `GET /api/scans/{id}` - Get specific scan
- `POST /api/scans/upload` - Upload scan
- `POST /api/scans/{id}/analyze` - Analyze scan with AI

### Chat
- `POST /api/chat` - Send chat message
- `GET /api/chat/history` - Get chat history

### Health
- `GET /api/health` - Basic health check
- `GET /api/health/detailed` - Detailed health check

## Sample Users

After running the seed script, you can use these accounts:

**Doctor:**
- Email: `doctor@clinivue.com`
- Password: `doctor123`

**Patient:**
- Email: `patient@clinivue.com`
- Password: `patient123`

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://username:password@localhost:5432/clinivue_db
JWT_SECRET_KEY=your-jwt-secret-key-here
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=15
JWT_REFRESH_TOKEN_EXPIRE_DAYS=30
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Database Setup

For PostgreSQL:
```sql
CREATE DATABASE clinivue_db;
```

For development with SQLite, simply set:
```env
DATABASE_URL=sqlite:///clinivue.db
```

## Frontend Integration

### Authentication

Replace the mock auth service with API calls:

```typescript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, role })
});
const data = await response.json();
localStorage.setItem('access_token', data.access_token);
localStorage.setItem('refresh_token', data.refresh_token);
```

### API Calls

Update your API service to use real endpoints:

```typescript
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers
  };

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    // Handle token refresh or redirect to login
  }

  return response.json();
};
```

## Development

### Running Tests
```bash
pytest
```

### Database Migrations
```bash
flask db migrate -m "Migration message"
flask db upgrade
```

### Code Formatting
```bash
black .
flake8
```

## Production Deployment

1. Set `FLASK_ENV=production` in environment
2. Use a production WSGI server (gunicorn, uwsgi)
3. Set up proper database (PostgreSQL)
4. Configure reverse proxy (nginx)
5. Set up SSL certificates
6. Configure environment variables securely

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation
- File upload restrictions
- CORS configuration
- SQL injection prevention (SQLAlchemy)

## AI Integration

The backend includes mock AI services that can be easily replaced with real AI providers:

- **Report Explanation**: Currently returns mock explanations
- **Scan Analysis**: Currently returns mock analysis results
- **Chat**: Currently returns mock responses

To integrate real AI:
1. Set API keys in environment variables
2. Implement actual API calls in `AIService` class
3. Update the service methods to use real providers

## License

This project is part of the Clinivue application.