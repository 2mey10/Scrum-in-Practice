from django.contrib import admin

from .models import Challenge, TrainData
from .models import Metric
from .models import Roles
from .models import Courses

admin.site.register(Challenge)
admin.site.register(Metric)
admin.site.register(Roles)
admin.site.register(Courses)
admin.site.register(TrainData)
