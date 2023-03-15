from django.core.validators import FileExtensionValidator
from django.db import models


# Create your models here.


class Metric(models.Model):
    metric_name = models.CharField(max_length=100,default="",blank=False,null=False)
    metric_formular = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self):
        return self.metric_name


class Roles(models.Model):
    role_name = models.CharField(max_length=200,default="",blank=False,null=False)

    def __str__(self):
        return self.role_name


class Courses(models.Model):
    course_name = models.CharField(max_length=300,default="",blank=False,null=False)
    course_description = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.course_name


class Challenge(models.Model):
    # class Metric(models.TextChoices):
    #     ACCURACY = "1", "accuracy"
    #     PRECISION = "2", "precision"
    #     RECALL = "3", "recall"

    description_text = models.CharField(max_length=500)

    title_text = models.CharField(max_length=50)
    #train_dataset_url = models.URLField(blank=True, null=True)
    #test_dataset_url = models.URLField(blank=True, null=True)
    train_dataset_url = models.FileField(upload_to='traindata/', blank=False, null=True,
                                         validators=[FileExtensionValidator(allowed_extensions=["zip"])])
    test_dataset_url = models.FileField(upload_to='testdata/', blank=False, null=True,
                                        validators=[FileExtensionValidator(allowed_extensions=["zip"])])
    metric_choices = models.ManyToManyField(Metric)
    role_choices = models.ManyToManyField(Roles)
    course_choices = models.ManyToManyField(Courses)
    # metric_choice = models.TextField(choices=Metric.choices)
    starting_time = models.DateTimeField(auto_now_add=False, blank=True, null=True)
    end_time = models.DateTimeField(auto_now_add=False, blank=True, null=True)
    cover_image = models.ImageField(upload_to='images/', blank=True, null=True)
    is_human = models.BooleanField(default=False)
    min_classification= models.IntegerField(null=True)
    max_classification=models.IntegerField(null=True)

    def __str__(self):
        return self.title_text
