from django.urls import path
# from .views import Record, Login, Logout,RegisterView
from django.urls import path, re_path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    # path('addUser/', Record.as_view(), name="addUser"),
    # path('register/', RegisterView.as_view(), name="RegisterView"),
    # path('login/', Login.as_view(), name="login"),
    # path('logout/', Logout.as_view(), name="logout"),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
]