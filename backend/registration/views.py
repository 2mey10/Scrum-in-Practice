from django.shortcuts import redirect
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
# from .serializers import UserSerializer, UserLoginSerializer, UserLogoutSerializer,RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Usermodel
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer


# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = Usermodel.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# class Record(generics.ListCreateAPIView):
#     # get method handler
#     queryset = Usermodel.objects.all()
#     serializer_class = UserSerializer
#
# class RegisterView(generics.CreateAPIView):
#     queryset = Usermodel.objects.all()
#     serializer_class = RegisterSerializer
#
