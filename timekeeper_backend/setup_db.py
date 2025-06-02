# contoh di script setup_db.py
from timekeeper_backend.models.meta import Base
from timekeeper_backend.models.activity import Activity
from timekeeper_backend.models.category import Category
from sqlalchemy import engine_from_config

engine = engine_from_config(settings, 'sqlalchemy.')
Base.metadata.create_all(engine)
