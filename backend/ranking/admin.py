from django.contrib import admin
from .models import MlModel
from .models import RankingModel
from .models import RankingEntry

admin.site.register(MlModel)
admin.site.register(RankingModel)
admin.site.register(RankingEntry)
# Register your models here.
