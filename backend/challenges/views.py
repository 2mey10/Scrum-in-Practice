import codecs
import mimetypes

from django.shortcuts import render, redirect
from rest_framework import viewsets
from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404
import os
from django.http import HttpResponse, HttpResponseNotFound
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveAPIView

import challenges
from .models import Challenge
import os
import zipfile
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import QuestionSerializer
from . import models
from . import serializers
from django.conf import settings


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


@api_view(['GET'])
def getSingleChallenge(request, pk):
    """
    List all code snippets, or create a new snippet.
    """

    queryset = models.Challenge.objects.all()[pk-1]

    print(queryset)

    serializer_class = serializers.QuestionSerializer(queryset)

    return Response(serializer_class.data)



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

def download_file(request, ch):
    # Define Django project base directory
    # Define text file name



    queryset_ch = models.Challenge.objects.values_list("test_dataset_url")
    data_id = int(queryset_ch[ch][0]) - 1

    queryset_data = challenges.models.TrainData.objects.values_list("test_dataset_url")

    filename =  '/' + queryset_data[data_id][0]
    #filename = '/testdata/test_set.zip'


    # Define the full file path
    filepath = str(settings.MEDIA_ROOT) + filename
    # Open the file for reading content
    #path = open(filepath, 'r')

    with codecs.open(filepath, 'r', encoding='utf-8', errors='ignore') as path:

    # Set the mime type
   # mime_type, _ = mimetypes.guess_type(filepath)
    # Set the return value of the HttpResponse

        response = HttpResponse(path, content_type=' application/zip')
    # Set the HTTP header for sending to browser
        response['Content-Disposition'] = "attachment; filename=%s" % filename
    # Return the response value
        return response





