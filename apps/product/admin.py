from django.contrib import admin

from apps.product.models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'quantity', 'sold', )
    list_display_links = ('id', 'name', )
    list_filter = ('category', )
    list_editable = ('price', 'quantity', )
    search_fields = ('name', 'description', )
    ordering = ('id', )
    list_per_page = 25

admin.site.register(Product, ProductAdmin)