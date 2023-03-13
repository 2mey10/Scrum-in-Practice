from django.shortcuts import render
from rest_framework import viewsets

from . import models
from . import serializers


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = models.Challenge.objects.all()
    serializer_class = serializers.QuestionSerializer
