from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.core.paginator import Paginator

from apps.product.models import Product
from apps.product.serializers import ProductSerializer
from apps.category.models import Category

class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format = None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status = status.HTTP_404_NOT_FOUND)
        
        if Product.objects.filter(id = product_id).exists():
            product = Product.objects.get(id = product_id)

            product = ProductSerializer(product)

            return Response(
                {'product': product.data},
                status = status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Product with this ID does not exist'},
                status = status.HTTP_404_NOT_FOUND)



class ListProductsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        
        products = Product.objects.all()
        
        products = ProductSerializer(products, many=True)

        if products:
            return Response(
                {'products': products.data},
                status = status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products to list'},
                status = status.HTTP_404_NOT_FOUND)


class ListBySearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        try:
            category_id = int(data['category_id'])
        except:
            return Response(
                {'error': 'Categoria ID debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND)
        
        min_price = data['min_price']
        max_price = data['max_price']
        stock = data['stock']
        sort_by = data['sort_by']

        # if not (sort_by == 'date_created' or sort_by == 'price' or sort_by == 'sold' or sort_by == 'name'):
        #     sort_by = 'date_created'

        if not (sort_by == 'price' or sort_by == 'name'):
            sort_by = 'date_created'

        order = data['order']

        ## Si categoryID es = 0, filtrar todas las categorias
        if category_id == 0:
            product_results = Product.objects.all()
        elif not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'This category does not exist'},
                status=status.HTTP_404_NOT_FOUND)
        else:
            category = Category.objects.get(id=category_id)
            if category.parent:
                # Si la categoria tiene padrem filtrar solo por la categoria y no el padre tambien
                product_results = Product.objects.filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    product_results = Product.objects.filter(category=category)
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)

                    filtered_categories = tuple(filtered_categories)
                    product_results = Product.objects.filter(
                        category__in=filtered_categories)

        # Filtrar por precio
        product_results = product_results.filter(price__gte=min_price)
        product_results = product_results.filter(price__lte=max_price)

        # sold = data['sold']
        # quantity = data['quantity']

        # Filtrar por stock
        # if stock == 'all':
        #     product_results = Product.objects.all()
        # elif stock == 'yes':
        #     product_results = product_results.filter(sold<=23)
        # elif stock == 'no':
        #     product_results = product_results.filter(sold__gte=quantity)

            # QuerySet(foo__lte=10) # foo <= 10
            # QuerySet(foo__gte=10) # foo >= 10
            # QuerySet(foo__lt=10) # foo < 10
            # QuerySet(foo__gt=10) # foo > 10

        
        # Filtrar producto por ordenacion
        if order == 'des':
            sort_by = '-' + sort_by
            product_results = product_results.order_by(sort_by)
        elif order == 'asc':
            product_results = product_results.order_by(sort_by)
        else:
            product_results = product_results.order_by(sort_by)
        
        product_results = ProductSerializer(product_results, many=True)

        if len(product_results.data) > 0:
            return Response(
                {'filtered_products': product_results.data},
                status = status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products found'},
                status = status.HTTP_200_OK)

# class ListProductsByPageView(APIView):
#     permission_classes = (permissions.AllowAny, )
    
#     def get(self, request, page, format=None):

#         try:
#             page = int(page)
#         except:
#             return Response(
#                 {'error': 'Page debe ser un número entero'},
#                 status = status.HTTP_404_NOT_FOUND)
        
        
#         products = Product.objects.all()

#         paginator = Paginator(products, 3)
#         page = page or 1
#         products = paginator.get_page(page)
        
#         products = ProductSerializer(products, many=True)

#         if products:
#             return Response(
#                 {'products': products.data, 'page': page, 'total_pages': paginator.num_pages},
#                 status = status.HTTP_200_OK)
#         else:
#             return Response(
#                 {'error': 'No products to list'},
#                 status = status.HTTP_404_NOT_FOUND)