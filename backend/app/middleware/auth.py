"""
Middleware for Authentication and Authorization
"""

from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from functools import wraps
from flask import jsonify

def role_required(required_role):
    """Decorator to require specific user role"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            try:
                verify_jwt_in_request()
                current_user_id = get_jwt_identity()

                # Import here to avoid circular imports
                from app.models.user import User
                user = User.query.get(current_user_id)

                if not user:
                    return jsonify({
                        'success': False,
                        'error': 'User not found'
                    }), 401

                if user.role != required_role:
                    return jsonify({
                        'success': False,
                        'error': 'Access denied'
                    }), 403

                return f(*args, **kwargs)
            except Exception as e:
                return jsonify({
                    'success': False,
                    'error': 'Authentication required'
                }), 401
        return decorated_function
    return decorator

def patient_or_doctor_required(f):
    """Decorator to require patient or doctor role"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            verify_jwt_in_request()
            current_user_id = get_jwt_identity()

            # Import here to avoid circular imports
            from app.models.user import User
            user = User.query.get(current_user_id)

            if not user:
                return jsonify({
                    'success': False,
                    'error': 'User not found'
                }), 401

            if user.role not in ['patient', 'doctor']:
                return jsonify({
                    'success': False,
                    'error': 'Access denied'
                }), 403

            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({
                'success': False,
                'error': 'Authentication required'
            }), 401
    return decorated_function