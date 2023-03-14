from rest_framework import serializers
from .models import Challenge
from .models import Roles
from .models import Courses
from .models import Metric


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



class QuestionSerializer(serializers.ModelSerializer):

    metric_choices = MetricSerializer(many=True)
    role_choices = RolesSerializer(many=True)
    course_choices = CoursesSerializer(many=True)
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

    def create(self, validated_data):
        metric_data = validated_data.pop('metric_choices')
        role_data = validated_data.pop('role_choices')
        course_data = validated_data.pop('course_choices')

        tag = Challenge.objects.create(**validated_data)

        for met in metric_data:
            Metric.objects.create(tag=tag, **met)
        for rol in role_data:
            Roles.objects.create(tag=tag, **rol)
        for cou in course_data:
            Courses.objects.create(tag=tag, **cou)

        return tag