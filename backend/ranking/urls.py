from rest_framework.routers import DefaultRouter
from .views import MlModelViewSet
from .views import makeEntry
from .views import RankingEntryViewSet
from django.urls import path

router = DefaultRouter()
router.register('mlmodel', MlModelViewSet, basename='mlmodel')
#router.register('evalmodel', MakeEntry, basename='evalmodel')
router.register('rankinglist', RankingEntryViewSet, basename='rankinglist')
urlpatterns = router.urls + [path('makeEntry', makeEntry)]
