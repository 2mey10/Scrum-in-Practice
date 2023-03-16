# Generated by Django 4.1.7 on 2023-03-16 08:16

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Courses",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("course_name", models.CharField(default="", max_length=300)),
                (
                    "course_description",
                    models.CharField(blank=True, max_length=500, null=True),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Metric",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("metric_name", models.CharField(default="", max_length=100)),
                (
                    "metric_formular",
                    models.CharField(blank=True, max_length=30, null=True),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Roles",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("role_name", models.CharField(default="", max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name="Challenge",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("description_text", models.CharField(max_length=500)),
                ("title_text", models.CharField(max_length=50)),
                (
                    "train_dataset_url",
                    models.FileField(
                        null=True,
                        upload_to="traindata/",
                        validators=[
                            django.core.validators.FileExtensionValidator(
                                allowed_extensions=["zip"]
                            )
                        ],
                    ),
                ),
                (
                    "test_dataset_url",
                    models.FileField(
                        null=True,
                        upload_to="testdata/",
                        validators=[
                            django.core.validators.FileExtensionValidator(
                                allowed_extensions=["zip"]
                            )
                        ],
                    ),
                ),
                ("starting_time", models.DateTimeField(blank=True, null=True)),
                ("end_time", models.DateTimeField(blank=True, null=True)),
                (
                    "cover_image",
                    models.ImageField(blank=True, null=True, upload_to="images/"),
                ),
                ("is_human", models.BooleanField(default=False)),
                ("min_classification", models.IntegerField(null=True)),
                ("max_classification", models.IntegerField(null=True)),
                ("course_choices", models.ManyToManyField(to="challenges.courses")),
                ("metric_choices", models.ManyToManyField(to="challenges.metric")),
                ("role_choices", models.ManyToManyField(to="challenges.roles")),
            ],
        ),
    ]
