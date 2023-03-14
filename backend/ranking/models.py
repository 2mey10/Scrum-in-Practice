from django.db import models
from django.core.validators import FileExtensionValidator
from challenges.models import Metric

# Create your models here.


class MlModel(models.Model):
    ml_model = models.FileField(upload_to='mlmodels/', blank=True, null=True,
                                validators=[FileExtensionValidator(allowed_extensions=["onnx"])])

    def __str__(self):
        return "ml_model"


class RankingModel(models.Model):
    username = models.CharField(max_length=100, blank=True, null=True)
    model_ref = models.ForeignKey(MlModel, on_delete=models.CASCADE,  blank=True, null=True)
    used_metric = models.ForeignKey(Metric, on_delete=models.RESTRICT,  blank=True, null=True)
    metric_score = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)

