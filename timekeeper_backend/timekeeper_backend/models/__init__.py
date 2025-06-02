from .meta import Base, DBSession
from .activity import Activity  # ⬅️ tambahkan ini
from .category import Category  # ⬅️ pastikan ini juga

def includeme(config):
    from .meta import initialize_sql
    settings = config.get_settings()
    initialize_sql(settings)
