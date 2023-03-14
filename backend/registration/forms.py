from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class LoginForm(forms.Form):
    username = forms.CharField(label='Your name',required=True)
    password = forms.CharField()

class RegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('matriculationnumber','Courseofstudies','exsam','Creditingofthemodule','studentstatus', 'username','firstname','lastname',  'birthday','address', 'password1', 'password2','email','key')