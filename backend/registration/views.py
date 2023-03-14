from django.shortcuts import render, redirect
from .forms import RegistrationForm,Login
from django.contrib.auth import authenticate, login
# Create your views here.

def index(request):
    return render(request, 'index.html')


def register_view(request):
    msg = None
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            msg = 'user created'
            return redirect('login_view')
        else:
            msg = 'form is not valid'
    else:
        form = RegistrationForm()
    return render(request,'register.html', {'form': form, 'msg': msg})


def login_view(request):
    form = Login(request.POST or None)
    msg = None
    if request.method == 'POST':
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None and user.is_tutor:
                login(request, user)
                return redirect('tutorpage')
            elif user is not None and user.is_student:
                login(request, user)
                return redirect('studentpage')
            else:
                msg= 'invalid credentials'
        else:
            msg = 'error validating form'
    return render(request, 'login.html', {'form': form, 'msg': msg})


def tutor_view(request):
    return render(request,'tutor.html')


def student_view(request):
    return render(request,'student.html')
