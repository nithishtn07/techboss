import os
import logging
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

logger = logging.getLogger("techboss-backend")

# Load environment variables from backend/.env if present (local development)
env_path = Path(__file__).resolve().parent.parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL environment variable is missing. "
        "Please configure DATABASE_URL in the environment or backend/.env"
    )

DATABASE_URL = DATABASE_URL.strip().strip("'\"")

# Ensure standard postgresql:// connection URLs use the installed psycopg2 driver
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg2://", 1)
elif DATABASE_URL.startswith("postgresql://") and not DATABASE_URL.startswith("postgresql+"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://", 1)

# Handle SSL mode for hosted / remote databases like Neon PostgreSQL on Render
connect_args = {}
if "localhost" not in DATABASE_URL and "127.0.0.1" not in DATABASE_URL:
    # Ensure SSL is enabled for hosted cloud databases if not already present in the connection string
    if "sslmode=" not in DATABASE_URL:
        connect_args["sslmode"] = "require"

# Create SQLAlchemy engine with health-check and connection pooling tailored for hosted PostgreSQL:
# - pool_pre_ping=True tests connection liveness before each checkout
# - pool_recycle=300 reconnects before Neon serverless 5-minute idle drops
# - pool_size=10 and max_overflow=20 handle concurrent traffic safely
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    pool_size=10,
    max_overflow=20,
    pool_timeout=30,
    connect_args=connect_args,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """Dependency that provides a database session, rolls back on error, and closes cleanly."""
    db = SessionLocal()
    try:
        yield db
    except Exception as err:
        logger.error(f"Database session exception: {err}")
        db.rollback()
        raise
    finally:
        db.close()
