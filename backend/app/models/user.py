"""
User Models
"""

import bcrypt
from app.models import BaseModel, db

class User(BaseModel):
    """User model"""
    __tablename__ = 'users'

    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'patient', 'doctor', 'admin'
    is_active = db.Column(db.Boolean, default=True)

    # Relationships
    patient_profile = db.relationship('PatientProfile', backref='user', uselist=False, cascade='all, delete-orphan')
    doctor_profile = db.relationship('DoctorProfile', backref='user', uselist=False, cascade='all, delete-orphan')

    def __init__(self, email, password, role):
        self.email = email
        self.role = role
        self.set_password(password)

    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        """Check password against hash"""
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

    def to_dict(self):
        """Convert to dictionary (exclude sensitive data)"""
        data = super().to_dict()
        data.update({
            'email': self.email,
            'role': self.role,
            'is_active': self.is_active,
        })
        return data

    def to_auth_dict(self):
        """Convert to dictionary for authentication responses"""
        data = self.to_dict()
        if self.patient_profile:
            data['profile'] = self.patient_profile.to_dict()
        elif self.doctor_profile:
            data['profile'] = self.doctor_profile.to_dict()
        return data


class PatientProfile(BaseModel):
    """Patient profile model"""
    __tablename__ = 'patient_profiles'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(20))
    blood_type = db.Column(db.String(10))
    height = db.Column(db.String(20))
    weight = db.Column(db.String(20))
    address = db.Column(db.Text)
    emergency_contact = db.Column(db.String(200))
    allergies = db.Column(db.Text)  # JSON string
    medications = db.Column(db.Text)  # JSON string
    medical_history = db.Column(db.Text)  # JSON string

    def to_dict(self):
        """Convert to dictionary"""
        data = super().to_dict()
        data.update({
            'user_id': self.user_id,
            'name': self.name,
            'phone': self.phone,
            'date_of_birth': self.date_of_birth.isoformat() if self.date_of_birth else None,
            'gender': self.gender,
            'blood_type': self.blood_type,
            'height': self.height,
            'weight': self.weight,
            'address': self.address,
            'emergency_contact': self.emergency_contact,
            'allergies': self.allergies,
            'medications': self.medications,
            'medical_history': self.medical_history,
        })
        return data


class DoctorProfile(BaseModel):
    """Doctor profile model"""
    __tablename__ = 'doctor_profiles'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    name = db.Column(db.String(100), nullable=False)
    specialty = db.Column(db.String(100))
    license_number = db.Column(db.String(50), unique=True)
    phone = db.Column(db.String(20))
    department = db.Column(db.String(100))

    def to_dict(self):
        """Convert to dictionary"""
        data = super().to_dict()
        data.update({
            'user_id': self.user_id,
            'name': self.name,
            'specialty': self.specialty,
            'license_number': self.license_number,
            'phone': self.phone,
            'department': self.department,
        })
        return data