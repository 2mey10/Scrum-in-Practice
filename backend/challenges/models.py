from django.db import models


# Create your models here.


class Metric(models.Model):
    metric_name = models.CharField(max_length=100)
    metric_formular = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self):
        return self.metric_name


class Roles(models.Model):
    role_name = models.CharField(max_length=200)

    def __str__(self):
        return self.role_name


class Courses(models.Model):
    course_name = models.CharField(max_length=300)

    def __str__(self):
        return self.role_name


class Challenge(models.Model):
    # class Metric(models.TextChoices):
    #     ACCURACY = "1", "accuracy"
    #     PRECISION = "2", "precision"
    #     RECALL = "3", "recall"

    description_text = models.CharField(max_length=500)
    title_text = models.CharField(max_length=50)
    train_dataset_url = models.URLField(null=True)
    test_dataset_url = models.URLField(null=True)
    metric_choices = models.ManyToManyField(Metric)
    role_choices = models.ManyToManyField(Roles)
    course_choices = models.ManyToManyField(Courses)
    # metric_choice = models.TextField(choices=Metric.choices)
    starting_time = models.DateTimeField(auto_now_add=False, blank=True, null=True)
    end_time = models.DateTimeField(auto_now_add=False, blank=True, null=True)
    cover_image = models.ImageField(upload_to='images/', null=True)

    def __str__(self):
        return self.title_text
