from django.urls import path
from .views import FilesViewSet

urlpatterns = [
    path('download/', FilesViewSet.as_view(), name="download"),
]