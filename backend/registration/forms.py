from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User
Course_ofstudies=(
    ("1", "One"),
    ("2", "Two"),
    ("3", "Three"),
    ("4", "Four"),
    ("5", "Five"),
)
student_status=(
    ("1", "intern"),
    ("2", "extern"),
)

modul_status=(
    ("1", "Modul1"),
    ("2", "Modul"),
)
class Login(forms.Form):
    username = forms.CharField(label='Your name',required=True)
    password = forms.CharField()

class RegistrationForm(UserCreationForm):
    matriculationnumber = forms.IntegerField()
    Courseofstudies = forms.CharField()
    exsam = forms.CharField()
    Creditingofthemodule = forms.CharField()
    studentstatus = forms.ChoiceField(choices=student_status)
    username = forms.CharField()
    firstname = forms.CharField()
    lastname = forms.CharField()
    birthday = forms.DateField()
    address = forms.ChoiceField()
    password1 = forms.CharField()
    password2 = forms.CharField()
    email = forms.CharField()
    fileupload = forms.FileField()
    key = forms.CharField()


class Meta:
        model = User
        fields = ('matriculationnumber','Courseofstudies','exsam','Creditingofthemodule','studentstatus', 'username','firstname','lastname',  'birthday','address', 'password1', 'password2','email','fileupload')