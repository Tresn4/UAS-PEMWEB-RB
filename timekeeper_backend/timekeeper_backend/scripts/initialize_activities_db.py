import sys
import transaction

from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy.exc import OperationalError

from timekeeper_backend.models.meta import initialize_sql, DBSession
from timekeeper_backend.models.activity import Activity
from timekeeper_backend.models.category import Category

def populate_dummy_data():
    category1 = Category(name="Belajar", description="Kegiatan belajar", color="#e74c3c")
    category2 = Category(name="Olahraga", description="Kegiatan olahraga", color="#2ecc71")
    
    DBSession.add_all([category1, category2])
    DBSession.flush()
    
    activity1 = Activity(
        name="Belajar Matematika",
        description="Latihan soal integral",
        category=category1,
        date="2025-05-30",
        time="08:00:00"
    )
    activity2 = Activity(
        name="Jogging",
        description="Jogging pagi di taman",
        category=category2,
        date="2025-05-30",
        time="06:30:00"
    )
    
    DBSession.add_all([activity1, activity2])

def main():
    if len(sys.argv) != 2:
        print("Usage: python initialize_activities_db.py <config_uri>")
        sys.exit(1)

    config_uri = sys.argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)

    try:
        initialize_sql(settings)
    except OperationalError as e:
        print(f"Database connection failed: {e}")
        sys.exit(1)

    with transaction.manager:
        populate_dummy_data()
    print("✅ Dummy data berhasil dimasukkan ke database.")

if __name__ == "__main__":
    main()
