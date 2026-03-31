"""
Doctor Routes
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User, DoctorProfile, PatientProfile
from app.models.medical import MedicalReport, ScanUpload, AIAnalysis
from app import db

doctors_bp = Blueprint('doctors', __name__)

@doctors_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_doctor_profile():
    """Get current doctor's profile"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user.role != 'doctor':
        return jsonify({
            'success': False,
            'error': 'Access denied'
        }), 403

    if not current_user.doctor_profile:
        return jsonify({
            'success': False,
            'error': 'Doctor profile not found'
        }), 404

    return jsonify({
        'success': True,
        'data': current_user.doctor_profile.to_dict()
    }), 200


@doctors_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_doctor_profile():
    """Update doctor's profile"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user.role != 'doctor':
        return jsonify({
            'success': False,
            'error': 'Access denied'
        }), 403

    if not current_user.doctor_profile:
        return jsonify({
            'success': False,
            'error': 'Doctor profile not found'
        }), 404

    data = request.get_json()
    profile = current_user.doctor_profile

    # Update allowed fields
    allowed_fields = ['name', 'specialty', 'license_number', 'phone', 'department']

    for field in allowed_fields:
        if field in data:
            setattr(profile, field, data[field])

    try:
        db.session.commit()
        return jsonify({
            'success': True,
            'message': 'Doctor profile updated successfully',
            'data': profile.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': 'Update failed'
        }), 500


@doctors_bp.route('/dashboard/stats', methods=['GET'])
@jwt_required()
def get_doctor_dashboard_stats():
    """Get doctor's dashboard statistics"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user.role != 'doctor':
        return jsonify({
            'success': False,
            'error': 'Access denied'
        }), 403

    # Mock statistics - in real app, calculate from database
    stats = {
        'total_patients': PatientProfile.query.count(),
        'total_scans': ScanUpload.query.count(),
        'pending_reviews': ScanUpload.query.filter_by(status='Pending').count(),
        'completed_today': 8  # Mock value
    }

    return jsonify({
        'success': True,
        'data': stats
    }), 200