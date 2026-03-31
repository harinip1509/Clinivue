"""
Authentication Routes
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
from app.models.user import User, PatientProfile, DoctorProfile
from app import db
import re

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    data = request.get_json()

    # Validate required fields
    required_fields = ['email', 'password', 'name', 'role']
    for field in required_fields:
        if field not in data:
            return jsonify({
                'success': False,
                'error': f'{field} is required'
            }), 400

    email = data['email'].strip().lower()
    password = data['password']
    name = data['name'].strip()
    role = data['role'].strip().lower()

    # Validate email format
    if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email):
        return jsonify({
            'success': False,
            'error': 'Invalid email format'
        }), 400

    # Validate role
    if role not in ['patient', 'doctor']:
        return jsonify({
            'success': False,
            'error': 'Role must be either patient or doctor'
        }), 400

    # Validate password strength
    if len(password) < 6:
        return jsonify({
            'success': False,
            'error': 'Password must be at least 6 characters long'
        }), 400

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({
            'success': False,
            'error': 'User with this email already exists'
        }), 409

    try:
        # Create user
        user = User(email=email, password=password, role=role)
        db.session.add(user)
        db.session.flush()  # Get user ID without committing

        # Create profile based on role
        if role == 'patient':
            profile = PatientProfile(user_id=user.id, name=name)
        else:  # doctor
            profile = DoctorProfile(user_id=user.id, name=name)

        db.session.add(profile)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'User registered successfully',
            'user': user.to_auth_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': 'Registration failed'
        }), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    """Authenticate user and return tokens"""
    data = request.get_json()

    # Validate required fields
    required_fields = ['email', 'password', 'role']
    for field in required_fields:
        if field not in data:
            return jsonify({
                'success': False,
                'error': f'{field} is required'
            }), 400

    email = data['email'].strip().lower()
    password = data['password']
    role = data['role'].strip().lower()

    # Validate role
    if role not in ['patient', 'doctor']:
        return jsonify({
            'success': False,
            'error': 'Role must be either patient or doctor'
        }), 400

    # Find user
    user = User.query.filter_by(email=email, role=role).first()
    if not user or not user.check_password(password):
        return jsonify({
            'success': False,
            'error': 'Invalid email, password, or role'
        }), 401

    if not user.is_active:
        return jsonify({
            'success': False,
            'error': 'Account is deactivated'
        }), 401

    # Create tokens
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return jsonify({
        'success': True,
        'message': 'Login successful',
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': user.to_auth_dict()
    }), 200


@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh access token"""
    current_user_id = get_jwt_identity()
    access_token = create_access_token(identity=current_user_id)

    return jsonify({
        'success': True,
        'access_token': access_token
    }), 200


@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """Logout user (client should discard tokens)"""
    return jsonify({
        'success': True,
        'message': 'Logged out successfully'
    }), 200


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current user information"""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({
            'success': False,
            'error': 'User not found'
        }), 404

    return jsonify({
        'success': True,
        'user': user.to_auth_dict()
    }), 200