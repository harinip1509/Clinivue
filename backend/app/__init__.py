"""
Clinivue Backend Application Factory
"""

import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_name=None):
    """Application factory function"""
    app = Flask(__name__)

    # Configuration
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')

    if config_name == 'development':
        app.config.from_object('app.config.DevelopmentConfig')
    elif config_name == 'production':
        app.config.from_object('app.config.ProductionConfig')
    elif config_name == 'testing':
        app.config.from_object('app.config.TestingConfig')
    else:
        app.config.from_object('app.config.Config')

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Configure CORS
    CORS(app, origins=app.config['CORS_ORIGINS'])

    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.patients import patients_bp
    from app.routes.doctors import doctors_bp
    from app.routes.reports import reports_bp
    from app.routes.scans import scans_bp
    from app.routes.chat import chat_bp
    from app.routes.health import health_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(patients_bp, url_prefix='/api/patients')
    app.register_blueprint(doctors_bp, url_prefix='/api/doctors')
    app.register_blueprint(reports_bp, url_prefix='/api/reports')
    app.register_blueprint(scans_bp, url_prefix='/api/scans')
    app.register_blueprint(chat_bp, url_prefix='/api/chat')
    app.register_blueprint(health_bp, url_prefix='/api')

    # Create upload directory if it doesn't exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    return app