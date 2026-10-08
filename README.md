# Tech Boss — Full-Stack Platform 🚀

Official web platform for **Tech Boss**, Tamil Nadu's leading technology content creator. Built with modern, high-performance web technologies, 3D interactive visualizations, and a robust FastAPI + PostgreSQL backend.

---

## 🌟 Features

- **Dynamic Homepage**: High-impact hero section with interactive Three.js 3D smartphone model, real-time metrics, featured reviews, and category highlights.
- **Videos Hub**: Searchable video archive with category filters, detailed specs modal, and responsive playback integrations.
- **Tech Hub**: Interactive gadget comparison matrix, buyer guides, and tech breakdown articles.
- **Community Portal**: Real-time Q&A submission system and newsletter subscription forms with live backend API integration.
- **About Page**: Creator story, milestone timeline, production gear setup, and brand partnership inquiry form.
- **Full-Stack Architecture**: React 19 frontend seamlessly connected to a FastAPI backend with persistent PostgreSQL storage.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4, Lucide Icons
- **3D Graphics & Animation**: Three.js, `@react-three/fiber`, `@react-three/drei`, Framer Motion
- **Routing**: React Router DOM v7

### Backend
- **Framework**: FastAPI (Python 3.12+)
- **ORM / Database**: SQLAlchemy, PostgreSQL, psycopg2-binary
- **Validation**: Pydantic v2
- **Config**: python-dotenv

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd techboss
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Run development server
npm run dev
```
The frontend will start at `http://localhost:5173`.

### 3. Backend Setup
```bash
# Navigate to backend
cd backend

# Create and activate Python virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your PostgreSQL credentials if different from default

# Initialize database tables
python init_db.py

# Start FastAPI server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
The FastAPI backend will start at `http://127.0.0.1:8000`.
Interactive API docs are available at `http://127.0.0.1:8000/docs`.

### 4. One-Click Startup (Windows)
Double-click `run_app.bat` in the root directory to automatically launch PostgreSQL, the FastAPI server, and the Vite frontend simultaneously.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Healthcheck and database status |
| `POST` | `/api/questions` | Submit a tech question (`name`, `email`, `category`, `question`) |
| `POST` | `/api/newsletter` | Subscribe to weekly newsletter (`email`) |

---

## 🔒 Environment Variables

### Frontend (`.env`)
```env
VITE_API_URL=http://127.0.0.1:8000
```

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://techboss_user:techboss_secret@127.0.0.1:5432/techboss
```

---

## 📄 License
This project is proprietary and built for the Tech Boss platform.
