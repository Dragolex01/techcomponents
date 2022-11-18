from django.urls import path

from .views import ProductDetailView, ListProductsView

app_name = 'product'
urlpatterns = [
    path('product/<productId>', ProductDetailView.as_view()),
    path('get-products', ListProductsView.as_view())
]