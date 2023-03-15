# Generated by Django 4.1.4 on 2023-03-15 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('registration', '0002_delete_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usermodel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=255)),
                ('firstname', models.CharField(max_length=255, null=True)),
                ('lastname', models.CharField(max_length=255, null=True)),
                ('matriculationnumber', models.IntegerField(null=True)),
                ('studentstatus', models.CharField(choices=[('I', 'Intern'), ('E', 'Extern')], max_length=1)),
                ('Courseofstudies', models.CharField(max_length=50, null=True)),
                ('exsam', models.CharField(max_length=50, null=True)),
                ('creditingofthemodule', models.CharField(max_length=50, null=True)),
                ('email', models.EmailField(max_length=255)),
                ('password', models.CharField(max_length=50)),
                ('ifLogged', models.BooleanField(default=False)),
                ('token', models.CharField(default='', max_length=500, null=True)),
                ('birthday', models.DateField(null=True)),
                ('address', models.CharField(max_length=50, null=True)),
                ('DSVG', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
