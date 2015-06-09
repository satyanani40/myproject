"""exam URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import patterns, include, url
from django.contrib import admin
from views import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from django.views.generic import TemplateView


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="index.html")),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^login', csrf_exempt(LoginCheck.as_view())),
    url(r'^adminLogin', csrf_exempt(AdminLogin.as_view())),
    url(r'^register', csrf_exempt(DoRegister.as_view())),
    url(r'^chapter', csrf_exempt(Chapters.as_view())),
    url(r'^feedback', csrf_exempt(Feedback.as_view())),
    url(r'^getAllChapters', csrf_exempt(All_chapters.as_view())),
    url(r'^create_exam', csrf_exempt(CreateExam.as_view())),
    url(r'^getExams', getExams),
    url(r'^getExam', getExam),
    url(r'^updateList', updateList),
    url(r'^test', test),
]

from django.conf import settings

if settings.DEBUG:
    urlpatterns += patterns('', (r'^media\/(?P<path>.*)$',
                                 'django.views.static.serve',
                                 {'document_root': settings.STATIC_ROOT}),
                           )
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    urlpatterns += staticfiles_urlpatterns()
