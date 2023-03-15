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
            'username',
            'metric_name',
            'metric_value',
            'is_human',
        )
        model = RankingEntry
