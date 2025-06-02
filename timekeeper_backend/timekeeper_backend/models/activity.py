from sqlalchemy import Column, Integer, String, Text, ForeignKey, Date, Time
from sqlalchemy.orm import relationship
from .meta import Base

class Activity(Base):
    __tablename__ = 'activities'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    category_id = Column(Integer, ForeignKey('categories.id'))
    date = Column(Date)
    time = Column(Time)

    category = relationship("Category", back_populates="activities")
