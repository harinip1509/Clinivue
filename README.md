# Clinivue — AI-Powered Medical Imaging Platform

Clinivue is a **full-stack multimodal healthcare application** that uses computer vision and Generative AI to assist with medical image analysis and report generation.

### What it does

* Analyzes **Brain MRI scans** using a CNN-based classifier for tumor classification.
* Analyzes **Chest X-rays** using **DenseNet121 / TorchXRayVision**.
* Generates structured, human-readable reports using **Qwen2.5 7B via Ollama**.
* Provides separate **Doctor and Patient portals** with JWT-based authentication.
* Stores application data using **SQLite/SQLAlchemy** and medical files using **AWS S3**.

### Tech Stack

**React, TypeScript, Vite | FastAPI, Python | TensorFlow, PyTorch, DenseNet121 | Ollama, Qwen2.5 | SQLite, SQLAlchemy | AWS S3**

### Architecture

```text
React Frontend
      ↓
FastAPI Backend
      ↓
Image Preprocessing
      ↓
MRI CNN / Chest X-ray DenseNet121
      ↓
Predictions + Confidence Scores
      ↓
Qwen2.5 via Ollama
      ↓
Structured Medical Report
```

### Key Learning

Built an end-to-end **AI + GenAI + full-stack system**, integrating computer vision models, LLM inference, REST APIs, authentication, database management, and cloud storage.

> Academic prototype for decision support; not intended to replace professional medical diagnosis.
