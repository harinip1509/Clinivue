"""
Health Check Routes
"""

from flask import Blueprint, jsonify
from app import db

health_bp = Blueprint('health', __name__)

@health_bp.route('', methods=['GET'])
def health_check():
    """Basic health check"""
    return jsonify({
        'status': 'healthy',
        'service': 'Clinivue Backend',
        'version': '1.0.0'
    }), 200


@health_bp.route('/detailed', methods=['GET'])
def detailed_health_check():
    """Detailed health check with database connectivity"""
    try:
        # Test database connection
        db.session.execute(db.text('SELECT 1'))
        db_status = 'healthy'
    except Exception as e:
        db_status = 'unhealthy'

    return jsonify({
        'status': 'healthy' if db_status == 'healthy' else 'unhealthy',
        'checks': {
            'database': db_status
        },
        'service': 'Clinivue Backend',
        'version': '1.0.0'
    }), 200 if db_status == 'healthy' else 503