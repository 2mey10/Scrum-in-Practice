from django.urls import path

from .views import QuestionViewSet
from rest_framework.routers import DefaultRouter
from .views import RolesViewSet
from .views import CoursesViewSet
from .views import MetricViewSet

router = DefaultRouter()
router.register('challenge', QuestionViewSet, basename='challenge')
router.register('roles', RolesViewSet, basename='roles')
router.register('courses', CoursesViewSet, basename='courses')
router.register('metric', MetricViewSet, basename='metric')
urlpatterns = router.urls
