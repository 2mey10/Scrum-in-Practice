from rest_framework import serializers
from .models import Challenge
from .models import Roles
from .models import Courses
from .models import Metric


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
        depth = 1


class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'role_name',
        )
        model = Roles



class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'course_name',
            'course_description',
        )
        model = Courses



class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'metric_name',
            'metric_formular',
        )
        model = Metric


