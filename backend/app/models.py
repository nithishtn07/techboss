from sqlalchemy import Column, Integer, String, Text, DateTime, func
from .database import Base


class Question(Base):
    """Stores user questions submitted through the Ask Tech Boss form."""
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    category = Column(String(50), nullable=False)
    question = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    def __repr__(self):
        return f"<Question(id={self.id}, name='{self.name}', category='{self.category}')>"


class NewsletterSubscriber(Base):
    """Stores verified newsletter subscriptions."""
    __tablename__ = "newsletter_subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    def __repr__(self):
        return f"<NewsletterSubscriber(id={self.id}, email='{self.email}')>"
