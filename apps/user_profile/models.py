from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='users/prueba/', default='users/prueba/default_avatar.jpg')
    region = models.CharField(max_length=255, default='', null=True)
    city = models.CharField(max_length=255, default='',  null=True)
    province = models.CharField(max_length=255, default='', null=True)
    address = models.CharField(max_length=255, default='', null=True)
    postal_code = models.CharField(max_length=5, default='', null=True)

    def __str__(self):
        return str(self.user)