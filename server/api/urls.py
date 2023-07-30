from django.urls import path

from .views import get_data
from . import views

urlpatterns = [
    path('data/', get_data, name='get_data'),
    path('search/', views.search_sequence, name='search_sequence'),
]
