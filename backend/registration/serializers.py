from django.db.models import Q  # for queries
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Usermodel
#from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from uuid import uuid4


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=Usermodel.objects.all())]
        )
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=Usermodel.objects.all())]
        )
    password = serializers.CharField(max_length=8)
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
    DSVG = serializers.BooleanField(default=True)

    class Meta:
        model = Usermodel
        fields = (
            'username',
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
            'DSVG',
        )


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=Usermodel.objects.all())]
        )
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=Usermodel.objects.all())]
        )
    password = serializers.CharField(max_length=8)
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
    creditingofthemodule = serializers.CharField()
    DSVG = serializers.BooleanField(default=True)

    class Meta:
        model = Usermodel
        fields = (
            'username',
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
            'DSVG',
        )

def create(self, validated_data):
    user = Usermodel.objects.create(
        username=validated_data['username'],
        firstname=validated_data['firstname'],
        lastname=validated_data['lastname'],
        matriculationnumber=validated_data['matriculationnumber'],
        studentstatus=validated_data['studentstatus'],
        Courseofstudies=validated_data['Courseofstudies'],
        exsam=validated_data['exsam'],
        email=validated_data['email'],
        password=validated_data['password'],
        birthday=validated_data['birthday'],
        address=validated_data['address'],
        creditingofthemodule=validated_data['creditingofthemodule'],
        DSVG=validated_data['DSVG']  
    )
    user.save()
    return user


class UserLoginSerializer(serializers.ModelSerializer):
    # to accept either username or email
    username = serializers.CharField()
    password = serializers.CharField()
    token = serializers.CharField(required=False, read_only=True)

    def validate(self, data):
        # user,email,password validator
        username = data.get("username", None)
        password = data.get("password", None)
        if not username and not password:
            raise ValidationError("Details not entered.")
        user = None
        # if the email has been passed
        if '@' in username:
            user = Usermodel.objects.filter(
                Q(email=username) &
                Q(password=password)
                ).distinct()
            if not user.exists():
                raise ValidationError("User credentials are not correct.")
            user = Usermodel.objects.get(email=username)
        else:
            user = Usermodel.objects.filter(
                Q(username=username) &
                Q(password=password)
            ).distinct()
            if not user.exists():
                raise ValidationError("User credentials are not correct.")
            user = Usermodel.objects.get(username=username)
        if user.ifLogged:
            raise ValidationError("User already logged in.")
        user.ifLogged = True
        data['token'] = uuid4()
        user.token = data['token']
        user.save()
        return data

    class Meta:
        model = Usermodel
        fields = (
            'username',
            'password',
            'token',
        )

        read_only_fields = (
            'token',
        )


class UserLogoutSerializer(serializers.ModelSerializer):
    token = serializers.CharField()
    status = serializers.CharField(required=False, read_only=True)

    def validate(self, data):
        token = data.get("token", None)
        print(token)
        user = None
        try:
            user = Usermodel.objects.get(token=token)
            if not user.ifLogged:
                raise ValidationError("User is not logged in.")
        except Exception as e:
            raise ValidationError(str(e))
        user.ifLogged = False
        user.token = ""
        user.save()
        data['status'] = "User is logged out."
        return data

    class Meta:
        model = Usermodel
        fields = (
            'token',
            'status',
        )