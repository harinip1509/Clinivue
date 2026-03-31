"""
Application Configuration
"""

import os
from datetime import timedelta

class Config:
    """Base configuration"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///clinivue.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Configuration
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key-change-in-production'
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRE_MINUTES', 15))
    JWT_REFRESH_TOKEN_EXPIRE_DAYS = int(os.environ.get('JWT_REFRESH_TOKEN_EXPIRE_DAYS', 30))

    # File Upload Configuration
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER', 'uploads')
    MAX_CONTENT_LENGTH = int(os.environ.get('MAX_CONTENT_LENGTH', 16777216))  # 16MB

    # CORS Configuration
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:3000,http://localhost:5173').split(',')

    # AI Configuration
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')

    # Redis Configuration
    REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost:6379/0')


class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    SQLALCHEMY_ECHO = True


class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    SQLALCHEMY_ECHO = False

    # Ensure production settings are properly configured
    @classmethod
    def init_app(cls, app):
        Config.init_app(app)

        # Log to stderr in production
        import logging
        from logging import StreamHandler
        file_handler = StreamHandler()
        file_handler.setLevel(logging.WARNING)
        app.logger.addHandler(file_handler)


class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    WTF_CSRF_ENABLED = False