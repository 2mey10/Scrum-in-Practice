from rest_framework import serializers
from .models import Challenge
from .models import Roles
from .models import Courses
from .models import Metric
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.http import HttpResponse
import os
import zipfile

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


class QuestionSerializer(WritableNestedModelSerializer):
    metric_choices = MetricSerializer(many=True)
    role_choices = RolesSerializer(many=True)
    course_choices = CoursesSerializer(many=True)

    # def download_train_data(self, obj):
    #     if obj.train_dataset_url:
    #         file_path = default_storage.path(obj.train_dataset_url.name)
    #         with zipfile.ZipFile(file_path, mode='r') as zip_file:
    #             zip_buffer = zip_file.read()
    #         zip_file.close()
    #         response = HttpResponse(zip_buffer, content_type='application/zip')
    #         response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
    #         return response
    #     else:
    #         return None
    train_dataset_url = serializers.SerializerMethodField()

    def get_train_dataset_url(self, obj):
        if obj.train_dataset:
            return obj.train_dataset.url
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
            'is_human',
            'min_classification',
            'max_classification',

        )
        model = Challenge
        depth = 1
