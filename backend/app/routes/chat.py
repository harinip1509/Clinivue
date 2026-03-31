"""
Chat Routes
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.services.ai_service import AIService

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('', methods=['POST'])
@jwt_required()
def send_message():
    """Send a chat message and get AI response"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({
            'success': False,
            'error': 'Message is required'
        }), 400

    message = data['message'].strip()
    context = data.get('context', {})

    try:
        # Get AI service
        ai_service = AIService()

        # Generate response
        response_data = ai_service.generate_chat_response(message, context, current_user.role)

        return jsonify({
            'success': True,
            'data': response_data
        }), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Chat failed'
        }), 500


@chat_bp.route('/history', methods=['GET'])
@jwt_required()
def get_chat_history():
    """Get chat history (mock implementation)"""
    # In a real implementation, you'd store chat history in the database
    return jsonify({
        'success': True,
        'data': []
    }), 200