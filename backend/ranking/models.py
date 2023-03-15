from django.db import models
from django.core.validators import FileExtensionValidator
from challenges.models import Metric

# Create your models here.


class MlModel(models.Model):
    ml_model = models.FileField(upload_to='mlmodels/', blank=False, null=False,
                                validators=[FileExtensionValidator(allowed_extensions=["onnx"])])
    def __str__(self):
        return "ml_model"


class RankingModel(models.Model):
    username = models.CharField(max_length=100, blank=True, null=True)
    model_id = models.IntegerField(blank=True, null=True)
    challenge_id = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.username + ": " + self.model_id


class RankingEntry(models.Model):
    username = models.CharField(max_length=100, blank=True, null=True)
    metric_name = models.CharField(max_length=100, blank=True, null=True)
    metric_value = models.DecimalField(max_digits=6, decimal_places=4, default=0)
    is_human = models.BooleanField(default=False)

    def __str__(self):
        return "ranking_entry"

