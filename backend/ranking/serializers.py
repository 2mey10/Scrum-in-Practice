from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers
from .models import MlModel, RankingEntry


class MlModelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'ml_model',
        )
        model = MlModel


class RankingEntrySerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            'id',
            'model_ref',
            'username',
            'Challengid',
            'modelname',
            'Accuracy',
            'Precision',
            'Recall',
            'F1',
            'is_human',

        )
        model = RankingEntry
