from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.views import APIView

from . import models
from . import serializers
from .models import MlModel
from .models import RankingModel


class MlModelViewSet(viewsets.ModelViewSet):
    queryset = models.MlModel.objects.all()
    serializer_class = serializers.MlModelSerializer


class RankingEntryViewSet(viewsets.ModelViewSet):
    queryset = models.RankingEntry.objects.all()
    serializer_class = serializers.RankingEntrySerializer


class MakeEntry(APIView):
    def get(self, request, format=None):
        queryset = models.MlModel.objects.all()
        serializer_class = serializers.MlModelSerializer(queryset)
        return Response(serializer_class.data)


