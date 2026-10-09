⚡ TECH BOSS — Tamil Tech Universe

A modern, interactive tech discovery platform inspired by Tamil technology content.

Tech Boss — Tamil Tech Universe is a full-stack web application designed to bring technology content, gadget discovery, buying guides, video exploration, and community interaction together in one premium digital experience.

The platform combines a modern React frontend, a FastAPI backend, and a PostgreSQL database to deliver an interactive and responsive technology website.

🌐 Live Website: https://techboss-lilac.vercel.app/
🔌 Backend API: https://techboss-backend.onrender.com/
💚 API Health Check: https://techboss-backend.onrender.com/api/health

---

✨ Key Features

🏠 1. Home — Tech Discovery

- Premium, futuristic landing page.
- Interactive 3D smartphone visual.
- Featured technology content and video discovery.
- Explore sections for gadgets, AI, smartphones, and future technology.
- Smooth animations and responsive layouts.

🎬 2. Videos Library

- Browse technology videos by category.
- Search and filter video content.
- Sort content by latest, oldest, and popularity.
- Video detail modal with relevant information and external links.

🧠 3. Tech Hub

- Dedicated sections for smartphones and laptops.
- AI tools and technology exploration.
- Gadget discovery and buying guides.
- Interactive device comparison interface.
- Visual comparison of display, processor, camera, battery, and charging features.

💬 4. Community

- Submit technology questions through an interactive form.
- Collect user name, email, category, and question.
- Store submitted questions in PostgreSQL through the backend API.
- Display community questions through a live Q&A feed.
- Loading, success, validation, empty, and error states.

📩 5. Newsletter Subscription

- Newsletter signup form.
- Email validation.
- Store subscriber email addresses in PostgreSQL.
- Handle duplicate subscriptions with clear feedback.

👨‍💻 6. About Page

- Creator-focused introduction.
- Content philosophy and platform overview.
- Community and future technology sections.

📊 7. Creator Dashboard

- Displays live database statistics.
- Shows total community questions and newsletter subscribers.
- Provides a view of recent inquiries.
- Clearly identified as a preview dashboard, not an authenticated administration system.

⚙️ 8. User Experience

- Responsive navigation and mobile menu.
- Global search and command palette using "Ctrl + K" or "Cmd + K".
- React Router navigation.
- Custom 404 page.
- Smooth animations and reduced-motion support.
- Accessibility-focused navigation and interface elements.

---

🛠️ Technology Stack

Layer| Technologies
Frontend| React 19, Vite
Styling| Tailwind CSS
Animations| Framer Motion
3D Graphics| Three.js
Icons| Lucide React
Routing| React Router
Backend| Python, FastAPI
Validation| Pydantic
Database| PostgreSQL
ORM| SQLAlchemy
Frontend Hosting| Vercel
Backend Hosting| Render
Database Hosting| Neon PostgreSQL
Version Control| Git and GitHub

---

🏗️ System Architecture

                 USER / BROWSER
                       |
                       v
              REACT + VITE FRONTEND
                 Hosted on Vercel
                       |
                       | HTTPS / REST API
                       v
                FASTAPI BACKEND
                 Hosted on Render
                       |
                       | SQLAlchemy
                       v
               POSTGRESQL DATABASE
                Hosted on Neon
                       |
              +--------+--------+
              |                 |
              v                 v
          Questions          Newsletter
           Records            Subscribers

The frontend communicates with the backend using HTTP requests. FastAPI validates incoming data and interacts with PostgreSQL to persist community questions and newsletter subscriptions.

---

🔗 Backend API Endpoints

The following endpoints support the application's current backend functionality.

Method| Endpoint| Purpose
"GET"| "/api/health"| Check backend availability
"POST"| "/api/questions"| Submit a community question
"GET"| "/api/questions"| Retrieve public community questions
"POST"| "/api/newsletter"| Subscribe to the newsletter
"GET"| "/api/stats"| Retrieve database-backed statistics

Interactive API documentation is available at:

https://techboss-backend.onrender.com/docs

Example: Submit a Question

{
  "name": "Test User",
  "email": "user@example.com",
  "category": "Smartphones",
  "question": "Which smartphone features should I compare before buying?"
}

The backend validates the request and stores valid submissions in PostgreSQL.

---

🗄️ Database Design

The application uses PostgreSQL with SQLAlchemy.

Questions Table

Stores community submissions.

