from django.urls import path

from .views import ProductDetailView, ListProductsView, ListProductsByPageView

app_name = 'product'
urlpatterns = [
    path('product/<productId>', ProductDetailView.as_view()),
    path('get-products', ListProductsView.as_view()),
    path('get-products/<page>', ListProductsByPageView.as_view())
]