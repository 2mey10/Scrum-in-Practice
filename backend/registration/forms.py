from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class LoginForm(forms.Form):
    username = forms.CharField(label='Your name',required=True)
    password = forms.CharField()

status= {
    '1':'Intern',
    '2':'Extern'
}
class UserRegistrationForm(UserCreationForm):
    matriculationnumber = forms.IntegerField()
    Courseofstudies = forms.CharField(max_length=50)
    exsam = forms.CharField(max_length=50)
    Creditingofthemodule = forms.CharField(max_length=50)
    studentstatus = forms.ChoiceField(choices=status)
    first_name = forms.CharField(max_length=101)
    last_name = forms.CharField(max_length=101)
    birthday = forms.DateField()
    address = forms.CharField(max_length=50)
    email = forms.EmailField()
    key = forms.CharField(max_length=50)

    class Meta:
        model = User
        fields = ['matriculationnumber','Courseofstudies','exsam','Creditingofthemodule','studentstatus','username', 'first_name', 'last_name','birthday','address', 'email', 'password1', 'password2','key']