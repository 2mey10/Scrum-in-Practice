from rest_framework.routers import DefaultRouter
from .views import MlModelViewSet
from .views import MakeEntry
from .views import RankingEntryViewSet

router = DefaultRouter()
router.register('mlmodel', MlModelViewSet, basename='mlmodel')
#router.register('evalmodel', MakeEntry, basename='evalmodel')
router.register('rankinglist', RankingEntryViewSet, basename='rankinglist')
urlpatterns = router.urls

