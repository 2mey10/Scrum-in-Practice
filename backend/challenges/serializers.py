from rest_framework import serializers
from .models import Challenge


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'description_text',
            'title_text',
            'train_dataset_url',
            'test_dataset_url',
            'metric_choices',
            'role_choices',
            'course_choices',
            'starting_time',
            'end_time',
            'cover_image',

        )
        model = Challenge
