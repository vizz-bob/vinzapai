# vinzapai_backend.spec
# =====================
# PyInstaller specification for VinzapAI standalone .exe
#
# Run from vinzapai-backend/ directory:
#   pyinstaller vinzapai_backend.spec --clean --noconfirm
#
# Output: vinzapai-backend/dist/VinzapAI_Server/VinzapAI_Server.exe

import os
from PyInstaller.utils.hooks import (
    collect_all,
    collect_data_files,
    collect_submodules,
)

block_cipher = None

# ---------------------------------------------------------------------------
# Collect data + hidden-imports for third-party packages
# ---------------------------------------------------------------------------

_packages = [
    'django',
    'rest_framework',
    'jazzmin',
    'corsheaders',
    'whitenoise',
]

all_datas    = []
all_binaries = []
all_hidden   = []

for _pkg in _packages:
    try:
        _d, _b, _h = collect_all(_pkg)
        all_datas    += _d
        all_binaries += _b
        all_hidden   += _h
    except Exception as _e:
        print(f"[spec] Warning: collect_all({_pkg!r}) — {_e}")

for _pkg in ['decouple', 'PIL', 'waitress', 'webview']:
    try:
        all_datas += collect_data_files(_pkg)
    except Exception as _e:
        print(f"[spec] Warning: collect_data_files({_pkg!r}) — {_e}")

# ---------------------------------------------------------------------------
# Django project apps
# ---------------------------------------------------------------------------

_project_root = '.'
_django_apps  = ['backend', 'dashboard', 'analytics', 'projects']

for _app in _django_apps:
    _app_path = os.path.join(_project_root, _app)
    if not os.path.isdir(_app_path):
        continue
    try:
        all_hidden += collect_submodules(_app)
    except Exception:
        pass
    for _subdir in ('templates', 'migrations', 'static', 'management', 'fixtures'):
        _p = os.path.join(_app_path, _subdir)
        if os.path.isdir(_p):
            all_datas.append((_p, f'{_app}/{_subdir}'))

# ---------------------------------------------------------------------------
# Project-level data files
# ---------------------------------------------------------------------------

_project_data = [
    ('templates',      'templates'),
    ('staticfiles',    'staticfiles'),
    ('frontend_build', 'frontend_build'),
    # db.sqlite3 intentionally NOT bundled — fresh database created on first run
]

for _src, _dst in _project_data:
    _full = os.path.join(_project_root, _src)
    if os.path.exists(_full):
        all_datas.append((_full, _dst))
    else:
        print(f"[spec] Note: {_full!r} not found — will be skipped.")

# ---------------------------------------------------------------------------
# Hidden imports
# ---------------------------------------------------------------------------

_extra_hidden = [
    'django.template.loaders.cached',
    'django.template.loaders.filesystem',
    'django.template.loaders.app_directories',
    'django.contrib.admin.apps',
    'django.contrib.admin.templatetags.admin_list',
    'django.contrib.admin.templatetags.admin_modify',
    'django.contrib.admin.templatetags.admin_urls',
    'django.contrib.admin.templatetags.base',
    'django.contrib.admin.templatetags.log',
    'django.contrib.staticfiles.finders',
    'django.contrib.staticfiles.storage',
    'django.db.backends.sqlite3',
    'whitenoise.middleware',
    'whitenoise.storage',
    'whitenoise.responders',
    'corsheaders.middleware',
    'corsheaders.signals',
    'rest_framework.authentication',
    'rest_framework.permissions',
    'rest_framework.response',
    'rest_framework.serializers',
    'rest_framework.viewsets',
    'rest_framework.routers',
    'rest_framework.renderers',
    'rest_framework.parsers',
    'rest_framework.authtoken',
    'rest_framework.authtoken.models',
    'waitress',
    'waitress.server',
    'waitress.task',
    'waitress.channel',
    'decouple',
    'PIL',
    'PIL._imaging',
    'PIL.Image',
    'backend',
    'backend.settings',
    'backend.settings_standalone',
    'backend.urls',
    'backend.urls_standalone',
    'backend.wsgi',
    'dashboard.apps',
    'dashboard.models',
    'dashboard.views',
    'dashboard.admin',
    'dashboard.urls',
    'dashboard.serializers',
    'analytics.apps',
    'analytics.models',
    'analytics.views',
    'analytics.admin',
    'analytics.urls',
    'analytics.serializers',
    'projects.apps',
    'projects.models',
    'projects.views',
    'projects.admin',
    'projects.urls',
    'projects.serializers',
    'webview',
    'webview.util',
    'webview.event',
    'webview.menu',
    'webview.screen',
    'webview.window',
    'webview.platforms',
    'webview.platforms.winforms',
    'webview.platforms.edgechromium',
    'clr',
    'System',
    'System.Windows.Forms',
    'System.Threading',
    'System.Drawing',
]

all_hidden += _extra_hidden

# ---------------------------------------------------------------------------
# Analysis
# ---------------------------------------------------------------------------

a = Analysis(
    ['launcher.py'],
    pathex=[_project_root],
    binaries=all_binaries,
    datas=all_datas,
    hiddenimports=all_hidden,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=['tkinter', 'matplotlib', 'numpy', 'scipy', 'pandas', 'IPython'],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='VinzapAI_Server',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,
    disable_windowed_traceback=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=None,
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='VinzapAI_Server',
)
