from django.urls import path
from .views import GetUserProfileView, UpdateUserProfileView, UpdateUserPhotoView

urlpatterns = [
    path('user', GetUserProfileView.as_view()),
    path('update', UpdateUserProfileView.as_view()),
    path('update-photo', UpdateUserPhotoView.as_view())
]