from django.db import models
from django.core.validators import FileExtensionValidator
from challenges.models import Metric, Challenge

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
    model_ref = models.ForeignKey(MlModel, on_delete=models.CASCADE, blank=True, null=True)
    username = models.CharField(max_length=100, blank=True, null=True)
    Challengid = models.ForeignKey(Challenge, on_delete=models.RESTRICT, blank=True, null=True)
    modelname = models.CharField(max_length=100, blank=True, null=True)
    Accuracy = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    Precision = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    Recall = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    F1 = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    is_human = models.BooleanField(default=False)

    def __str__(self):
        return "ranking_entry"

