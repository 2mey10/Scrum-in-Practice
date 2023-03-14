from django.db import models

# Create your models here.


class MlModel(models.Model):
    ml_model = models.FileField(upload_to='mlmodels/', blank=True, null=True)

    def __str__(self):
        return "ml_model"
