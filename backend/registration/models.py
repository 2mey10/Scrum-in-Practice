from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    class Status(models.TextChoices):
            INTERN = "1", "intern"
            EXTERN = "2", "extern"
            
    matriculationnumber = models.IntegerField()
    Courseofstudies = models.CharField(max_length=50)
    exsam = models.CharField(max_length=50)
    Creditingofthemodule = models.CharField(max_length=50)
    studentstatus = models.TextField(choices=Status.choices)
    username = models.CharField(max_length=50,unique=True)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    birthday = models.DateField(max_length=50)
    address = models.CharField(max_length=50)
    password1 = models.CharField(max_length=50)
    password2 = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    key = models.CharField(max_length=50)
    
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username


