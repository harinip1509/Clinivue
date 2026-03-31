"""
Patient Routes
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User, PatientProfile
from app.models.medical import MedicalReport, ScanUpload, AIAnalysis
from app import db

patients_bp = Blueprint('patients', __name__)

@patients_bp.route('', methods=['GET'])
@jwt_required()
def get_patients():
    """Get all patients (doctor only)"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user.role != 'doctor':
        return jsonify({
            'success': False,
            'error': 'Access denied'
        }), 403

    patients = PatientProfile.query.all()
    return jsonify({
        'success': True,
        'data': [patient.to_dict() for patient in patients]
    }), 200


@patients_bp.route('/<int:patient_id>', methods=['GET'])
@jwt_required()
def get_patient(patient_id):
    """Get patient profile"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    patient = PatientProfile.query.get(patient_id)
    if not patient:
        return jsonify({
            'success': False,
            'error': 'Patient not found'
        }), 404

    # Patients can only view their own profile, doctors can view any
    if current_user.role == 'patient' and patient.user_id != current_user_id:
        return jsonify({
            'success': False,
            'error': 'Access denied'
        }), 403

    return jsonify({
        'success': True,
        'data': patient.to_dict()
    }), 200


@patients_bp.route('/<int:patient_id>', methods=['PUT'])
@jwt_required()
def update_patient(patient_id):
    """Update patient profile"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    patient = PatientProfile.query.get(patient_id)
    if not patient:
        return jsonify({
            'success': False,
            'error': 'Patient not found'
        }), 404

    # Patients can only update their own profile
    if current_user.role == 'patient' and patient.user_id != current_user_id:
        return jsonify({
            'success': False,
            'error': 'Access denied'
        }), 403

    data = request.get_json()

    # Update allowed fields
    allowed_fields = [
        'name', 'phone', 'date_of_birth', 'gender', 'blood_type',
        'height', 'weight', 'address', 'emergency_contact',
        'allergies', 'medications', 'medical_history'
    ]

    for field in allowed_fields:
        if field in data:
            setattr(patient, field, data[field])

    try:
        db.session.commit()
        return jsonify({
            'success': True,
            'message': 'Patient profile updated successfully',
            'data': patient.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': 'Update failed'
        }), 500


@patients_bp.route('/<int:patient_id>/reports', methods=['GET'])
@jwt_required()
def get_patient_reports(patient_id):
    """Get patient's medical reports"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    patient = PatientProfile.query.get(patient_id)
    if not patient:
        return jsonify({
            'success': False,
            'error': 'Patient not found'
        }), 404

    # Patients can only view their own reports, doctors can view any
    if current_user.role == 'patient' and patient.user_id != current_user_id:
        return jsonify({
            'success': False,
            'error': 'Access denied'
        }), 403

    reports = MedicalReport.query.filter_by(patient_id=patient_id).all()
    return jsonify({
        'success': True,
        'data': [report.to_dict() for report in reports]
    }), 200


@patients_bp.route('/<int:patient_id>/scans', methods=['GET'])
@jwt_required()
def get_patient_scans(patient_id):
    """Get patient's medical scans"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    patient = PatientProfile.query.get(patient_id)
    if not patient:
        return jsonify({
            'success': False,
            'error': 'Patient not found'
        }), 404

    # Patients can only view their own scans, doctors can view any
    if current_user.role == 'patient' and patient.user_id != current_user_id:
        return jsonify({
            'success': False,
            'error': 'Access denied'
        }), 403

    scans = ScanUpload.query.filter_by(patient_id=patient_id).all()
    return jsonify({
        'success': True,
        'data': [scan.to_dict() for scan in scans]
    }), 200