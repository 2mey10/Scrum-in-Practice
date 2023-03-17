
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
from django.conf import settings
from django.http import FileResponse
from rest_framework import generics, status


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = models.Challenge.objects.all()
    serializer_class = serializers.QuestionSerializer


class RolesViewSet(viewsets.ModelViewSet):
    queryset = models.Roles.objects.all()
    serializer_class = serializers.RolesSerializer


class CoursesViewSet(viewsets.ModelViewSet):
    queryset = models.Courses.objects.all()
    serializer_class = serializers.CoursesSerializer


class MetricViewSet(viewsets.ModelViewSet):
    queryset = models.Metric.objects.all()
    serializer_class = serializers.MetricSerializer


# class DownloadTrainDataView(APIView):
#     queryset = models.Challenge.objects.all()
#     serializer_class = QuestionSerializer

#     def get(self, request, pk):
#         challenge = self.get_object(pk)
#         print(challenge)
#         serializer = self.serializer_class(challenge)
#         print(serializer)
#         response = serializer.download_train_data(challenge)
#         if response:
#             return response
#         else:
#             return Response(status=404)

#     def get_object(self, pk):
#         try:
#             return Challenge.objects.get(pk=pk)
#         except Challenge.DoesNotExist:
#             raise Http404


# from rest_framework import generics


# class ChallengeDownloadView(generics.RetrieveAPIView):
#     queryset = Challenge.objects.all()
#     serializer_class = QuestionSerializer

#     def retrieve(self, request, *args, **kwargs):
#         challenge = self.get_object()

#         # Check if the train dataset exists
#         if not challenge.train_dataset_url:
#             return Response({'error': 'Train dataset not found'}, status=status.HTTP_404_NOT_FOUND)

#         # Get the full path of the train dataset
#         train_dataset_path = os.path.join(settings.MEDIA_ROOT, str(challenge.train_dataset_url))

#         # Check if the train dataset file exists
#         if not os.path.isfile(train_dataset_path):
#             return Response({'error': 'Train dataset file not found'}, status=status.HTTP_404_NOT_FOUND)

#         # Open the train dataset file and return a file response
#         with open(train_dataset_path, 'rb') as f:
#             response = FileResponse(f)
#             response['Content-Disposition'] = f'attachment; filename={os.path.basename(train_dataset_path)}'
#             return response


class ChallengeDownloadView(generics.RetrieveAPIView):
    #
    queryset = models.Challenge.objects.all()
    serializer_class = QuestionSerializer

    def retrieve(self, request, *args, **kwargs):
        challenge = self.get_object()

        train_dataset_path = os.path.join(settings.MEDIA_ROOT ,'traindata', str(challenge.train_dataset_url))
        print(train_dataset_path)
        if os.path.isfile(train_dataset_path):
                with open(train_dataset_path, 'rb') as f:
                    response = HttpResponse(f.read(), content_type='application/octet-stream')
                    response['Content-Disposition'] = f'attachment; filename={os.path.basename(train_dataset_path)}'
                    return response
        else:
            return Response({'error': 'Trainingsdatendatei nicht gefunden'}, status=status.HTTP_404_NOT_FOUND)
        # if not challenge.train_dataset_url:
        #     return Response({'error': 'Trainingsdatendatei nicht gefunden'}, status=status.HTTP_404_NOT_FOUND)

        # # Öffnen Sie die Trainingsdatendatei und geben Sie eine Dateiantwort zurück
        # with challenge.train_dataset_url.open(mode='rb') as f:
        #     response = FileResponse(f)
        #     response['Content-Disposition'] = f'attachment; filename={os.path.basename(challenge.train_dataset_url.name)}'
        #     return response
