from rest_framework import serializers
from .models import MlModel


class MlModelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'ml_model',
        )
        model = MlModel

