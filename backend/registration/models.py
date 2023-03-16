from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import User, AbstractUser
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


# class MyUserManager(BaseUserManager):
#     def create_user(self, username, date_of_birth, password=None):
#         """
#         Creates and saves a User with the given email, date of
#         birth and password.
#         """
#
#         user = self.model(
#             username=username,
#             date_of_birth=date_of_birth,
#         )
#
#         user.set_password(password)
#         user.save(using=self._db)
#         return user
#
#     def create_superuser(self, username, birthday, password):
#         """
#         Creates and saves a superuser with the given email, date of
#         birth and password.
#         """
#         u = self.create_user(username,
#                         password=password,
#                         birthday=birthday
#                     )
#         u.is_admin = True
#         u.save(using=self._db)
#         return u

class Usermodel(AbstractUser):
    username = models.CharField(max_length=255, null=False,unique=True)
    firstname = models.CharField(max_length=255, null=True)
    lastname = models.CharField(max_length=255, null=True)
    matriculationnumber = models.IntegerField(null=True)
    studentstatus = models.CharField(max_length=20)
    Courseofstudies = models.CharField(max_length=50, null=True)
    exsam = models.CharField(max_length=50, null=True)
    creditingofthemodule = models.CharField(max_length=50, null=True)
    email = models.EmailField(max_length=255, null=False)
    password = models.CharField(max_length=50)
    ifLogged = models.BooleanField(default=False)
    token = models.CharField(max_length=500, null=True, default="")
    birthday = models.DateField(null=True)
    address = models.CharField(max_length=50, null=True)
    DSVG = models.BooleanField(default=True)
    tutortoken = models.CharField(max_length=50,null=True,default="")

    # objects = MyUserManager()
    def __str__(self):
        return "{} -{}".format(self.username, self.email)

