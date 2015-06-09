from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.views.generic import View
from django.shortcuts import  render
import json
from models import *
import os
from settings import *
from django.core.files.base import ContentFile
import datetime
from django.core import serializers
from mongoengine.django.auth import User
from django.core.mail import EmailMultiAlternatives, send_mail
from bson.json_util import dumps
from bson import json_util
from django.core.serializers.json import DjangoJSONEncoder
#from rest_framework import viewsets


import csv
class All_chapters(View):
    def get(self, request):
        queryset = Chapterdetails.objects.all()
        data = queryset.to_json()
        loop_data = json.loads(data)
        for k in loop_data:
            k['_id'] = k['_id']['$oid']
        return HttpResponse(dumps({'data':loop_data}))

class CreateExam(View):
    def get(self, request):

        """queryset = Examdetails.objects.all()
        data = queryset.to_json()
        loop_data = json.loads(data)
        for k in loop_data:
            k['_id'] = k['_id']['$oid']"""
        return HttpResponse('bad request')

    def post(self, request):
        try:
            print request.POST['exam_name']
            print request.FILES['upload']
            folder = 'all_csv_files'
            uploaded_filename = request.FILES['upload'].name
            try:
                os.mkdir(os.path.join(BASE_DIR, folder))
            except:
                pass
            # save the uploaded file inside that folder.
            uploaded_filename = datetime.datetime.now().strftime("%y_%m_%d_%H_%M_%S_%f_file.csv")
            full_filename = os.path.join(BASE_DIR, folder, uploaded_filename)

            store_path = folder+'/'+uploaded_filename
            fout = open(full_filename, 'wb+')
            file_content = ContentFile(request.FILES['upload'].read())
            # Iterate through the chunks.
            for chunk in file_content.chunks():
                fout.write(chunk)
            fout.close()

            with open(full_filename, 'rb') as csvfile:
                spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
                counter = 0
                for row in spamreader:
                    print '-------------------------'
                    data =  ', '.join(row)
                    details = data.split(",")

                    if counter > 0:
                        exam_details_insert = Examdetails(exam_name = request.POST['exam_name'], cat = request.POST['cat'])
                        exam_details_insert.cat = request.POST['cat']
                        exam_details_insert.question =details[0]
                        exam_details_insert.a = details[1]
                        exam_details_insert.b = details[2]
                        exam_details_insert.c = details[3]
                        exam_details_insert.d = details[4]
                        exam_details_insert.correct = details[5]
                        exam_details_insert.time = request.POST['exam_time']
                        exam_details_insert.pass_mark = request.POST['exam_pass_mark']
                        exam_details_insert.save()
                    counter += 1

            return HttpResponse(json.dumps({'status':200}))
        except Exception as e:
            return HttpResponse(json.dumps({'status':400}))

class LoginCheck(View):

    def get(self, request):
        return render(request, 'chapters.html')
    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data['email']
            password = data['password']
            user = Peoples.objects.get(email=email, password=password)
            user_data = json.loads(user.to_json())
            user_data['_id'] = str(user_data['_id']['$oid'])
            if user is not None:
                # the password verified for the user
                if user.is_active:
                    return HttpResponse(json.dumps({'data':user_data,'status':200}))
                else:
                    return HttpResponse(json.dumps({'status':400}))
            else:
                # the authentication system was unable to verify the username and password
                return HttpResponse(json.dumps({'status':400}))

            return HttpResponse(json.dumps({'status':400}))
        except Exception as e:
            return HttpResponse(json.dumps({'status':400}))

class AdminLogin(View):

    def get(self, request):
        return HttpResponse('method not allowed')
    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data['email']
            password = data['password']
            user = Admin.objects.get(email=email, password=password)
            user_data = json.loads(user.to_json())
            user_data['_id'] = str(user_data['_id']['$oid'])

            if user is not None:
                # the password verified for the user
                if user.is_active:
                    return HttpResponse(json.dumps({'data':user_data,'status':200}))
                else:
                    return HttpResponse(json.dumps({'status':400}))
            else:
                # the authentication system was unable to verify the username and password
                return HttpResponse(json.dumps({'status':400}))

            return HttpResponse(json.dumps({'status':400}))
        except Exception as e:
            print e
            return HttpResponse(json.dumps({'status':400}))

