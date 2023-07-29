from django.urls import path

from .views import get_data
from . import views

urlpatterns = [
    path('data/', get_data, name='get_data'),
     path('search/', views.SearchAPI.as_view(), name='search_api'),
]
