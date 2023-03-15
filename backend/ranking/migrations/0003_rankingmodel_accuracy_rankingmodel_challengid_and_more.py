# Generated by Django 4.1.4 on 2023-03-15 14:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('challenges', '0010_challenge_max_classification'),
        ('ranking', '0002_alter_mlmodel_ml_model_rankingmodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='rankingmodel',
            name='Accuracy',
            field=models.DecimalField(blank=True, decimal_places=4, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='rankingmodel',
            name='Challengid',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='challenges.challenge'),
        ),
        migrations.AddField(
            model_name='rankingmodel',
            name='F1',
            field=models.DecimalField(blank=True, decimal_places=4, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='rankingmodel',
            name='Precision',
            field=models.DecimalField(blank=True, decimal_places=4, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='rankingmodel',
            name='Recall',
            field=models.DecimalField(blank=True, decimal_places=4, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='rankingmodel',
            name='modelname',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
