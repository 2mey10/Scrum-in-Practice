from django.urls import path
from .views import Record, Login, Logout,RegisterView

urlpatterns = [
    path('addUser/', Record.as_view(), name="addUser"),
    path('register/', RegisterView.as_view(), name="RegisterView"),
    path('login/', Login.as_view(), name="login"),
    path('logout/', Logout.as_view(), name="logout"),
]