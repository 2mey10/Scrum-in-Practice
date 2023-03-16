
from django.shortcuts import render, redirect
from rest_framework import viewsets
from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404
import os
from django.http import HttpResponse, HttpResponseNotFound
from .models import Challenge
import os
import zipfile
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import QuestionSerializer
from . import models
from . import serializers


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = models.Challenge.objects.all()
    serializer_class = serializers.QuestionSerializer

class RolesViewSet(viewsets.ModelViewSet):
    queryset = models.Roles.objects.all()
    serializer_class = serializers.RolesSerializer


class CoursesViewSet(viewsets.ModelViewSet):
    queryset = models.Courses.objects.all()
    serializer_class = serializers.CoursesSerializer


class TrainDatasViewSet(viewsets.ModelViewSet):
    queryset = models.TrainData.objects.all()
    serializer_class = serializers.TrainDataSerializer

class MetricViewSet(viewsets.ModelViewSet):
    queryset = models.Metric.objects.all()
    serializer_class = serializers.MetricSerializer




class DownloadTrainDataView(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer

    def get(self, request, pk):
        challenge = self.get_object(pk)
        serializer = self.serializer_class(challenge)
        response = serializer.download_train_data(challenge)
        if response:
            return response
        else:
            return Response(status=404)

    def get_object(self, pk):
        try:
            return Challenge.objects.get(pk=pk)
        except Challenge.DoesNotExist:
            raise Http404





