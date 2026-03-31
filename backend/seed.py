#!/usr/bin/env python3
"""
Database Seed Script
"""

from app import create_app, db
from app.models.user import User, PatientProfile, DoctorProfile
from app.models.medical import MedicalReport, ScanUpload
from datetime import date

def seed_database():
    """Seed the database with sample data"""
    app = create_app()

    with app.app_context():
        # Create all tables
        db.create_all()

        # Check if data already exists
        if User.query.count() > 0:
            print("Database already seeded. Skipping...")
            return

        print("Seeding database...")

        # Create doctors
        doctor1 = User(email='doctor@clinivue.com', password='doctor123', role='doctor')
        doctor2 = User(email='dr.smith@clinivue.com', password='password123', role='doctor')

        db.session.add(doctor1)
        db.session.add(doctor2)
        db.session.flush()

        doctor_profile1 = DoctorProfile(
            user_id=doctor1.id,
            name='Dr. Sarah Chen',
            specialty='Cardiology',
            license_number='MD12345',
            phone='+1 (555) 123-4567',
            department='Cardiology'
        )

        doctor_profile2 = DoctorProfile(
            user_id=doctor2.id,
            name='Dr. John Smith',
            specialty='Radiology',
            license_number='MD67890',
            phone='+1 (555) 987-6543',
            department='Radiology'
        )

        db.session.add(doctor_profile1)
        db.session.add(doctor_profile2)

        # Create patients
        patient1 = User(email='patient@clinivue.com', password='patient123', role='patient')
        patient2 = User(email='john.doe@email.com', password='password123', role='patient')

        db.session.add(patient1)
        db.session.add(patient2)
        db.session.flush()

        patient_profile1 = PatientProfile(
            user_id=patient1.id,
            name='Emma Watson',
            phone='+1 (555) 111-2222',
            date_of_birth=date(1990, 4, 15),
            gender='Female',
            blood_type='O+',
            height='5\'6"',
            weight='140 lbs',
            address='123 Health Street, Medical City, MC 12345',
            emergency_contact='John Watson - +1 (555) 333-4444',
            allergies='["Penicillin", "Peanuts"]',
            medications='[{"name": "Vitamin D", "dosage": "1000 IU", "frequency": "Once daily"}]',
            medical_history='[{"condition": "Hypertension", "year": "2020", "status": "Controlled"}]'
        )

        patient_profile2 = PatientProfile(
            user_id=patient2.id,
            name='John Doe',
            phone='+1 (555) 555-6666',
            date_of_birth=date(1985, 6, 20),
            gender='Male',
            blood_type='A+',
            height='5\'10"',
            weight='180 lbs',
            address='456 Wellness Ave, Health Town, HT 67890',
            emergency_contact='Jane Doe - +1 (555) 777-8888',
            allergies='["Shellfish"]',
            medications='[{"name": "Metformin", "dosage": "500mg", "frequency": "Twice daily"}]',
            medical_history='[{"condition": "Type 2 Diabetes", "year": "2018", "status": "Managed"}]'
        )

        db.session.add(patient_profile1)
        db.session.add(patient_profile2)
        db.session.flush()

        # Create sample reports
        report1 = MedicalReport(
            patient_id=patient_profile1.id,
            title='Complete Blood Count (CBC)',
            report_type='Lab Report',
            date=date(2026, 3, 28),
            status='Analyzed',
            summary='Cholesterol slightly elevated, other values normal',
            doctor='Dr. Sarah Chen',
            pages=5,
            priority='attention'
        )

        report2 = MedicalReport(
            patient_id=patient_profile1.id,
            title='Brain MRI Scan',
            report_type='Imaging',
            date=date(2026, 3, 25),
            status='Analyzed',
            summary='No abnormalities detected',
            doctor='Dr. Michael Chen',
            pages=12,
            priority='normal'
        )

        db.session.add(report1)
        db.session.add(report2)

        # Create sample scans
        scan1 = ScanUpload(
            patient_id=patient_profile1.id,
            scan_type='Brain MRI',
            status='Completed'
        )

        scan2 = ScanUpload(
            patient_id=patient_profile1.id,
            scan_type='Chest X-Ray',
            status='Completed'
        )

        db.session.add(scan1)
        db.session.add(scan2)

        # Commit all changes
        db.session.commit()

        print("Database seeded successfully!")
        print("Sample users created:")
        print("- Doctor: doctor@clinivue.com / doctor123")
        print("- Patient: patient@clinivue.com / patient123")

if __name__ == '__main__':
    seed_database()