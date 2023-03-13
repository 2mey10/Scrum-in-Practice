from django.contrib import admin

from .models import Challenge
from .models import Metric
from .models import Roles

admin.site.register(Challenge)
admin.site.register(Metric)
admin.site.register(Roles)