class Chapters(View):
    def get(self, request):
        return render(request, 'chapters.html')

    def post(self, request):
        folder = 'chapter_pdf'
        uploaded_filename = request.FILES['upload'].name
        try:
            os.mkdir(os.path.join( BACK_PATH+"/static/", folder))
        except:
            pass
        # save the uploaded file inside that folder.
        uploaded_filename = datetime.datetime.now().strftime("%y_%m_%d_%H_%M_%S_%f_file.pdf")
        full_filename = os.path.join( BACK_PATH+"/static/", folder, uploaded_filename)
        store_path = folder+'/'+uploaded_filename
        fout = open(full_filename, 'wb+')
        file_content = ContentFile(request.FILES['upload'].read())
        try:
            # Iterate through the chunks.
            for chunk in file_content.chunks():
                fout.write(chunk)
            fout.close()
            data = Chapterdetails(chapter_name = request.POST['chaptername'])
            data.cat = request.POST['cat']
            data.chapter_path = store_path
            data.save()
            html = "<html><body>SAVED</body></html>"
            return HttpResponse(json.dumps({'status':200}))
        except Exception as e:
            print e
            html = "<html><body>NOT SAVED</body></html>"
            return HttpResponse(json.dumps({'status':400}))

class DoRegister(View):
    def get(self, request):
        return HttpResponse('bad request')

    def post(self, request):
        try:
            status = ''
            data = json.loads(request.body)
            password = data['password'] #request_data['email'
            email    = data['email']      #request_data['email'
            isuser_email = is_emailalredyexits(email)
            #isusername = is_useravaible(username)

            dataa = Examdetails.objects.all()
            if dataa is None:
                return HttpResponse(json.dumps({'status':400, 'error': 'create at least one exam first'}))
            else:
                access_exam = ''
                for temp in dataa:
                   access_exam = temp['exam_name']
                   break

                if not isuser_email:
                    User_save = Peoples(email=email, password=password)
                    User_save.is_active = True;
                    User_save.access_exams = [access_exam]
                    User_save.save()
                    user_email = User_save.email

                    subject = 'user account details'
                    text_content = 'useremail :'+user_email+'<br/>user password:'+password+'<br/>username:'
                    from_email = EMAIL_HOST_USER
                    to = user_email
                    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                    #msg.attach_alternative(html_content, "text/html")
                    msg.send()
                    status = 'a details  has been sent to your '+user_email+' please click on the link'
                    return HttpResponse(json.dumps({'status':200, 'error': 'user successfully created'}))
                else:
                    status = 'email or username alredy exits'
                return HttpResponse(json.dumps({'status':400, 'error': 'email alredy exits'}))
        except Exception as e:
            return HttpResponse(json.dumps({'status':400, 'error': 'failed to create user please logout and login'}))

class Feedback(View):
    def get(self, request):
        return render(request, 'chapters.html')

    def post(self, request):
        try:
            status = ''
            data = json.loads(request.body)
            content = data['content'] #request_data['email'
            if content:
                print "----------",content
                print EMAIL_HOST_USER
                subject = 'Feedback Information'
                text_content = content
                from_email = "anonymous@gmail.com"
                to = EMAIL_HOST_USER
                msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                msg.send()
            return HttpResponse(json.dumps({'status':200}))
        except Excetptions as e:
            return HttpResponse(json.dumps({'status':400}))
def is_emailalredyexits(email):
    status = 0
    try:
        if email:
            Peoples.objects.get(email=email)
            status = 1
    except Exception as e:
        status = 0
    return status

def is_useravaible(username):
    status = 0
    try:
        if username:
            Peoples.objects.get(username=username)
            status = 1
    except Exception as e:
        status = 0
    return status

@csrf_exempt
def getExams(request):
    print '--------------------DDDDDDDDDD'
    data = json.loads(request.body)
    print data['cat']
    exam_query = Examdetails.objects(cat= data['cat'])
    return HttpResponse(dumps({'data':exam_query.to_json()}))

@csrf_exempt
def getExam(request):
    print '--------------------DDDDDDDDDD'
    data = json.loads(request.body)
    print data['cat']
    exam_query = Examdetails.objects(cat= data['cat'], exam_name= data['exam_name'])
    return HttpResponse(dumps({'data':exam_query.to_json()}))

@csrf_exempt
def updateList(request):
    try:
        data = json.loads(request.body)
        print data['email']
        print data['exam_name']
        data_object = Peoples.objects(email=data['email'])
        for temp in data_object:
            for temp2 in temp.access_exams:
                if temp2 == data['exam_name']:
                    return HttpResponse('bad request')

        Peoples.objects(email=data['email']).update_one(push__access_exams=data['exam_name'])
        return HttpResponse('hai')
    except Exception  as e:
        return HttpResponse(e)

@csrf_exempt
def test(request):
    try:
        """User_save = Peoples.objects.all()
        for temp in User_save:
            print '=================='
            data = temp
            print data['email']
            break
        print '-------------'"""
        subject = 'Feedback Information'
        text_content = 'Content'
        from_email = "anonymous@gmail.com"
        to = 'satya.nani.40@gmail.com'
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        #msg.send()
        return HttpResponse('testing link')
    except Exception  as e:
        return HttpResponse(e)
