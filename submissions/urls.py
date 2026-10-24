from django.urls import path

from .views import create_submission

urlpatterns = [
    path('submissions/', create_submission, name='create_submission'),
]
