from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.views import APIView

from . import models
from . import serializers
from .models import MlModel
from .models import RankingModel
from .evalScript import start_evaluation

class MlModelViewSet(viewsets.ModelViewSet):
    queryset = models.MlModel.objects.all()
    serializer_class = serializers.MlModelSerializer


class RankingEntryViewSet(viewsets.ModelViewSet):
    queryset = models.RankingEntry.objects.all()
    serializer_class = serializers.RankingEntrySerializer


#class MakeEntry(APIView):
 #   def get(self, request, format=None):
 #       queryset = models.MlModel.objects.all()
 #       serializer_class = serializers.MlModelSerializer(queryset)
 #       return Response(serializer_class.data)


@api_view(['GET'])
def makeEntry(request):
    """
    List all code snippets, or create a new snippet.
    """
    queryset = models.MlModel.objects.all()[1]
    serializer_class = serializers.MlModelSerializer(queryset)

    print(queryset)
    score = start_evaluation(queryset, "Klassifizierung", "")

    #queryset = models.MlModel.objects.all()[1]
    #serializer_class = serializers.MlModelSerializer(queryset)

    return Response(serializer_class.data)

