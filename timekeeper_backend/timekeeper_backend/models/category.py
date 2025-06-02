from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from .meta import Base

class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    color = Column(String(20), default="#3498db")

    activities = relationship("Activity", back_populates="category")
    