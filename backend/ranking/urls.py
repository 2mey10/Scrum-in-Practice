from rest_framework.routers import DefaultRouter
from .views import MlModelViewSet

router = DefaultRouter()
router.register('mlmodel', MlModelViewSet, basename='mlmodel')
urlpatterns = router.urls

