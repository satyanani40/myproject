from mongoengine import *
#connect('test', host='mongodb://test:test@127.0.0.1:27017/')
#connect('test')

from mongoengine.django.auth import User
from rest_framework import serializers

from rest_framework_mongoengine.serializers import DocumentSerializer

class Chapterdetails(Document):
    chapter_name = StringField(max_length=200)
    chapter_path = StringField(max_length=500)
    cat = StringField(max_length=500)

class Examdetails(Document):
    exam_name = StringField(max_length= 25000)
    question = StringField(max_length= 25000)
    a = StringField(max_length= 2500)
    b = StringField(max_length= 2500)
    c = StringField(max_length= 2500)
    d = StringField(max_length= 2500)
    correct = StringField(max_length= 250)
    cat = StringField(max_length=500)
    time = StringField(max_length= 2500)
    pass_mark = StringField(max_length= 2500)

class Admin(Document):
    email = StringField(max_length=200)
    password = StringField(max_length=500)
    is_active = BooleanField(default = False)
    is_superuser = BooleanField(default = False)
    access_exams = ListField()

class Peoples(Document):
    email = StringField(max_length=200)
    password = StringField(max_length=500)
    is_active = BooleanField(default = False)
    is_superuser = BooleanField(default = False)
    access_exams = ListField()

