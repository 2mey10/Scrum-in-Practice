# Generated by Django 4.1.5 on 2023-03-17 09:53

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MlModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ml_model', models.FileField(upload_to='mlmodels/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['onnx'])])),
            ],
        ),
        migrations.CreateModel(
            name='RankingModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model_id', models.IntegerField(blank=True, null=True)),
                ('challenge_id', models.IntegerField(blank=True, null=True)),
                ('username', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='RankingEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(blank=True, max_length=100, null=True)),
                ('Challengid', models.IntegerField(blank=True, null=True)),
                ('modelname', models.CharField(blank=True, max_length=100, null=True)),
                ('Accuracy', models.DecimalField(blank=True, decimal_places=4, max_digits=10, null=True)),
                ('Precision', models.DecimalField(blank=True, decimal_places=4, max_digits=10, null=True)),
                ('Recall', models.DecimalField(blank=True, decimal_places=4, max_digits=10, null=True)),
                ('F1', models.DecimalField(blank=True, decimal_places=4, max_digits=10, null=True)),
                ('is_human', models.BooleanField(default=False)),
                ('model_ref', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ranking.mlmodel')),
            ],
        ),
    ]
