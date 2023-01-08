from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'photo',
            'description',
            'price',
            'category',
            'quantity',
            'sold',
            'date_created',
            'get_image'
        ]