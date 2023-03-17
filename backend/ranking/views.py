from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.views import APIView

import challenges
from . import models
from . import serializers
from .models import MlModel
from .models import RankingModel
from .evalScript import start_evaluation

from django.conf import settings
import os

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


@api_view(['POST'])
def makeEntry(request):
    """
    List all code snippets, or create a new snippet.
    """
    model_id = request.data.get("ml_model_id")
    model_id = int(model_id) -1

    ch_id = request.data.get("challenge_id")
    ch_id = int(ch_id) - 1

    queryset = models.MlModel.objects.values_list('ml_model')

    queryset_ch = models.Challenge.objects.values_list("test_dataset_url")
    data_id = int(queryset_ch[ch_id][0]) - 1

    queryset_data = challenges.models.TrainData.objects.values_list("test_dataset_url")


    path_mod = str(settings.MEDIA_ROOT) +  "/" +  queryset[model_id][0]
    path_zip = str(settings.MEDIA_ROOT) +  "/" +  queryset_data[data_id][0]
    score = start_evaluation(path_mod, "Klassifizierung", path_zip)

    rank_query = models.RankingEntry(model_ref = models.MlModel.objects.all()[model_id],
    username = request.data.get("username"),
    Challengid = request.data.get("challenge_id"),
    modelname = queryset[model_id][0][9:],
    Accuracy = score.get("accuracy"),
    Precision = score.get("precision"),
    Recall = score.get("recall"),
    F1 = score.get("F1"),
    is_human = False)
    rank_query.save()

    serializer_class = serializers.RankingEntrySerializer(rank_query)
    return Response(serializer_class.data)

