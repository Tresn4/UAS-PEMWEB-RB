import logging
import os
from datetime import datetime

# Buat direktori logs jika belum ada
if not os.path.exists('logs'):
    os.makedirs('logs')

# Konfigurasi logger
logger = logging.getLogger('timekeeper')
logger.setLevel(logging.INFO)

# Hanya tambahkan handler jika belum ada
if not logger.handlers:
    # Handler untuk file log per tanggal
    file_handler = logging.FileHandler(f'logs/timekeeper_{datetime.now().strftime("%Y%m%d")}.log')
    file_handler.setLevel(logging.INFO)

    # Handler untuk console
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)

    # Format log
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
