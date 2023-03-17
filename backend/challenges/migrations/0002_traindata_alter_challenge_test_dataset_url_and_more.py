# Generated by Django 4.1.7 on 2023-03-17 07:42

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("challenges", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="TrainData",
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
            ],
        ),
        migrations.AlterField(
            model_name="challenge",
            name="test_dataset_url",
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name="challenge",
            name="train_dataset_url",
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name="courses",
            name="course_name",
            field=models.CharField(
                blank=True, default="false request!", max_length=300, null=True
            ),
        ),
        migrations.AlterField(
            model_name="metric",
            name="metric_name",
            field=models.CharField(
                blank=True, default="false request!", max_length=100, null=True
            ),
        ),
        migrations.AlterField(
            model_name="roles",
            name="role_name",
            field=models.CharField(
                blank=True, default="false request!", max_length=200, null=True
            ),
        ),
    ]