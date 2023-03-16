from django.db.models import Q  # for queries
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Usermodel
# from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from uuid import uuid4
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password


# class UserSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(
#         required=True,
#         validators=[UniqueValidator(queryset=Usermodel.objects.all())]
#     )
#     username = serializers.CharField(
#         required=True,
#         validators=[UniqueValidator(queryset=Usermodel.objects.all())]
#     )
#     password = serializers.CharField(max_length=8)
#     birthday = serializers.DateField()
#     address = serializers.CharField(max_length=50)
#     matriculationnumber = serializers.IntegerField()
#     firstname = serializers.CharField(max_length=255)
#     lastname = serializers.CharField(max_length=255)
#     matriculationnumber = serializers.IntegerField()
#     Courseofstudies = serializers.CharField(max_length=50)
#     exsam = serializers.CharField(max_length=50)
#     studentstatus = serializers.ChoiceField(
#         choices=['Intern', 'Extern'])
#     creditingofthemodule = serializers.CharField(max_length=50)
#     DSVG = serializers.BooleanField(default=True)
#
#     class Meta:
#         model = Usermodel
#         fields = (
#             'username',
#             'firstname',
#             'lastname',
#             'matriculationnumber',
#             'studentstatus',
#             'Courseofstudies',
#             'exsam',
#             'email',
#             'password',
#             'birthday',
#             'address',
#             'creditingofthemodule',
#             'DSVG',
#         )
#
#
#
#     def validate_password(self, value: str) -> str:
#         """
#         Hash value passed by user.
#
#         :param value: password of a user
#         :return: a hashed version of the password
#         """
#         return make_password(value)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['firstname'] = user.firstname
        token['tutortoken'] = user.tutortoken
        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True)
    email = serializers.EmailField(
            required=True,
            validators=[]
        )
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=Usermodel.objects.all())]
    )
    # password = serializers.CharField(max_length=8)
    birthday = serializers.DateField()
    address = serializers.CharField(max_length=50)
    matriculationnumber = serializers.IntegerField()
    firstname = serializers.CharField(max_length=255)
    lastname = serializers.CharField(max_length=255)
    matriculationnumber = serializers.IntegerField()
    Courseofstudies = serializers.CharField(max_length=50)
    exsam = serializers.CharField(max_length=50)
    studentstatus = serializers.ChoiceField(
        choices=['Intern', 'Extern'])
    creditingofthemodule = serializers.CharField(max_length=50)
    tutortoken = serializers.CharField(max_length=50,allow_null=True,allow_blank=True)
    # DSVG = serializers.BooleanField(default=True)

    class Meta:
        model = Usermodel
        fields = ('username',
                  'firstname',
                  'lastname',
                  'matriculationnumber',
                  'studentstatus',
                  'Courseofstudies',
                  'exsam',
                  'email',
                  'password',
                  'birthday',
                  'address',
                  'creditingofthemodule',
                  'tutortoken')

    def validate(self, attrs):
        return attrs

    def create(self, validated_data):
        user = Usermodel.objects.create(
            username=validated_data['username'],
            password=validated_data['password'],
            firstname=validated_data['firstname'],
            lastname=validated_data['lastname'],
            matriculationnumber=validated_data['matriculationnumber'],
            studentstatus=validated_data['studentstatus'],
            Courseofstudies=validated_data['Courseofstudies'],
            exsam=validated_data['exsam'],
            email=validated_data['email'],
            birthday=validated_data['birthday'],
            address=validated_data['address'],
            creditingofthemodule=validated_data['creditingofthemodule'],
            tutortoken=validated_data['tutortoken']
        )
        user.set_password(validated_data["password"])
        user.save()

        return user
