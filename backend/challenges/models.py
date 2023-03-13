from django.db import models

# Create your models here.


class Challenge(models.Model):
    class Metric(models.TextChoices):
        ACCURACY = "1", "accuracy"
        PRECISION = "2", "precision"
        RECALL = "3", "recall"

    description_text = models.CharField(max_length=500)
    title_text = models.CharField(max_length=50)
    dataset_url = models.URLField()
    metric_choice = models.TextField(choices=Metric.choices)
