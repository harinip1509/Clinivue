"""
Scans Routes
"""

import os
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from app.models.user import User, PatientProfile
from app.models.medical import ScanUpload, AIAnalysis
from app.services.ai_service import AIService
from app import db

scans_bp = Blueprint('scans', __name__)

def allowed_scan_file(filename):
    """Check if scan file extension is allowed"""
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'dcm', 'nii', 'dicom'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@scans_bp.route('', methods=['GET'])
@jwt_required()
def get_scans():
    """Get scans for current user"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user.role == 'patient':
        # Patients see their own scans
        patient_profile = current_user.patient_profile
        if not patient_profile:
            return jsonify({
                'success': False,
                'error': 'Patient profile not found'
            }), 404
        scans = ScanUpload.query.filter_by(patient_id=patient_profile.id).all()
    else:
        # Doctors see all scans
        scans = ScanUpload.query.all()

    return jsonify({
        'success': True,
        'data': [scan.to_dict() for scan in scans]
    }), 200


@scans_bp.route('/<int:scan_id>', methods=['GET'])
@jwt_required()
def get_scan(scan_id):
    """Get specific scan"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    scan = ScanUpload.query.get(scan_id)
    if not scan:
        return jsonify({
            'success': False,
            'error': 'Scan not found'
        }), 404

    # Check access permissions
    if current_user.role == 'patient':
        patient_profile = current_user.patient_profile
        if not patient_profile or scan.patient_id != patient_profile.id:
            return jsonify({
                'success': False,
                'error': 'Access denied'
            }), 403

    return jsonify({
        'success': True,
        'data': scan.to_dict()
    }), 200


@scans_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_scan():
    """Upload a medical scan"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user.role != 'patient':
        return jsonify({
            'success': False,
            'error': 'Only patients can upload scans'
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

    if not allowed_scan_file(file.filename):
        return jsonify({
            'success': False,
            'error': 'File type not allowed'
        }), 400

    # Get metadata
    scan_type = request.form.get('scan_type', 'Other')

    try:
        # Save file
        filename = secure_filename(file.filename)
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], 'scans', filename)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        file.save(file_path)

        # Create scan record
        scan = ScanUpload(
            patient_id=patient_profile.id,
            scan_type=scan_type,
            file_path=file_path,
            status='Pending'
        )

        db.session.add(scan)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Scan uploaded successfully',
            'data': {
                'scan_id': scan.id,
                'file_id': f'SCAN-{scan.id}',
                'processing_status': 'queued'
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': 'Upload failed'
        }), 500


@scans_bp.route('/<int:scan_id>/analyze', methods=['POST'])
@jwt_required()
def analyze_scan(scan_id):
    """Generate AI analysis for a scan"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    scan = ScanUpload.query.get(scan_id)
    if not scan:
        return jsonify({
            'success': False,
            'error': 'Scan not found'
        }), 404

    # Check access permissions
    if current_user.role == 'patient':
        patient_profile = current_user.patient_profile
        if not patient_profile or scan.patient_id != patient_profile.id:
            return jsonify({
                'success': False,
                'error': 'Access denied'
            }), 403

    try:
        # Get AI service
        ai_service = AIService()

        # Generate analysis
        analysis_data = ai_service.analyze_scan(scan, user_role=current_user.role)

        # Save analysis
        analysis = AIAnalysis(
            scan_id=scan.id,
            **analysis_data
        )
        db.session.add(analysis)

        # Update scan status
        scan.status = 'Completed'
        db.session.commit()

        return jsonify({
            'success': True,
            'data': analysis.to_dict()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': 'Analysis failed'
        }), 500