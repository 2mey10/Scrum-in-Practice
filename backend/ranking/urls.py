from rest_framework.routers import DefaultRouter
from .views import MlModelViewSet
from .views import MakeEntry

router = DefaultRouter()
router.register('mlmodel', MlModelViewSet, basename='mlmodel')
router.register('modelentry', MakeEntry, basename='modelentry')
urlpatterns = router.urls

