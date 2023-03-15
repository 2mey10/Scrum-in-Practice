from django.db import models

# Create your models here.

class Files(models.Model):
    filedownload = models.FileField(upload_to='')

    def __str__(self):
        return self.filedownload