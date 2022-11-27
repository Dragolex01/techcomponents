from django.db import models
from apps.product.models import Product
from django.conf import settings
User = settings.AUTH_USER_MODEL

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE) #OneToOneField porque es 1 carrito por usuario. Al borrar el usuario borras el carrito
    total_items = models.IntegerField(default = 0)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete = models.CASCADE)
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    count = models.IntegerField()