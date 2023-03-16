# Generated by Django 4.1.7 on 2023-03-16 07:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "registration",
            "0005_alter_usermodel_options_alter_usermodel_managers_and_more",
        ),
    ]

    operations = [
        migrations.RemoveField(model_name="usermodel", name="is_Tutor",),
        migrations.AddField(
            model_name="usermodel",
            name="tutortoken",
            field=models.CharField(default="", max_length=50, null=True),
        ),
    ]
