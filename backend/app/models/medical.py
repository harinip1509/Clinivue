"""
Medical Models
"""

from app.models import BaseModel, db

class MedicalReport(BaseModel):
    """Medical report model"""
    __tablename__ = 'medical_reports'

    patient_id = db.Column(db.Integer, db.ForeignKey('patient_profiles.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    report_type = db.Column(db.String(50), nullable=False)  # 'Lab Report', 'Imaging', 'Consultation', 'General'
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), default='Pending')  # 'Pending', 'Analyzed', 'Action Required'
    summary = db.Column(db.Text)
    doctor = db.Column(db.String(100))
    pages = db.Column(db.Integer, default=1)
    priority = db.Column(db.String(20), default='normal')  # 'normal', 'attention', 'critical'
    file_path = db.Column(db.String(500))

    # Relationships
    explanations = db.relationship('ReportExplanation', backref='report', cascade='all, delete-orphan')

    def to_dict(self):
        """Convert to dictionary"""
        data = super().to_dict()
        data.update({
            'patient_id': self.patient_id,
            'title': self.title,
            'report_type': self.report_type,
            'date': self.date.isoformat() if self.date else None,
            'status': self.status,
            'summary': self.summary,
            'doctor': self.doctor,
            'pages': self.pages,
            'priority': self.priority,
            'file_path': self.file_path,
        })
        return data


class ReportExplanation(BaseModel):
    """AI-generated report explanation model"""
    __tablename__ = 'report_explanations'

    report_id = db.Column(db.Integer, db.ForeignKey('medical_reports.id'), nullable=False)
    simple_summary = db.Column(db.Text)
    key_findings = db.Column(db.Text)  # JSON string
    medical_terms = db.Column(db.Text)  # JSON string
    recommendations = db.Column(db.Text)  # JSON string
    what_this_means = db.Column(db.Text)
    ai_provider = db.Column(db.String(50), default='mock')

    def to_dict(self):
        """Convert to dictionary"""
        data = super().to_dict()
        data.update({
            'report_id': self.report_id,
            'simple_summary': self.simple_summary,
            'key_findings': self.key_findings,
            'medical_terms': self.medical_terms,
            'recommendations': self.recommendations,
            'what_this_means': self.what_this_means,
            'ai_provider': self.ai_provider,
        })
        return data


class ScanUpload(BaseModel):
    """Medical scan upload model"""
    __tablename__ = 'scan_uploads'

    patient_id = db.Column(db.Integer, db.ForeignKey('patient_profiles.id'), nullable=False)
    scan_type = db.Column(db.String(50), nullable=False)  # 'Brain MRI', 'Chest X-Ray', 'CT Scan', 'Ultrasound', 'Other'
    upload_date = db.Column(db.DateTime, default=db.func.current_timestamp())
    status = db.Column(db.String(20), default='Pending')  # 'Pending', 'Processing', 'Completed', 'Failed'
    file_path = db.Column(db.String(500))

    # Relationships
    analyses = db.relationship('AIAnalysis', backref='scan', cascade='all, delete-orphan')

    def to_dict(self):
        """Convert to dictionary"""
        data = super().to_dict()
        data.update({
            'patient_id': self.patient_id,
            'scan_type': self.scan_type,
            'upload_date': self.upload_date.isoformat() if self.upload_date else None,
            'status': self.status,
            'file_path': self.file_path,
        })
        return data


class AIAnalysis(BaseModel):
    """AI analysis result model"""
    __tablename__ = 'ai_analyses'

    scan_id = db.Column(db.Integer, db.ForeignKey('scan_uploads.id'), nullable=False)
    diagnosis = db.Column(db.String(200))
    confidence = db.Column(db.Float)  # 0-100
    risk_level = db.Column(db.String(20), default='low')  # 'low', 'medium', 'high'
    status = db.Column(db.String(20), default='normal')  # 'normal', 'attention', 'critical'
    summary = db.Column(db.Text)
    key_findings = db.Column(db.Text)  # JSON string
    recommendations = db.Column(db.Text)  # JSON string
    ai_explanation = db.Column(db.Text)
    detected_abnormalities = db.Column(db.Text)  # JSON string
    ai_provider = db.Column(db.String(50), default='mock')

    def to_dict(self):
        """Convert to dictionary"""
        data = super().to_dict()
        data.update({
            'scan_id': self.scan_id,
            'diagnosis': self.diagnosis,
            'confidence': self.confidence,
            'risk_level': self.risk_level,
            'status': self.status,
            'summary': self.summary,
            'key_findings': self.key_findings,
            'recommendations': self.recommendations,
            'ai_explanation': self.ai_explanation,
            'detected_abnormalities': self.detected_abnormalities,
            'ai_provider': self.ai_provider,
        })
        return data