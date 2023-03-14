from pyexpat.errors import messages
from django.shortcuts import render, redirect
from .forms import RegistrationForm,LoginForm
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required


# Create your views here.

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
    return render(request,'', {'form': form, 'msg': msg})


def login_view(request):
    form = Login(request.POST or None)
    msg = None
    if request.method == 'POST':
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
        else:
            msg = 'error validating form'
    return render(request, '', {'form': form, 'msg': msg})


@login_required
def logout_view(request):
    logout_view(request)
    messages.info(request, "Logged out successfully!")
    return redirect('')