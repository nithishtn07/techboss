import os
import logging
from contextlib import asynccontextmanager
from typing import Literal
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, Field, field_validator
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

from .database import engine, Base, get_db
from .models import Question, NewsletterSubscriber

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("techboss-backend")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Automatically create tables on startup if they don't already exist
    try:
        logger.info("Initializing database tables...")
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables initialized successfully.")
    except Exception as e:
        logger.error(f"Failed to initialize database tables: {e}")
    yield


app = FastAPI(
    title="Tech Boss API",
    description="FastAPI Backend for Tech Boss Tamil Technology Platform",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS Configuration
# Allowed origins for development & production (supports "*" or comma-separated domains)
raw_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "*",
)
if raw_origins.strip() == "*":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )
else:
    allowed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )


# Friendly request validation error handler
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    errors = exc.errors()
    first_error = errors[0] if errors else {}
    msg = first_error.get("msg", "Invalid submission data")
    field = " -> ".join(str(loc) for loc in first_error.get("loc", []))
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "message": f"Validation error in {field}: {msg}",
        },
    )


# --- Pydantic Schemas ---
CategoryType = Literal["Smartphones", "AI", "Gadgets", "PC", "Other"]


class QuestionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr = Field(..., max_length=255)
    category: CategoryType
    question: str = Field(..., min_length=5, max_length=5000)

    @field_validator("name", "question")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        stripped = v.strip()
        if not stripped:
            raise ValueError("Field cannot be empty or only whitespace")
        return stripped

    @field_validator("email")
    @classmethod
    def normalize_email(cls, v: EmailStr) -> str:
        return str(v).strip().lower()


class NewsletterCreate(BaseModel):
    email: EmailStr = Field(..., max_length=255)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, v: EmailStr) -> str:
        return str(v).strip().lower()


class ApiResponse(BaseModel):
    success: bool
    message: str


# --- Endpoints ---

@app.get("/api/health", summary="Health Check")
def health_check():
    """Returns the operational status of the Tech Boss API."""
    return {"status": "ok"}


@app.get("/api/questions", summary="Get Public Community Questions")
def get_public_questions(limit: int = 20, db: Session = Depends(get_db)):
    """Returns safe, public community questions without revealing email addresses or private info."""
    try:
        questions = (
            db.query(Question)
            .order_by(Question.created_at.desc())
            .limit(min(max(limit, 1), 50))
            .all()
        )
        return [
            {
                "id": q.id,
                "name": q.name,
                "category": q.category,
                "question": q.question,
                "created_at": q.created_at.isoformat() if q.created_at else None,
            }
            for q in questions
        ]
    except SQLAlchemyError as err:
        logger.error(f"Database error while fetching questions: {err}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to load community questions right now.",
        )


@app.get("/api/stats", summary="Get Verified Platform Statistics")
def get_platform_stats(db: Session = Depends(get_db)):
    """Returns actual verified counts from the PostgreSQL database (zero fake metrics)."""
    try:
        total_questions = db.query(Question).count()
        total_subscribers = db.query(NewsletterSubscriber).count()
        return {
            "total_questions": total_questions,
            "total_subscribers": total_subscribers,
        }
    except SQLAlchemyError as err:
        logger.error(f"Database error while fetching stats: {err}")
        return {
            "total_questions": 0,
            "total_subscribers": 0,
        }


@app.post(
    "/api/questions",
    response_model=ApiResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Question to Tech Boss",
)
def submit_question(payload: QuestionCreate, db: Session = Depends(get_db)):
    """Receives user questions, validates inputs, and stores in PostgreSQL."""
    try:
        new_question = Question(
            name=payload.name,
            email=payload.email,
            category=payload.category,
            question=payload.question,
        )
        db.add(new_question)
        db.commit()
        db.refresh(new_question)
        logger.info(f"Question stored successfully: ID={new_question.id} by {new_question.email}")
        return {
            "success": True,
            "message": "Question submitted successfully",
        }
    except SQLAlchemyError as err:
        db.rollback()
        logger.error(f"Database error while saving question: {err}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to save question due to a server error. Please try again later.",
        )


@app.post(
    "/api/newsletter",
    response_model=ApiResponse,
    status_code=status.HTTP_200_OK,
    summary="Subscribe to Tech Boss Weekly Newsletter",
)
def subscribe_newsletter(payload: NewsletterCreate, db: Session = Depends(get_db)):
    """Validates email and saves subscriber if not already present."""
    normalized_email = payload.email

    try:
        # Check if already subscribed
        existing = (
            db.query(NewsletterSubscriber)
            .filter(NewsletterSubscriber.email == normalized_email)
            .first()
        )
        if existing:
            return {
                "success": False,
                "message": "This email is already subscribed.",
            }

        new_subscriber = NewsletterSubscriber(email=normalized_email)
        db.add(new_subscriber)
        db.commit()
        db.refresh(new_subscriber)
        logger.info(f"Newsletter subscriber added: {normalized_email}")
        return {
            "success": True,
            "message": "Subscribed to newsletter successfully",
        }
    except IntegrityError:
        db.rollback()
        return {
            "success": False,
            "message": "This email is already subscribed.",
        }
    except SQLAlchemyError as err:
        db.rollback()
        logger.error(f"Database error while subscribing email: {err}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to process subscription due to a server error. Please try again later.",
        )
