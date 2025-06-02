from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import engine_from_config
from zope.sqlalchemy import register

# Base class untuk semua model SQLAlchemy
Base = declarative_base()

# Session factory
DBSession = scoped_session(sessionmaker())
register(DBSession)

def initialize_sql(settings):
    """Initialize database."""
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    Base.metadata.create_all(engine)