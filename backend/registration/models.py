from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser
# Create your models here.

STATUS = (
    ('I', 'Intern'),
    ('E', 'Extern')
)
ROLES = (
    ('T', 'tutor'),
    ('S', 'student')
)

class Usermodel(AbstractBaseUser):
    username = models.CharField(max_length=255, null=False)
    firstname = models.CharField(max_length=255, null=True)
    lastname = models.CharField(max_length=255, null=True)
    matriculationnumber = models.IntegerField(null=True)
    studentstatus = models.CharField(max_length=1, choices=STATUS)
    Courseofstudies = models.CharField(max_length=50,null=True)
    exsam = models.CharField(max_length=50,null=True)
    creditingofthemodule = models.CharField(max_length=50,null=True)
    email = models.EmailField(max_length=255, null=False)
    password = models.CharField(max_length=50)
    ifLogged = models.BooleanField(default=False)
    token = models.CharField(max_length=500, null=True, default="")
    birthday = models.DateField(null=True)
    address = models.CharField(max_length=50,null=True)
    DSVG =  models.BooleanField(default=True)
    

    def __str__(self):
        return "{} -{}".format(self.username, self.email)
