"""
Django settings for myproject project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
DJ_PROJECT_DIR = os.path.dirname(__file__)
BASE_DIR = os.path.dirname(DJ_PROJECT_DIR)

BACK_PATH = os.path.normpath(os.getcwd() + os.sep + os.pardir)
BACK_PATH = BACK_PATH+'/55526061fcf933df0e00002e/app-root/runtime/repo/wsgi/'
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '!iudke*hi8vo#qyntq5yxm+p2itkuqg-m@bo8o%+cbnq(h%@@-'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

TEMPLATE_DEBUG = False

ALLOWED_HOSTS = ['*']


AUTHENTICATION_BACKENDS = (
        'mongoengine.django.auth.MongoEngineBackend',
)
LOGIN_URL = '/login'
LOGIN_REDIRECT_URL = '/login'

# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'mongoengine.django.mongo_auth',
    'rest_framework',
    'rest_framework_mongoengine',
)


TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'static/app/views/'),
    os.path.join(BASE_DIR, 'static/app/'),
    os.path.join(BASE_DIR, 'static/'),
)


STATIC_ROOT= ""

STATIC_URL = '/static/'

print '----------------------------------->>>'
print BASE_DIR

STATICFILES_DIRS = (
    os.path.join(BASE_DIR,"static/"),
)


MONGOENGINE_USER_DOCUMENT = 'mongoengine.django.auth.User'
AUTH_USER_MODEL = 'mongo_auth.MongoUser'



SESSION_ENGINE = 'mongoengine.django.sessions'
SESSION_SERIALIZER = 'mongoengine.django.sessions.BSONSerializer'

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

# GETTING-STARTED: change 'myproject' to your project name:
ROOT_URLCONF = 'myproject.urls'

WSGI_APPLICATION = 'myproject.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases

#DBNAME = 'python'

# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.dummy'
    }
}


# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/




STATIC_URL = '/static/'

EMAIL_HOST = 'smtp.gmail.com'

EMAIL_HOST_USER = 'nani282828@gmail.com'

EMAIL_HOST_PASSWORD = 'raJUgaRU3959.'

EMAIL_PORT = 587

EMAIL_USE_TLS = True
