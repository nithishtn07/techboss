import pytest
from starlette.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

import sys
import os

# Ensure backend directory is in sys.path
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.database import Base, get_db
from app.main import app

# Setup in-memory SQLite database for isolated testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Apply dependency override
app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"

def test_cors_preflight_production_vercel():
    headers = {
        "Origin": "https://techboss-lilac.vercel.app",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
    }
    response = client.options("/api/questions", headers=headers)
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "https://techboss-lilac.vercel.app"
    assert "POST" in response.headers.get("access-control-allow-methods", "")

def test_cors_preflight_localhost():
    headers = {
        "Origin": "http://localhost:5173",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
    }
    response = client.options("/api/questions", headers=headers)
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "http://localhost:5173"

def test_cors_preflight_rejected_for_untrusted_origin():
    headers = {
        "Origin": "https://malicious-origin.com",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
    }
    response = client.options("/api/questions", headers=headers)
    # Untrusted origins should NOT get Access-Control-Allow-Origin
    assert response.headers.get("access-control-allow-origin") is None

def test_create_and_get_questions():
    payload = {
        "name": "Karthik Raja",
        "email": "karthik@example.com",
        "category": "Smartphones",
        "question": "What is the best mid-range 5G phone under 25k in Tamil Nadu?"
    }
    # Submit question
    post_res = client.post("/api/questions", json=payload, headers={"Origin": "https://techboss-lilac.vercel.app"})
    assert post_res.status_code == 201
    created = post_res.json()
    assert created["success"] is True
    assert "message" in created

    # Retrieve question list
    get_res = client.get("/api/questions", headers={"Origin": "https://techboss-lilac.vercel.app"})
    assert get_res.status_code == 200
    questions = get_res.json()
    assert len(questions) == 1
    q = questions[0]
    assert q["name"] == "Karthik Raja"
    assert q["category"] == "Smartphones"
    assert q["question"] == "What is the best mid-range 5G phone under 25k in Tamil Nadu?"
    # Critical privacy check: email MUST NOT be exposed
    assert "email" not in q

def test_create_question_validation_errors():
    # Invalid email
    bad_payload = {
        "name": "Arun",
        "email": "not-an-email",
        "category": "Smartphones",
        "question": "Valid question here"
    }
    res = client.post("/api/questions", json=bad_payload)
    assert res.status_code == 422

    # Short question (less than min_length=5)
    short_q = {
        "name": "Arun",
        "email": "arun@example.com",
        "category": "Smartphones",
        "question": "abc"
    }
    res = client.post("/api/questions", json=short_q)
    assert res.status_code == 422

    # Invalid category
    bad_cat = {
        "name": "Arun",
        "email": "arun@example.com",
        "category": "NonExistentCategory",
        "question": "Valid question text"
    }
    res = client.post("/api/questions", json=bad_cat)
    assert res.status_code == 422

    # Missing fields
    missing_fields = {
        "name": "Arun"
    }
    res = client.post("/api/questions", json=missing_fields)
    assert res.status_code == 422

def test_newsletter_subscription_and_duplicate():
    email = "tamiltechfan@example.com"
    # First subscription
    res1 = client.post("/api/newsletter", json={"email": email}, headers={"Origin": "https://techboss-lilac.vercel.app"})
    assert res1.status_code == 200
    assert res1.json()["success"] is True

    # Duplicate subscription
    res2 = client.post("/api/newsletter", json={"email": email}, headers={"Origin": "https://techboss-lilac.vercel.app"})
    assert res2.status_code == 200
    data2 = res2.json()
    assert data2["success"] is False
    assert "already subscribed" in data2["message"].lower()

def test_stats_endpoint():
    # Add 2 questions with valid categories ('Smartphones', 'AI', 'Gadgets', 'PC', 'Other')
    client.post("/api/questions", json={
        "name": "User 1",
        "email": "user1@example.com",
        "category": "Smartphones",
        "question": "What is the release date of Nothing Phone 3?"
    })
    client.post("/api/questions", json={
        "name": "User 2",
        "email": "user2@example.com",
        "category": "PC",
        "question": "Which laptop is recommended for coding under 60k?"
    })
    client.post("/api/newsletter", json={"email": "sub1@example.com"})

    stats_res = client.get("/api/stats", headers={"Origin": "https://techboss-lilac.vercel.app"})
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert stats["total_questions"] == 2
    assert stats["total_subscribers"] == 1
