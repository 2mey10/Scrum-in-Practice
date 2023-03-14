from pyexpat.errors import messages
from django.shortcuts import render, redirect
from .forms import UserRegistrationForm,LoginForm
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required


# Create your views here.

def register_view(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()

            messages.success(request, f'Your account has been created. You can log in now!')    
            return redirect('login')
    else:
        form = UserRegistrationForm()

    context = {'form': form}
    return render(request, '', context)


def login_view(request):
    form = LoginForm(request.POST or None)
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