- "id" — Unique record identifier
- "name" — Submitter's name
- "email" — Submitter's email
- "category" — Technology topic
- "question" — Submitted question
- "created_at" — Submission timestamp

Newsletter Subscribers Table

Stores newsletter subscriptions.

- "id" — Unique record identifier
- "email" — Subscriber email address, with duplicate prevention
- "created_at" — Subscription timestamp

Dashboard statistics are calculated from database records rather than hardcoded subscriber or question counts.

---

🚀 Run the Project Locally

Prerequisites

Install the following:

- Node.js and npm
- Python 3.10 or later
- PostgreSQL
- Git

1. Clone the Repository

git clone https://github.com/nithishtn07/techboss.git
cd techboss

2. Set Up the Frontend

From the project root:

npm install

Create a ".env" file in the root directory:

VITE_API_URL=http://127.0.0.1:8000

Start the frontend:

npm run dev

Open the local URL displayed in your terminal, usually:

"http://localhost:5173"

3. Set Up the Backend

Open a separate terminal:

cd backend
python -m venv venv

Activate the virtual environment.

Windows PowerShell:

.\venv\Scripts\Activate.ps1

Install dependencies:

pip install -r requirements.txt

Create a ".env" file inside the "backend" directory:

DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/techboss
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

Replace "YOUR_PASSWORD" with your local PostgreSQL password. Ensure the PostgreSQL server and "techboss" database exist before starting the backend.

Run FastAPI from the "backend" directory:

python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload

The backend is available at:

"http://127.0.0.1:8000"

API documentation:

"http://127.0.0.1:8000/docs"

---

☁️ Deployment

The production architecture uses three services:

- Vercel: Builds and hosts the React frontend.
- Render: Runs the FastAPI backend.
- Neon: Hosts the PostgreSQL database.

Required Environment Variables

Vercel frontend

VITE_API_URL=https://techboss-backend.onrender.com

Render backend

DATABASE_URL=<your-Neon-PostgreSQL-connection-string>
ALLOWED_ORIGINS=https://techboss-lilac.vercel.app

Configure environment variables in the respective hosting dashboards. Never commit database credentials or secrets to GitHub.

After changing "VITE_API_URL", redeploy the frontend because Vite embeds environment variables during the production build.

---

🔒 Security and Reliability

- Backend request validation using Pydantic.
- PostgreSQL persistence for community submissions.
- Duplicate newsletter subscription handling.
- CORS configuration for approved frontend origins.
- Public community responses avoid exposing submitters' email addresses.
- Environment-based configuration for database credentials.
- User-facing loading and error states for API operations.

Production considerations: The creator dashboard is currently a preview without authentication. Before using it for private or administrative data, implement authentication, role-based authorization, and protected backend endpoints. Add rate limiting, spam protection, and appropriate privacy and retention policies before opening forms to a large public audience.

---

📁 Project Structure

techboss/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── database.py
│   │   └── models.py
│   ├── requirements.txt
│   └── test_api.py
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── data/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vercel.json
├── .gitignore
└── README.md

The directory listing is representative; exact component and configuration filenames may vary by repository version.

---

🧪 Testing and Build

Build the frontend for production:

npm run build

Run the backend API tests, if configured:

cd backend
python test_api.py

Verify the deployed API health endpoint:

https://techboss-backend.onrender.com/api/health

Check that community questions and newsletter subscriptions persist in the database when testing the live forms.

---

🎯 Project Objectives

- Create a polished, responsive technology content platform.
- Improve technology discovery through categorization, search, and comparison.
- Enable real community participation through working backend-connected forms.
- Demonstrate full-stack application development.
- Integrate a React frontend, REST API, and relational database.
- Deploy a complete application using modern cloud services.

---

🔮 Future Enhancements

- Secure creator authentication and an administrative dashboard.
- Video synchronization with the creator's official YouTube channel.
- Searchable gadget specifications backed by verified data sources.
- Enhanced comparison features with regularly updated device information.
- Email confirmation and newsletter delivery integration.
- Community moderation, spam prevention, and rate limiting.
- Automated API tests and continuous integration.

---

👨‍💻 Author

Developed as a full-stack web development project.

The project demonstrates modern frontend development, REST API integration, PostgreSQL data persistence, interactive UI design, and cloud deployment.

---

📄 License

Choose and add an appropriate open-source license before permitting reuse or redistribution. Until a license is added, all rights remain with the copyright holder.

---

TECH BOSS — Tamil Tech Universe
Tamil Tech. Real Reviews. Smarter Choices.