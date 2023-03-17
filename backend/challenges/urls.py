from django.urls import path

from .views import QuestionViewSet
from rest_framework.routers import DefaultRouter
from .views import RolesViewSet
from .views import CoursesViewSet
from .views import MetricViewSet
from .views import DownloadTrainDataView
from .views import TrainDatasViewSet
from .views import download_file
from .views import getSingleChallenge


router = DefaultRouter()
router.register('challenge', QuestionViewSet, basename='challenge')
router.register('traindata', TrainDatasViewSet, basename='traindata')
router.register('roles', RolesViewSet, basename='roles')
router.register('courses', CoursesViewSet, basename='courses')
router.register('metric', MetricViewSet, basename='metric')
router.register('challenges/<int:pk>/train-data/', DownloadTrainDataView, basename='downloadtrain')

urlpatterns = router.urls + [path('download', download_file)] + [path('getSingleChallenge/<int:pk>', getSingleChallenge)]
