"""
Reports Routes
"""

import os
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from app.models.user import User, PatientProfile
from app.models.medical import MedicalReport, ReportExplanation
from app.services.ai_service import AIService
from app import db
import json

reports_bp = Blueprint('reports', __name__)

def allowed_file(filename):
    """Check if file extension is allowed"""
    ALLOWED_EXTENSIONS = {'pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@reports_bp.route('', methods=['GET'])
@jwt_required()
def get_reports():
    """Get reports for current user"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user.role == 'patient':
        # Patients see their own reports
        patient_profile = current_user.patient_profile
        if not patient_profile:
            return jsonify({
                'success': False,
                'error': 'Patient profile not found'
            }), 404
        reports = MedicalReport.query.filter_by(patient_id=patient_profile.id).all()
    else:
        # Doctors see all reports
        reports = MedicalReport.query.all()

    return jsonify({
        'success': True,
        'data': [report.to_dict() for report in reports]
    }), 200


@reports_bp.route('/<int:report_id>', methods=['GET'])
@jwt_required()
def get_report(report_id):
    """Get specific report"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    report = MedicalReport.query.get(report_id)
    if not report:
        return jsonify({
            'success': False,
            'error': 'Report not found'
        }), 404

    # Check access permissions
    if current_user.role == 'patient':
        patient_profile = current_user.patient_profile
        if not patient_profile or report.patient_id != patient_profile.id:
            return jsonify({
                'success': False,
                'error': 'Access denied'
            }), 403

    return jsonify({
        'success': True,
        'data': report.to_dict()
    }), 200


@reports_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_report():
    """Upload a medical report"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user.role != 'patient':
        return jsonify({
            'success': False,
            'error': 'Only patients can upload reports'
        }), 403

    patient_profile = current_user.patient_profile
    if not patient_profile:
        return jsonify({
            'success': False,
            'error': 'Patient profile not found'
        }), 404

    # Check if file is present
    if 'file' not in request.files:
        return jsonify({
            'success': False,
            'error': 'No file provided'
        }), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({
            'success': False,
            'error': 'No file selected'
        }), 400

    if not allowed_file(file.filename):
        return jsonify({
            'success': False,
            'error': 'File type not allowed'
        }), 400

    # Get metadata
    title = request.form.get('title', 'Medical Report')
    report_type = request.form.get('report_type', 'General')
    doctor = request.form.get('doctor', '')

    try:
        # Save file
        filename = secure_filename(file.filename)
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], 'reports', filename)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        file.save(file_path)

        # Create report record
        from datetime import date
        report = MedicalReport(
            patient_id=patient_profile.id,
            title=title,
            report_type=report_type,
            date=date.today(),
            doctor=doctor,
            file_path=file_path,
            status='Pending'
        )

        db.session.add(report)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Report uploaded successfully',
            'data': {
                'report_id': report.id,
                'file_id': f'REPORT-{report.id}',
                'processing_status': 'queued'
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': 'Upload failed'
        }), 500


@reports_bp.route('/<int:report_id>/analyze', methods=['POST'])
@jwt_required()
def analyze_report(report_id):
    """Generate AI explanation for a report"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    report = MedicalReport.query.get(report_id)
    if not report:
        return jsonify({
            'success': False,
            'error': 'Report not found'
        }), 404

    # Check access permissions
    if current_user.role == 'patient':
        patient_profile = current_user.patient_profile
        if not patient_profile or report.patient_id != patient_profile.id:
            return jsonify({
                'success': False,
                'error': 'Access denied'
            }), 403

    try:
        # Get AI service
        ai_service = AIService()

        # Generate explanation
        explanation_data = ai_service.explain_report(report)

        # Save explanation
        explanation = ReportExplanation(
            report_id=report.id,
            **explanation_data
        )
        db.session.add(explanation)

        # Update report status
        report.status = 'Analyzed'
        db.session.commit()

        return jsonify({
            'success': True,
            'data': explanation.to_dict()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': 'Analysis failed'
        }), 500