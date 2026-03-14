import os
from pathlib import Path
from .settings import *

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = Path(os.environ.get('VINZAPAI_DATA_DIR', BASE_DIR / 'data'))
BUNDLE_DIR = Path(os.environ.get('VINZAPAI_BUNDLE_DIR', BASE_DIR))

DATA_DIR.mkdir(parents=True, exist_ok=True)

DEBUG = False

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': DATA_DIR / 'db.sqlite3',
    }
}

STATIC_URL = '/static/'
STATIC_ROOT = BUNDLE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = DATA_DIR / 'media'

MEDIA_ROOT.mkdir(parents=True, exist_ok=True)

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

WHITENOISE_ROOT = BUNDLE_DIR / 'frontend_build'
