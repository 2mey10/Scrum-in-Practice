from django.db import models


# Create your models here.


class Metric(models.Model):
    metric_name = models.CharField(max_length=100)
    metric_formular = models.CharField(max_length=300)

    def __str__(self):
        return self.metric_name


class Roles(models.Model):
    role_name = models.CharField(max_length=200)

    def __str__(self):
        return self.role_name


class Challenge(models.Model):
    # class Metric(models.TextChoices):
    #     ACCURACY = "1", "accuracy"
    #     PRECISION = "2", "precision"
    #     RECALL = "3", "recall"

    description_text = models.CharField(max_length=500)
    title_text = models.CharField(max_length=50)
    dataset_url = models.URLField()
    metric_choices = models.ManyToManyField(Metric)
    role_choices = models.ManyToManyField(Roles)
    # metric_choice = models.TextField(choices=Metric.choices)
    remaining_time = models.TimeField(auto_now_add=False, blank=True, null=True)

    def __str__(self):
        return self.title_text
