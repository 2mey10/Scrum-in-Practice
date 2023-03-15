from django.shortcuts import redirect
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .models import Usermodel
from .serializers import UserSerializer, UserLoginSerializer, UserLogoutSerializer, RegisterSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class Record(generics.ListCreateAPIView):
    # get method handler
    queryset = Usermodel.objects.all()
    serializer_class = UserSerializer


class RegisterView(generics.CreateAPIView):
    queryset = Usermodel.objects.all()
    serializer_class = RegisterSerializer


class Login(generics.GenericAPIView):
    # get method handler
    queryset = Usermodel.objects.all()
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer_class = UserLoginSerializer(data=request.data)
        if serializer_class.is_valid(raise_exception=True):
            return Response(serializer_class.data, status=HTTP_200_OK)
        return Response(serializer_class.errors, status=HTTP_400_BAD_REQUEST)


class Logout(generics.GenericAPIView):
    queryset = Usermodel.objects.all()
    serializer_class = UserLogoutSerializer

    def post(self, request, *args, **kwargs):
        serializer_class = UserLogoutSerializer(data=request.data)
        if serializer_class.is_valid(raise_exception=True):
            return Response(serializer_class.data, status=HTTP_200_OK)
        return Response(serializer_class.errors, status=HTTP_400_BAD_REQUEST)
