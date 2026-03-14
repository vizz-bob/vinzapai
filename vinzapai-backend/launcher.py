import os
import sys
import time
import threading
import logging
import socket
from pathlib import Path
from django.core.wsgi import get_wsgi_application
from waitress import serve
import webview

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('VinzapAI')

APP_TITLE = 'VinzapAI'
SETTINGS_MODULE = 'backend.settings_standalone'
WINDOW_TITLE = 'VinzapAI — AI Business Intelligence'
ADMIN_URL = 'http://127.0.0.1:8000/admin/'

DATA_DIR = Path(os.environ.get('VINZAPAI_DATA_DIR', Path(__file__).parent / 'vinzapai_data'))
BUNDLE_DIR = Path(os.environ.get('VINZAPAI_BUNDLE_DIR', Path(__file__).parent))

DATA_DIR.mkdir(parents=True, exist_ok=True)

log_file = DATA_DIR / 'vinzapai.log'
file_handler = logging.FileHandler(log_file)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
logger.addHandler(file_handler)

os.environ['DJANGO_SETTINGS_MODULE'] = SETTINGS_MODULE
os.environ['VINZAPAI_DATA_DIR'] = str(DATA_DIR)
os.environ['VINZAPAI_BUNDLE_DIR'] = str(BUNDLE_DIR)

import django
from django.conf import settings
from django.core.management import call_command
from django.contrib.auth.models import User

django.setup()


def create_default_superuser():
    logger.info('Checking for superuser...')
    if User.objects.filter(username='admin').exists():
        logger.info('Admin user already exists')
        return

    logger.info('Creating default superuser: admin/vinzap123')
    User.objects.create_superuser('admin', 'admin@vinzapai.local', 'vinzap123')
    logger.info('Superuser created successfully')


def run_migrations():
    logger.info('Running database migrations...')
    try:
        call_command('migrate', verbosity=0)
        logger.info('Migrations completed')
    except Exception as e:
        logger.error(f'Migration failed: {e}')
        raise


def check_port_available(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('127.0.0.1', port))
    sock.close()
    return result != 0


def wait_for_server(max_attempts=30):
    logger.info('Waiting for server to be ready...')
    for attempt in range(max_attempts):
        if not check_port_available(8000):
            logger.info('Server is ready!')
            return True
        time.sleep(0.5)
    logger.error('Server failed to start within timeout')
    return False


def run_django_server():
    logger.info(f'Starting {APP_TITLE} server on http://127.0.0.1:8000')
    try:
        application = get_wsgi_application()
        serve(application, host='127.0.0.1', port=8000, _quiet=True)
    except Exception as e:
        logger.error(f'Server error: {e}')
        raise


def main():
    logger.info(f'Initializing {APP_TITLE}')

    run_migrations()
    create_default_superuser()

    server_thread = threading.Thread(target=run_django_server, daemon=True)
    server_thread.start()

    if not wait_for_server():
        logger.error('Failed to start server')
        sys.exit(1)

    logger.info(f'Opening {APP_TITLE} window')
    webview.create_window(
        WINDOW_TITLE,
        ADMIN_URL,
        width=1440,
        height=900,
        background_color='#1f2937'
    )
    webview.start()


if __name__ == '__main__':
    main()
