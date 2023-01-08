from django.urls import path

from .views import ProductDetailView, ListProductsView, ListBySearchView

app_name = 'product'
urlpatterns = [
    path('product/<productId>', ProductDetailView.as_view()),
    path('get-products', ListProductsView.as_view()),
    path('by/search', ListBySearchView.as_view()),
]