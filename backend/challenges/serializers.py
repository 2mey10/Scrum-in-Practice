from rest_framework import serializers
from .models import Challenge


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'description_text',
            'title_text',
            'dataset_url',
            'metric_choices',
            'role_choices'
        )
        model = Challenge
