from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

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
                {'error': 'Product ID debe ser un entero'},
                status = status.HTTP_404_NOT_FOUND)
        
        if Product.objects.filter(id = product_id).exists():
            product = Product.objects.get(id = product_id)

            product = ProductSerializer(product)

            return Response(
                {'product': product.data},
                status = status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No existe un producto con este ID'},
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
                {'error': 'No hay productos en la lista'},
                status = status.HTTP_404_NOT_FOUND)


class ListBySearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        try:
            category_id = int(data['category_id'])
            min_price = int(data['min_price'])
            max_price = int(data['max_price'])
            stock = str(data['stock'])
            sort_by = str(data['sort_by'])
            order = str(data['order'])

        except:
            return Response(
                {'error': 'Datos introducidos erroneos'},
                status = status.HTTP_404_NOT_FOUND)
        
        if not (sort_by == 'price' or sort_by == 'name'):
            sort_by = 'date_created'

        
        #Filtrar por categorias
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
        product_results = product_results.filter(price__gte=min_price) # (>=)
        product_results = product_results.filter(price__lte=max_price) # (<=)


        # Filtrar por stock
        if stock == 'all':
            product_results = product_results
        elif stock == 'yes':
            product_results = product_results.filter(quantity__gt=0) # (>)
        elif stock == 'no':
            product_results = product_results.filter(quantity=0)
        else:
            product_results = product_results


        
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
                {'error': 'No se han encontrado productos'},
                status = status.HTTP_200_OK)
