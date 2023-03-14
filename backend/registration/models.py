from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    is_tutor= models.BooleanField('Is tutor', default=False)
    is_student = models.BooleanField('Is student', default=False)