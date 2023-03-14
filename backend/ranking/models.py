from django.db import models
from django.core.validators import FileExtensionValidator

# Create your models here.


class MlModel(models.Model):
    ml_model = models.FileField(upload_to='mlmodels/', blank=True, null=True,
                                validators=[FileExtensionValidator(allowed_extensions=["onnx"])])

    def __str__(self):
        return "ml_model"
