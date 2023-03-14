# Generated by Django 4.1.5 on 2023-03-14 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('challenges', '0007_courses_remove_challenge_dataset_url_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='courses',
            name='course_description',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='challenge',
            name='cover_image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
        migrations.AlterField(
            model_name='challenge',
            name='test_dataset_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='challenge',
            name='train_dataset_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='metric',
            name='metric_formular',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]